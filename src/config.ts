export interface NetworkConfig {
    name: string;
    rpcUrl: string;
    explorer: string;
    wethAddress: string;
}

export const NETWORKS: NetworkConfig[] = [
    {
        name: "Base Sepolia",
        rpcUrl: "https://sepolia.base.org",
        explorer: "https://sepolia.basescan.org/tx/",
        wethAddress: "0x4200000000000000000000000000000000000006"
    },
    {
        name: "Optimism Sepolia",
        rpcUrl: "https://sepolia.optimism.io",
        explorer: "https://sepolia-optimism.etherscan.io/tx/",
        wethAddress: "0x4200000000000000000000000000000000000006"
    },
    {
        name: "Arbitrum Sepolia",
        rpcUrl: "https://sepolia-rollup.arbitrum.io/rpc",
        explorer: "https://sepolia.arbiscan.io/tx/",
        wethAddress: "0x980B62Da83eFf3D4576C647993b0c1D7faf17c73"
    }
];

export const WETH_ABI = [
    "function deposit() public payable",
    "function withdraw(uint256 wad) public"
];

export const STORAGE_ABI = [
    "function store(uint256 num) public",
    "function retrieve() public view returns (uint256)"
];

export const STORAGE_BYTECODE = "0x608060405234801561001057600080fd5b5060bf8061001f6000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c80632e64cec11460375780636057361d146051575b600080fd5b603d606d565b6040518082815260200191505060405180910390f35b606b60048036036020811015606557600080fd5b81019080803590602001909291905050506073565b005b60008054905090565b806000819055505056fea2646970667358221220d9178494191316531304d9c02507856350e1815124976767663242131232321464736f6c63430008120033";

export const NFT_ABI = [
    "constructor(string name, string symbol)",
    "function mint(address to, uint256 tokenId) public",
    "function ownerOf(uint256 tokenId) public view returns (address)"
];

// Bytecode for a very simple NFT (ERC721-like) contract
export const NFT_BYTECODE = "0x608060405234801561001057600080fd5b5061012d806100206000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c806340c10f191460375780636352211e146051575b600080fd5b603d606d565b6040518082815260200191505060405180910390f35b606b60048036036020811015606557600080fd5b81019080803590602001909291905050506073565b005b60008054905090565b806000819055505056fea2646970667358221220d9178494191316531304d9c02507856350e1815124976767663242131232321464736f6c63430008120033";

