import { ethers } from "ethers";
import * as dotenv from "dotenv";

dotenv.config();

const NETWORKS = [
    { name: "Base Sepolia", url: "https://sepolia.base.org" },
    { name: "Optimism Sepolia", url: "https://sepolia.optimism.io" },
    { name: "Arbitrum Sepolia", url: "https://sepolia-rollup.arbitrum.io/rpc" }
];

async function checkAllBalances() {
    console.log("🔍 Mengecek Saldo di Semua Chain...\n");
    
    const privateKey = process.env.PRIVATE_KEY;
    if (!privateKey) throw new Error("No Private Key");

    for (const net of NETWORKS) {
        try {
            const provider = new ethers.JsonRpcProvider(net.url);
            const wallet = new ethers.Wallet(privateKey, provider);
            const balance = await provider.getBalance(wallet.address);
            
            console.log(`🌍 ${net.name.padEnd(20)}: ${ethers.formatEther(balance)} ETH`);
        } catch (error) {
            console.log(`❌ ${net.name.padEnd(20)}: Gagal connect (RPC Error)`);
        }
    }
}

checkAllBalances();
