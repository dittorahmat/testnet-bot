import * as dotenv from "dotenv";
dotenv.config();

async function testTelegram() {
    console.log("🔍 Testing Telegram Connection...");

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    // Debugging: Cek apakah variabel terbaca (tapi jangan print isinya demi keamanan)
    console.log(`Bot Token terisi? ${botToken ? "YA ✅" : "TIDAK ❌"}`);
    console.log(`Chat ID terisi?   ${chatId ? "YA ✅" : "TIDAK ❌"}`);

    if (!botToken || !chatId) {
        console.error("❌ Gagal: Pastikan TELEGRAM_BOT_TOKEN dan TELEGRAM_CHAT_ID ada di file .env");
        return;
    }

    console.log("\n📨 Mencoba mengirim pesan tes...");

    try {
        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: "🔔 *Tes Notifikasi Bot*\n\nHalo bos! Jika pesan ini masuk, berarti setup Telegram sudah BENAR. ✅",
                parse_mode: 'Markdown'
            })
        });

        const result = await response.json();

        if (response.ok) {
            console.log("✅ SUKSES! Pesan terkirim. Cek HP Anda.");
        } else {
            console.error("❌ GAGAL Kirim Pesan:", result);
            console.error("Kemungkinan Token salah atau Chat ID salah.");
        }

    } catch (error) {
        console.error("❌ Error Koneksi:", error);
    }
}

testTelegram();
