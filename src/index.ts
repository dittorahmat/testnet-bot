import { ethers } from "ethers";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
    console.log("🚀 Testnet Bot Starting...");

    // 1. Setup Provider (Koneksi ke Blockchain)
    const rpcUrl = process.env.RPC_URL;
    if (!rpcUrl) {
        throw new Error("RPC_URL tidak ditemukan di file .env");
    }
    // Menggunakan static provider agar lebih stabil untuk script sederhana
    const provider = new ethers.JsonRpcProvider(rpcUrl);

    // 2. Setup Wallet
    const privateKey = process.env.PRIVATE_KEY;
    if (!privateKey || privateKey === "your_private_key_here") {
        console.error("⚠️  PERINGATAN: Private Key belum diatur di file .env!");
        return;
    }

    const wallet = new ethers.Wallet(privateKey, provider);
    console.log(`✅ Wallet terhubung: ${wallet.address}`);

    // 3. Cek Saldo Awal
    const balanceStart = await provider.getBalance(wallet.address);
    const balanceInEth = ethers.formatEther(balanceStart);
    console.log(`💰 Saldo Awal: ${balanceInEth} ETH`);

    if (parseFloat(balanceInEth) < 0.001) {
        console.log("⚠️  Saldo terlalu sedikit untuk melakukan transaksi. Silakan klaim faucet dulu.");
        return;
    }

    // 4. Lakukan Transaksi (Kirim ke diri sendiri)
    console.log("\n🔄 Memulai transaksi...");
    
    try {
        // Kirim 0.00001 ETH (sangat kecil)
        // Tujuannya hanya untuk mencatat aktivitas (Tx Count)
        const tx = {
            to: wallet.address,
            value: ethers.parseEther("0.00001"),
        };

        console.log("⏳ Mengirim transaksi...");
        const transactionResponse = await wallet.sendTransaction(tx);
        
        console.log(`✅ Transaksi Terkirim! Hash: ${transactionResponse.hash}`);
        console.log("⏳ Menunggu konfirmasi jaringan...");
        
        // Tunggu 1 blok konfirmasi
        await transactionResponse.wait(1);
        
        console.log("🎉 Transaksi Berhasil Dikonfirmasi!");
        console.log(`🔗 Lihat di Explorer: https://sepolia.basescan.org/tx/${transactionResponse.hash}`);

    } catch (error: any) {
        console.error("❌ Gagal mengirim transaksi:", error.message);
    }
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});