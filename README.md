# 🤖 Automated Multi-Chain Testnet Bot

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)](https://www.typescriptlang.org/)
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-Automated-ff69b4)](https://github.com/features/actions)

An advanced, modular, and automated cryptocurrency testnet bot designed to generate organic on-chain activity across multiple EVM-compatible networks. Perfect for airdrop farming and network stress testing.

---

## 🌟 Key Features

*   **⛓️ Multi-Chain Support**: Automatically switches between **Base Sepolia**, **Optimism Sepolia**, and **Arbitrum Sepolia**.
*   **🔄 Smart Contract Interaction**: Performs WETH Wrap/Unwrap (Swap) operations to generate meaningful contract interaction history.
*   **🏗️ Automated Deployment**: Randomly deploys custom Smart Contracts to build a "Developer" profile on-chain.
*   **🎲 Human-Like Behavior**: Features randomized transaction amounts, network selection, and daily scheduling.
*   **📱 Telegram Notifications**: Real-time status reports sent directly to your smartphone.
*   **☁️ Serverless Execution**: Powered by **GitHub Actions** - runs 24/7 for free without a dedicated VPS.

## 🛠️ Tech Stack

*   **Language**: TypeScript (ES Modules)
*   **Blockchain**: Ethers.js v6
*   **Automation**: GitHub Actions (Cron Jobs)
*   **Development**: Node.js, ts-node

---

## 🚀 Getting Started

### 1. Prerequisites
*   Node.js (v18 or higher)
*   A wallet private key (Use a dedicated testnet wallet!)
*   Testnet ETH (Base/OP/Arb Sepolia)

### 2. Installation
```bash
git clone https://github.com/dittorahmat/testnet-bot.git
cd testnet-bot
npm install
```

### 3. Local Configuration
Create a `.env` file in the root directory:
```ini
PRIVATE_KEY=your_private_key_here
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

### 4. GitHub Automation Setup
To run the bot automatically every day:
1.  Fork or Push this repo to your private/public GitHub account.
2.  Go to **Settings > Secrets and variables > Actions**.
3.  Add the following **Secrets**:
    *   `PRIVATE_KEY`: Your wallet private key.
    *   `TELEGRAM_BOT_TOKEN`: Your Telegram bot token from @BotFather.
    *   `TELEGRAM_CHAT_ID`: Your Telegram user ID from @userinfobot.

---

## 📂 Project Structure
```text
src/
├── actions/        # Blockchain interaction logic (Swap, Deploy)
├── services/       # External services (Telegram)
├── config.ts       # Network configurations & ABI
└── index.ts        # Main entry point & scheduler logic
```

## ⚠️ Disclaimer
This project is for **educational purposes only**. Automated interaction with blockchain networks can be subject to specific terms of service. Use at your own risk. Always use a dedicated testnet wallet with no mainnet funds.

---

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
