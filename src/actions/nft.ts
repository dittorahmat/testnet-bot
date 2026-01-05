import { ethers } from "ethers";
import { NFT_ABI, NFT_BYTECODE } from "../config.js";

export async function performNFTMint(wallet: ethers.Wallet) {
    console.log("🎨 Deploying & Minting NFT...");
    
    // Deploy a new NFT contract for each "NFT Day" to increase deployment count
    const factory = new ethers.ContractFactory(NFT_ABI, NFT_BYTECODE, wallet);
    
    // Constructor takes name and symbol
    const contract = await factory.deploy("Testnet NFT", "TNET");
    await contract.waitForDeployment();
    const contractAddress = await contract.getAddress();
    
    console.log(`✅ NFT Contract at: ${contractAddress}`);
    
    // Mint the first NFT (ID: 1) to yourself
    const nftContract = new ethers.Contract(contractAddress, NFT_ABI, wallet) as unknown as ethers.Contract & {
        mint: (to: string, id: bigint) => Promise<ethers.ContractTransactionResponse>;
    };
    
    const tokenId = BigInt(Math.floor(Math.random() * 10000));
    console.log(`⏳ Minting Token ID: ${tokenId}...`);
    const tx = await nftContract.mint(wallet.address, tokenId);
    await tx.wait(1);
    
    return { contractAddress, tokenId, hash: tx.hash };
}
