import { ethers } from "ethers";
import * as dotenv from "dotenv";

dotenv.config();

// --- KONFIGURASI NETWORK (LEVEL 3) ---
interface NetworkConfig {
    name: string;
    rpcUrl: string;
    explorer: string;
    wethAddress: string;
}

const NETWORKS: NetworkConfig[] = [
    {
        name: "Base Sepolia",
        rpcUrl: "https://sepolia.base.org",
        explorer: "https://sepolia.basescan.org/tx/",
        wethAddress: "0x4200000000000000000000000000000000000006"
    },
    {
        name: "Optimism Sepolia",
        rpcUrl: "https://sepolia.optimism.io",
        explorer: "https://sepolia-optimism.etherscan.io/tx/",
        wethAddress: "0x4200000000000000000000000000000000000006"
    },
    {
        name: "Arbitrum Sepolia",
        rpcUrl: "https://sepolia-rollup.arbitrum.io/rpc",
        explorer: "https://sepolia.arbiscan.io/tx/",
        wethAddress: "0x980B62Da83eFf3D4576C647993b0c1D7faf17c73"
    }
];

const WETH_ABI = [
    "function deposit() public payable",
    "function withdraw(uint256 wad) public"
];

// --- LEVEL 4: SIMPLE STORAGE CONTRACT ---
// Bytecode dan ABI contract sederhana yang hanya menyimpan satu angka.
const STORAGE_ABI = [
    "function store(uint256 num) public",
    "function retrieve() public view returns (uint256)"
];
const STORAGE_BYTECODE = "0x608060405234801561001057600080fd5b5060bf8061001f6000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c80632e64cec11460375780636057361d146051575b600080fd5b603d606d565b6040518082815260200191505060405180910390f35b606b60048036036020811015606557600080fd5b81019080803590602001909291905050506073565b005b60008054905090565b806000819055505056fea2646970667358221220d9178494191316531304d9c02507856350e1815124976767663242131232321464736f6c63430008120033";

// --- TELEGRAM NOTIFIER ---
async function sendTelegramNotification(message: string) {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
        console.log("⚠️  Skip notifikasi (Token/ID kosong).");
        return;
    }

    try {
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'Markdown',
                disable_web_page_preview: true
            })
        });
        console.log("✅ Notifikasi Telegram terkirim!");
    } catch (error) {
        console.error("❌ Gagal kirim Telegram:", error);
    }
}

// --- FUNGSI UTAMA ---
async function main() {
    console.log("🚀 Bot Level 4: Deploy & Interact...");

    const privateKey = process.env.PRIVATE_KEY;
    if (!privateKey) throw new Error("Private Key belum diatur di .env!");

    // 1. PILIH NETWORK ACAK
    const selectedNetwork = NETWORKS[Math.floor(Math.random() * NETWORKS.length)];
    if (!selectedNetwork) throw new Error("Gagal memilih network");

    console.log(`🌍 Target Hari Ini: **${selectedNetwork.name}**`);

    const provider = new ethers.JsonRpcProvider(selectedNetwork.rpcUrl);
    const wallet = new ethers.Wallet(privateKey, provider);
    console.log(`👤 Wallet: ${wallet.address}`);

    try {
        const balanceStart = await provider.getBalance(wallet.address);
        const balanceEth = ethers.formatEther(balanceStart);
        console.log(`💰 Saldo: ${balanceEth} ETH`);

        if (parseFloat(balanceEth) < 0.001) {
            await sendTelegramNotification(`⚠️ *Saldo Sekarat di ${selectedNetwork.name}* (${balanceEth} ETH). Skip.`);
            return;
        }

        // --- LEVEL 4 LOGIC: 20% Chance to Deploy Contract ---
        // Kita buat deploy contract ini "Jarang" terjadi (misal 20% kemungkinan)
        // karena gas-nya lebih mahal dari swap biasa, dan biar terlihat eksklusif.
        const isDeployDay = Math.random() < 0.2; 

        if (isDeployDay) {
            console.log("🏗️ HARI SPESIAL! Melakukan Deployment Contract...");
            
            const factory = new ethers.ContractFactory(STORAGE_ABI, STORAGE_BYTECODE, wallet);
            const contract = await factory.deploy();
            
            console.log("⏳ Deploying...");
            await contract.waitForDeployment();
            const contractAddress = await contract.getAddress();
            
            console.log(`✅ Contract Deployed at: ${contractAddress}`);

            const msg = `🚀 *Bot Level 4: DEPLOYMENT ALERT*\n\n` +
                        `🌍 *Chain:* ${selectedNetwork.name}\n` +
                        `🏗️ *Action:* Deploy Smart Contract\n` +
                        `📍 *Address:* 
${contractAddress}
` +
                        `🔗 [Explorer](${selectedNetwork.explorer}${contractAddress})`;
            
            await sendTelegramNotification(msg);

        } else {
            // --- LEVEL 2 & 3 FALLBACK (Swap WETH) ---
            console.log("🔄 Hari Biasa: Lanjut Swap WETH...");
            
            const wethContract = new ethers.Contract(selectedNetwork.wethAddress, WETH_ABI, wallet) as unknown as ethers.Contract & {
                deposit: (options?: { value: bigint }) => Promise<ethers.ContractTransactionResponse>;
                withdraw: (wad: bigint) => Promise<ethers.ContractTransactionResponse>;
            };

            const action = Math.random() > 0.5 ? "WRAP" : "UNWRAP";
            const amount = ethers.parseEther((Math.random() * (0.00002 - 0.00001) + 0.00001).toFixed(7));
            
            let tx;
            if (action === "WRAP") {
                tx = await wethContract.deposit({ value: amount });
            } else {
                try {
                    tx = await wethContract.withdraw(amount);
                } catch {
                    console.log("⚠️ Gagal Withdraw, switch ke Deposit...");
                    tx = await wethContract.deposit({ value: amount });
                }
            }

            console.log(`✅ Hash: ${tx.hash}`);
            await tx.wait(1);

            const msg = `🤖 *Bot Daily Report*\n\n` +
                        `🌍 *Chain:* ${selectedNetwork.name}\n` +
                        `✅ *Aksi:* ${action}\n` +
                        `💰 *Nilai:* ${ethers.formatEther(amount)} ETH\n` +
                        `🔗 [Explorer](${selectedNetwork.explorer}${tx.hash})`;
            
            await sendTelegramNotification(msg);
        }

    } catch (error: any) {
        console.error("❌ Error:", error.message);
        await sendTelegramNotification(`❌ Bot Error di ${selectedNetwork.name}: ${error.message}`);
        process.exit(1);
    }
}

main().catch(console.error);