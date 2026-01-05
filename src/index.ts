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
    console.log("🚀 Bot Level 3: Multi-Chain Support...");

    const privateKey = process.env.PRIVATE_KEY;
    if (!privateKey) throw new Error("Private Key belum diatur di .env!");

    // 1. PILIH NETWORK ACAK
    const selectedNetwork = NETWORKS[Math.floor(Math.random() * NETWORKS.length)];
    console.log(`🌍 Target Hari Ini: **${selectedNetwork.name}**`);

    // Setup Provider & Wallet
    const provider = new ethers.JsonRpcProvider(selectedNetwork.rpcUrl);
    const wallet = new ethers.Wallet(privateKey, provider);
    console.log(`👤 Wallet: ${wallet.address}`);

    // Cek Saldo
    try {
        const balanceStart = await provider.getBalance(wallet.address);
        const balanceEth = ethers.formatEther(balanceStart);
        console.log(`💰 Saldo di ${selectedNetwork.name}: ${balanceEth} ETH`);

        if (parseFloat(balanceEth) < 0.0005) {
            console.log("⚠️ Saldo terlalu sedikit, skip network ini.");
            await sendTelegramNotification(`⚠️ *Saldo Sekarat di ${selectedNetwork.name}* (${balanceEth} ETH). Skip dulu.`);
            return;
        }

        // Setup Contract WETH (Type Safe)
        const wethContract = new ethers.Contract(selectedNetwork.wethAddress, WETH_ABI, wallet) as unknown as ethers.Contract & {
            deposit: (options?: { value: bigint }) => Promise<ethers.ContractTransactionResponse>;
            withdraw: (wad: bigint) => Promise<ethers.ContractTransactionResponse>;
        };

        // 2. TENTUKAN AKSI (WRAP/UNWRAP)
        const action = Math.random() > 0.5 ? "WRAP" : "UNWRAP";
        const amount = ethers.parseEther((Math.random() * (0.00002 - 0.00001) + 0.00001).toFixed(7));
        
        let tx;
        console.log(`🎲 Misi: **${action}** ${ethers.formatEther(amount)} ETH`);

        if (action === "WRAP") {
            console.log("⏳ Executing Deposit...");
            tx = await wethContract.deposit({ value: amount });
        } else {
            try {
                console.log("⏳ Executing Withdraw...");
                tx = await wethContract.withdraw(amount);
            } catch (err) {
                console.log("⚠️ Gagal Withdraw (No WETH?), switch ke Deposit...");
                tx = await wethContract.deposit({ value: amount });
            }
        }

        console.log(`✅ Hash: ${tx.hash}`);
        await tx.wait(1);
        console.log("🎉 Transaksi Sukses!");

        // Lapor Telegram
        const msg = `🤖 *Bot Level 3 Report*\n\n` +
                    `🌍 *Chain:* ${selectedNetwork.name}\n` +
                    `✅ *Aksi:* ${action}\n` +
                    `💰 *Nilai:* ${ethers.formatEther(amount)} ETH\n` +
                    `🔗 [Explorer](${selectedNetwork.explorer}${tx.hash})`;
        
        await sendTelegramNotification(msg);

    } catch (error: any) {
        console.error("❌ Error:", error.message);
        await sendTelegramNotification(`❌ Bot Error di ${selectedNetwork.name}: ${error.message}`);
        process.exit(1);
    }
}

main().catch(console.error);
