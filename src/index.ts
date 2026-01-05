import { ethers } from "ethers";
import * as dotenv from "dotenv";
import { NETWORKS } from "./config.js";
import { sendTelegramNotification } from "./services/telegram.js";
import { performSwap } from "./actions/swap.js";
import { performDeploy } from "./actions/deploy.js";
import { performNFTMint } from "./actions/nft.js";

dotenv.config();

async function main() {
    console.log("🚀 Starting Expert Multi-Chain Bot...");

    const privateKey = process.env.PRIVATE_KEY;
    if (!privateKey) throw new Error("Private Key missing");

    const network = NETWORKS[Math.floor(Math.random() * NETWORKS.length)];
    if (!network) throw new Error("Network selection failed");

    console.log(`🌍 Network: ${network.name}`);
    const provider = new ethers.JsonRpcProvider(network.rpcUrl);
    const wallet = new ethers.Wallet(privateKey, provider);

    try {
        const balance = await provider.getBalance(wallet.address);
        const balanceEth = ethers.formatEther(balance);
        console.log(`💰 Balance: ${balanceEth} ETH`);

        if (parseFloat(balanceEth) < 0.001) {
            await sendTelegramNotification(`⚠️ *Low Balance* on ${network.name}: ${balanceEth} ETH`);
            return;
        }

        const rand = Math.random();
        let reportMsg = "";

        if (rand < 0.1) {
            // 10% Chance for NFT Minting
            const { contractAddress, tokenId, hash } = await performNFTMint(wallet);
            reportMsg = `🎨 *NFT Minted!*\n🌍 Chain: ${network.name}\n📍 Contract: \`${contractAddress}\`\n🆔 Token ID: ${tokenId}\n🔗 [Explorer](${network.explorer}${hash})`;
        } else if (rand < 0.2) {
            // 10% Chance for Contract Deployment
            const { address } = await performDeploy(wallet);
            reportMsg = `🏗️ *Contract Deployed*\n🌍 Chain: ${network.name}\n📍 Addr: \`${address}\`\n🔗 [Explorer](${network.explorer}${address})`;
        } else {
            // 80% Chance for Regular Swap
            const { action, amount, hash } = await performSwap(wallet, network.wethAddress);
            reportMsg = `🤖 *Daily Activity*\n🌍 Chain: ${network.name}\n✅ Action: ${action}\n💰 Value: ${ethers.formatEther(amount)} ETH\n🔗 [Explorer](${network.explorer}${hash})`;
        }

        console.log("🎉 Task Completed!");
        await sendTelegramNotification(reportMsg);

    } catch (error: any) {
        console.error("❌ Error:", error.message);
        await sendTelegramNotification(`❌ *Bot Error* on ${network.name}: ${error.message}`);
        process.exit(1);
    }
}

main().catch(console.error);