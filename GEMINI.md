# Testnet Crypto Bot (Expert)

## Project Overview
This project is an automated bot designed to generate organic on-chain activity on cryptocurrency testnets. It is built with **Node.js** and **TypeScript**, utilizing **GitHub Actions** for daily scheduled execution.

### Key Features
*   **🤖 Automated Farming**: Runs automatically every day via GitHub Actions.
*   **⛓️ Multi-Chain Support**: Capable of switching between networks (Base, Optimism, Arbitrum, etc.) to maximize airdrop coverage.
*   **🔄 Smart Contract Interaction**: Performs WETH Wrap/Unwrap (Swap) instead of just basic transfers.
*   **🎲 Human-Like Behavior**: Uses random transaction amounts, random networks, and random delays.
*   **📱 Telegram Notifications**: Sends real-time detailed reports to your smartphone.

## Technologies
*   **Runtime**: Node.js (ES Modules)
*   **Language**: TypeScript
*   **Blockchain Lib**: `ethers` v6
*   **CI/CD**: GitHub Actions (Cron Job)
*   **Build System**: `tsc` (TypeScript Compiler)

## Setup & Configuration

### 1. Environment Variables (`.env`)
```ini
PRIVATE_KEY=your_wallet_private_key
TELEGRAM_BOT_TOKEN=123456:ABC-DEF...
TELEGRAM_CHAT_ID=987654321
# RPC URLs are now managed inside src/config.ts or index.ts logic
```

### 2. GitHub Actions Secrets
Add these to your Repo -> Settings -> Secrets -> Actions:
*   `PRIVATE_KEY`
*   `TELEGRAM_BOT_TOKEN`
*   `TELEGRAM_CHAT_ID`

## How to Run

### Manual (Local)
```bash
# Install dependencies
npm install

# Build the project (Required for production/GitHub)
npm run build

# Run the bot (compiled version)
node dist/index.js
```

### Automatic (GitHub)
*   **Schedule**: Daily at 00:00 UTC (07:00 WIB).
*   **Manual Trigger**: Go to "Actions" tab -> "Daily Testnet Bot" -> "Run workflow".

## Roadmap / Next Levels
*   [x] **Level 1**: Basic Transfer & Automation
*   [x] **Level 2**: Smart Contract Interaction (WETH Swap)
*   [x] **Level 3**: Multi-Chain Support (Base, Optimism, Arbitrum)
*   [x] **Level 4**: Deploy Custom Smart Contracts (Create unique on-chain footprint)
