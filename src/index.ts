import { ethers } from "ethers";
import * as dotenv from "dotenv";
import { NETWORKS } from "./config.js";
import { sendTelegramNotification } from "./services/telegram.js";
import { performSwap } from "./actions/swap.js";
import { performDeploy } from "./actions/deploy.js";

dotenv.config();

async function main() {
    console.log("🚀 Starting Modular Testnet Bot...");

    const privateKey = process.env.PRIVATE_KEY;
    if (!privateKey) throw new Error("Private Key missing");

    // Select random network
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

        const isDeployDay = Math.random() < 0.2;
        let reportMsg = "";

        if (isDeployDay) {
            const { address } = await performDeploy(wallet);
            reportMsg = `🚀 *Contract Deployed*\n🌍 Chain: ${network.name}\n📍 Addr: 
${address}
🔗 [Explorer](${network.explorer}${address})`;
        } else {
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
