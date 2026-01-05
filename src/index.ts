import { ethers } from "ethers";
import * as dotenv from "dotenv";

dotenv.config();

// --- KONFIGURASI SMART CONTRACT ---
const WETH_ADDRESS = "0x4200000000000000000000000000000000000006"; // Base Sepolia WETH
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
    console.log("🚀 Bot Level 2: Smart Contract Interaction...");

    const rpcUrl = process.env.RPC_URL;
    const privateKey = process.env.PRIVATE_KEY;
    
    if (!rpcUrl || !privateKey) throw new Error("Cek .env Anda!");

    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const wallet = new ethers.Wallet(privateKey, provider);
    console.log(`👤 Wallet: ${wallet.address}`);

    // Cek Saldo
    const balanceStart = await provider.getBalance(wallet.address);
    console.log(`💰 Saldo: ${ethers.formatEther(balanceStart)} ETH`);

    if (parseFloat(ethers.formatEther(balanceStart)) < 0.001) {
        await sendTelegramNotification(`⚠️ *Saldo Sekarat!* Isi faucet segera.`);
        return;
    }

    // Setup Contract WETH
    // Define minimal interface for WETH to satisfy TypeScript
    const wethContract = new ethers.Contract(WETH_ADDRESS, WETH_ABI, wallet) as unknown as ethers.Contract & {
        deposit: (options?: { value: bigint }) => Promise<ethers.ContractTransactionResponse>;
        withdraw: (wad: bigint) => Promise<ethers.ContractTransactionResponse>;
    };

    try {
        // Tentukan Aksi Acak: 0 = Wrap (Deposit), 1 = Unwrap (Withdraw)
        const action = Math.random() > 0.5 ? "WRAP" : "UNWRAP";
        // Jumlah acak kecil (0.00001 - 0.00005 ETH)
        // Convert to BigInt properly for v6
        const amount = ethers.parseEther((Math.random() * (0.00005 - 0.00001) + 0.00001).toFixed(7));
        
        let tx;
        console.log(`🎲 Misi Hari Ini: **${action}** ETH sebesar ${ethers.formatEther(amount)}`);

        if (action === "WRAP") {
            // Deposit: Kirim ETH, dapat WETH
            console.log("⏳ Mengirim transaksi WRAP (Deposit)...");
            tx = await wethContract.deposit({ value: amount });
        } else {
            // Withdraw: Kirim WETH, dapat ETH balik
            // (Cek dulu apa kita punya WETH, kalau ga punya paksa Wrap dulu)
            // Sederhananya, kita pakai try-catch. Kalau withdraw gagal (krn ga punya WETH), kita ganti jadi Wrap.
            try {
                console.log("⏳ Mengirim transaksi UNWRAP (Withdraw)...");
                tx = await wethContract.withdraw(amount);
            } catch (err) {
                console.log("⚠️ Gagal Unwrap (Mungkin saldo WETH kosong). Ganti ke Wrap...");
                tx = await wethContract.deposit({ value: amount });
            }
        }

        console.log(`✅ Hash: ${tx.hash}`);
        await tx.wait(1);
        console.log("🎉 Transaksi Sukses!");

        // Lapor Telegram
        const msg = `🤖 *Bot Level 2 Report*\n\n` +
                    `✅ *Aksi:* ${action} (Smart Contract)\n` +
                    `💰 *Nilai:* ${ethers.formatEther(amount)} ETH\n` +
                    `🔗 [Cek di Explorer](https://sepolia.basescan.org/tx/${tx.hash})`;
        
        await sendTelegramNotification(msg);

    } catch (error: any) {
        console.error("❌ Error:", error.message);
        await sendTelegramNotification(`❌ Bot Error: ${error.message}`);
        process.exit(1);
    }
}

main().catch(console.error);