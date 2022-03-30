import 'dotenv/config'
import { ethers } from "ethers";
const provider = new ethers.providers.JsonRpcProvider(process.env.ETH_RPC_URL);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// The value unit is CFX
// Check balance
// Get pending nonce
// Send tx
export async function transferCFX(to, value = '0') {
  value = ethers.utils.parseEther(value);
  const balance = await signer.getBalance();
  if (balance.lt(value)) {
    throw new Error('Insufficient balance');
  }
  const nonce = await signer.getTransactionCount('pending');
  return await signer.sendTransaction({
    to,
    value,
    nonce,
  });
}