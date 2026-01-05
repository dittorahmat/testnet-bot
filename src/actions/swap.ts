import { ethers } from "ethers";
import { WETH_ABI } from "../config.js";

export async function performSwap(wallet: ethers.Wallet, wethAddress: string) {
    const wethContract = new ethers.Contract(wethAddress, WETH_ABI, wallet) as unknown as ethers.Contract & {
        deposit: (options?: { value: bigint }) => Promise<ethers.ContractTransactionResponse>;
        withdraw: (wad: bigint) => Promise<ethers.ContractTransactionResponse>;
    };

    const action = Math.random() > 0.5 ? "WRAP" : "UNWRAP";
    const amount = ethers.parseEther((Math.random() * (0.00002 - 0.00001) + 0.00001).toFixed(7));
    
    let tx;
    if (action === "WRAP") {
        console.log(`⏳ Executing WRAP: ${ethers.formatEther(amount)} ETH`);
        tx = await wethContract.deposit({ value: amount });
    } else {
        try {
            console.log(`⏳ Executing UNWRAP: ${ethers.formatEther(amount)} WETH`);
            tx = await wethContract.withdraw(amount);
        } catch {
            console.log("⚠️ Gagal Withdraw, switch ke Deposit...");
            tx = await wethContract.deposit({ value: amount });
        }
    }

    await tx.wait(1);
    return { action, amount, hash: tx.hash };
}
