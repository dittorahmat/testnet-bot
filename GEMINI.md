# Testnet Crypto Bot (Expert Plus)

## Project Overview
This project is an automated bot designed to generate organic on-chain activity on cryptocurrency testnets. It is built with **Node.js** and **TypeScript**, utilizing **GitHub Actions** for daily scheduled execution.

### Key Features
*   **🤖 Automated Farming**: Runs automatically every day via GitHub Actions.
*   **⛓️ Multi-Chain Support**: Switches randomly between **Base**, **Optimism**, and **Arbitrum Sepolia**.
*   **🔄 Smart Contract Interaction**: Performs WETH Wrap/Unwrap (Swap) for DeFi footprint.
*   **🎨 NFT Minting**: Automatically deploys NFT contracts and mints tokens to the wallet.
*   **🏗️ Custom Deployment**: Deploys unique Smart Contracts to simulate developer activity.
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
```

### 2. GitHub Actions Secrets
Add these to your Repo -> Settings -> Secrets -> Actions:
*   `PRIVATE_KEY`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`

## Airdrop Success Strategy
To maximize chances of a "Jackpot" airdrop:
1.  **Human Score**: Build a [Gitcoin Passport](https://passport.gitcoin.co/) score of 20+.
2.  **Mainnet Dust**: Keep $10-$20 worth of ETH on Ethereum Mainnet to prove the wallet is not a bot.
3.  **Consistency**: Let this bot run daily. Consistency is often valued more than high volume.
4.  **On-Chain DNA**: Occasionally interact with official DEXs/Bridges manually to add variety.

## Roadmap / Next Levels
*   [x] **Level 1**: Basic Transfer & Automation
*   [x] **Level 2**: Smart Contract Interaction (WETH Swap)
*   [x] **Level 3**: Multi-Chain Support (Base, Optimism, Arbitrum)
*   [x] **Level 4**: Deploy Contracts & NFT Minting
*   [x] **Level 5**: Modular Refactoring (Clean Code)