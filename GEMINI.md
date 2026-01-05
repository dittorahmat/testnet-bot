# Testnet Crypto Bot (Advanced)

## Project Overview
This project is an automated bot designed to generate organic on-chain activity on cryptocurrency testnets (currently **Base Sepolia**). It is built with **Node.js** and **TypeScript**, utilizing **GitHub Actions** for daily scheduled execution without a dedicated server.

### Key Features
*   **🤖 Automated Farming**: Runs automatically every day at 07:00 WIB (00:00 UTC) via GitHub Actions.
*   **🎲 Human-Like Behavior**: Uses random transaction amounts and delays to mimic real user activity.
*   **📱 Telegram Notifications**: Sends real-time reports to your smartphone upon task completion or failure.
*   **🛡️ Secure**: Private keys and API tokens are managed via GitHub Secrets, never exposed in the code.
*   **💰 Safety Checks**: Automatically checks balance before executing to prevent wasted gas attempts.

## Technologies
*   **Runtime**: Node.js (ES Modules)
*   **Language**: TypeScript
*   **Blockchain Lib**: `ethers` v6
*   **CI/CD**: GitHub Actions (Cron Job)
*   **Utilities**: `dotenv` (env management)

## Setup & Configuration

### 1. Environment Variables (`.env`)
For local development, create a `.env` file:

```ini
PRIVATE_KEY=your_wallet_private_key
RPC_URL=https://base-sepolia-rpc.publicnode.com
TELEGRAM_BOT_TOKEN=123456:ABC-DEF...
TELEGRAM_CHAT_ID=987654321
```

### 2. GitHub Actions Secrets
To enable automation, go to your GitHub Repo -> **Settings** -> **Secrets and variables** -> **Actions** and add:
*   `PRIVATE_KEY`
*   `RPC_URL`
*   `TELEGRAM_BOT_TOKEN`
*   `TELEGRAM_CHAT_ID`

## How to Run

### Manual (Local)
```bash
# Install dependencies
npm install

# Run the bot
npx ts-node src/index.ts

# Test Telegram connection
npx ts-node src/test-telegram.ts
```

### Automatic (GitHub)
The bot is scheduled in `.github/workflows/daily-bot.yml`.
*   **Schedule**: Daily at 00:00 UTC.
*   **Manual Trigger**: Go to "Actions" tab -> "Daily Testnet Bot" -> "Run workflow".

## Roadmap / Next Levels
*   [x] Basic Transfer (Self-send)
*   [x] GitHub Automation
*   [x] Telegram Alerts
*   [ ] **Level 2**: Smart Contract Interaction (WETH Swap/Wrap)
*   [ ] **Level 3**: Multi-Chain Support (Monad, Berachain)
*   [ ] **Level 4**: Deploy Custom Smart Contracts