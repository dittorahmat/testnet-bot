import { ethers } from "ethers";
import { STORAGE_ABI, STORAGE_BYTECODE } from "../config.js";

export async function performDeploy(wallet: ethers.Wallet) {
    console.log("🏗️ Deploying Custom Smart Contract...");
    
    const factory = new ethers.ContractFactory(STORAGE_ABI, STORAGE_BYTECODE, wallet);
    const contract = await factory.deploy();
    
    await contract.waitForDeployment();
    const address = await contract.getAddress();
    
    return { address };
}
