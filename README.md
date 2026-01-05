# 🤖 Automated Multi-Chain Testnet Bot

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)](https://www.typescriptlang.org/)
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-Automated-ff69b4)](https://github.com/features/actions)

An advanced, modular, and automated cryptocurrency testnet bot designed to generate organic on-chain activity across multiple EVM-compatible networks. Perfect for airdrop farming and network stress testing.

---

## 🌟 Key Features

*   **⛓️ Multi-Chain Support**: Automatically switches between **Base Sepolia**, **Optimism Sepolia**, and **Arbitrum Sepolia**.
*   **🔄 Smart Contract Interaction**: Performs WETH Wrap/Unwrap (Swap) operations.
*   **🎨 NFT Minting**: Deploys unique NFT contracts and mints tokens to your wallet.
*   **🏗️ Automated Deployment**: Randomly deploys custom Smart Contracts to build a "Developer" profile.
*   **🎲 Human-Like Behavior**: Features randomized transaction amounts, network selection, and daily scheduling.
*   **📱 Telegram Notifications**: Real-time status reports sent directly to your smartphone.
*   **☁️ Serverless Execution**: Powered by **GitHub Actions** - runs 24/7 for free.

## 🛠️ Tech Stack

*   **Language**: TypeScript (ES Modules)
*   **Blockchain**: Ethers.js v6
*   **Automation**: GitHub Actions (Cron Jobs)
*   **Architecture**: Modular Clean Code

---

## 🚀 Getting Started

### 1. Prerequisites
*   Node.js (v18 or higher)
*   A wallet private key (Use a dedicated testnet wallet!)
*   Testnet ETH (Base/OP/Arb Sepolia)

### 2. Installation
```bash
npm install
```

### 3. Local Configuration
Create a `.env` file:
```ini
PRIVATE_KEY=your_private_key_here
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

### 4. GitHub Automation Setup
1.  Push this repo to your GitHub (Private recommended).
2.  Go to **Settings > Secrets and variables > Actions**.
3.  Add `PRIVATE_KEY`, `TELEGRAM_BOT_TOKEN`, and `TELEGRAM_CHAT_ID`.

---

## 💡 Maximizing Airdrop Chances

To increase your eligibility for high-value airdrops:
1.  **Gitcoin Passport**: Aim for a score of **20+** at [passport.gitcoin.co](https://passport.gitcoin.co/).
2.  **Mainnet Balance**: Hold a small amount ($10+) of ETH on Ethereum Mainnet as "dust".
3.  **Active Participation**: Occasionally join the Discord or follow the Twitter of the networks you are farming.
4.  **Governance**: If you receive small airdrops, participate in DAO voting on [Snapshot.org](https://snapshot.org/).

---

## 📂 Project Structure
```text
src/
├── actions/        # Logic for Swap, Deploy, and NFT Minting
├── services/       # Telegram notification service
├── config.ts       # Network configurations & ABI
└── index.ts        # Main orchestrator
```

## 📜 License
This project is licensed under the MIT License.