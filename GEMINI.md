# Testnet Crypto Bot

## Project Overview
This project is a Node.js-based automation tool designed to interact with cryptocurrency testnets (currently configured for **Base Sepolia**). Its primary purpose is to generate on-chain activity (transactions) for a specific wallet, often used for retroactive airdrop farming or testing network performance.

The bot utilizes **Ethers.js** to communicate with the blockchain and is written in **TypeScript** using modern ES Module standards.

### Key Features
*   **Wallet Connection**: Securely connects using a private key stored in environment variables.
*   **Balance Check**: Verifies sufficient funds before attempting transactions to prevent errors.
*   **Auto-Transaction**: Performs self-transfer transactions (sending a tiny amount of ETH to the sender's own address) to increment the transaction count (nonce) with minimal cost.
*   **Explorer Integration**: Outputs direct links to the block explorer for verified transactions.

## Technologies & Architecture
*   **Runtime**: Node.js
*   **Language**: TypeScript (configured as ES Modules)
*   **Libraries**:
    *   `ethers` (v6): For JSON-RPC communication and wallet management.
    *   `dotenv`: For environment variable management.
    *   `ts-node`: For executing TypeScript files directly without a separate build step during development.

## Setup & Configuration

### Prerequisites
*   Node.js (v18+ recommended)
*   A crypto wallet (e.g., MetaMask) with access to its Private Key.
*   Testnet ETH (can be obtained from faucets like Bware Labs, QuickNode, or Chainlink).

### Environment Variables
Create a `.env` file in the root directory with the following keys:

```ini
PRIVATE_KEY=your_wallet_private_key_here
RPC_URL=https://sepolia.base.org
```

*   **PRIVATE_KEY**: The private key of the wallet to be automated. **Never share this.**
*   **RPC_URL**: The endpoint for the blockchain network (default is Base Sepolia).

## Building and Running

### Installation
Install the required dependencies:
```bash
npm install
```

### Execution
Run the bot directly using `ts-node`:
```bash
npx ts-node src/index.ts
```

There is currently no build script defined in `package.json` for production compilation, as this is primarily a development/scripting tool.

## Development Conventions

*   **Module System**: The project is configured as **ES Modules** (`"type": "module"` in `package.json` and `"module": "nodenext"` in `tsconfig.json`). Ensure all imports use ESM syntax.
*   **Code Structure**: Source code resides in the `src/` directory.
*   **Safety**: The script includes a balance check (`< 0.001 ETH`) to prevent execution on empty wallets.
*   **Error Handling**: Basic `try-catch` blocks are used around transaction logic to handle network timeouts or insufficient funds gracefully.
