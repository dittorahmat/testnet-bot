import { ethers } from "ethers";
import * as dotenv from "dotenv";

dotenv.config();

// Fungsi untuk mengirim pesan ke Telegram
async function sendTelegramNotification(message: string) {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
        console.log("⚠️  Telegram Token/Chat ID tidak ditemukan. Skip notifikasi.");
        return;
    }

    try {
        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'Markdown',
                disable_web_page_preview: true
            })
        });
        
        if (response.ok) {
            console.log("✅ Notifikasi Telegram terkirim!");
        } else {
            console.error("❌ Gagal kirim notifikasi Telegram:", await response.text());
        }
    } catch (error) {
        console.error("❌ Error koneksi Telegram:", error);
    }
}

async function main() {
    console.log("🚀 Testnet Bot Starting (Advanced Mode)...");

    const rpcUrl = process.env.RPC_URL;
    if (!rpcUrl) throw new Error("RPC_URL tidak ditemukan");
    
    const provider = new ethers.JsonRpcProvider(rpcUrl);

    const privateKey = process.env.PRIVATE_KEY;
    if (!privateKey) {
        console.error("⚠️  Private Key belum diatur!");
        return;
    }

    const wallet = new ethers.Wallet(privateKey, provider);
    console.log(`✅ Wallet: ${wallet.address}`);

    const balanceStart = await provider.getBalance(wallet.address);
    const balanceEth = ethers.formatEther(balanceStart);
    console.log(`💰 Saldo: ${balanceEth} ETH`);

    if (parseFloat(balanceEth) < 0.001) {
        const msg = `⚠️ *Saldo Sekarat!* 
Address: 
${wallet.address}
Saldo: ${balanceEth} ETH
Mohon isi faucet segera.`;
        await sendTelegramNotification(msg);
        return;
    }

    console.log("\n🔄 Mempersiapkan transaksi...");

    try {
        // RANDOMIZER: Jumlah acak antara 0.00001 sampai 0.00005 ETH
        const randomAmount = (Math.random() * (0.00005 - 0.00001) + 0.00001).toFixed(7);
        console.log(`🎲 Jumlah Random: ${randomAmount} ETH`);

        const tx = {
            to: wallet.address,
            value: ethers.parseEther(randomAmount.toString()),
        };

        console.log("⏳ Mengirim transaksi...");
        const transactionResponse = await wallet.sendTransaction(tx);
        
        console.log(`✅ Hash: ${transactionResponse.hash}`);
        console.log("⏳ Menunggu konfirmasi...");
        
        await transactionResponse.wait(1);
        
        console.log("🎉 Sukses!");
        
        // Kirim Laporan ke Telegram
        const message = `🚀 *Laporan Harian Bot Testnet*\n\n` +
                        `✅ *Status:* Transaksi Berhasil\n` +
                        `💰 *Amount:* ${randomAmount} ETH\n` +
                        `⛽ *Network:* Base Sepolia\n` +
                        `🔗 [Lihat di Explorer](https://sepolia.basescan.org/tx/${transactionResponse.hash})`;
        
        await sendTelegramNotification(message);

    } catch (error: any) {
        console.error("❌ Transaksi Gagal:", error.message);
        await sendTelegramNotification(`❌ *Bot Gagal!* 
Error: ${error.message}`);
        process.exit(1);
    }
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
