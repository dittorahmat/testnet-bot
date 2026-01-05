import * as dotenv from "dotenv";
dotenv.config();

export async function sendTelegramNotification(message: string) {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
        console.log("⚠️ Skip notifikasi (Token/ID kosong).");
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
