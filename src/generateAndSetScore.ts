import ReputeXSdk from "@reputex/sdk";
import { ethers } from "ethers";
import { networkInfo } from "./configureNetwork";

const reputexSdk = new ReputeXSdk({
  accessKey: process.env.REPUTEX_ACCESS_KEY,
  secretKey: process.env.REPUTEX_SECRET_KEY,
  origin: "http://localhost:3002",
});

export const getScoreAndPushToNetwork = async (
  address: string,
  chain: string
) => {
  try {
    const network = Object.values(networkInfo).find(
      (info) => info.CHAIN.toString() === chain.toString()
    );

    if (!network) {
      console.log(`Not Supported: Request for ${chain}:${address}.`);
      return;
    }
    const reputeXScore = await reputexSdk.score.getBreakdown(address);
    const privateKey = process.env.WALLET_PRIVATE_KEY || "";

    const provider = new ethers.providers.JsonRpcProvider(
      network.CREATE_SCORE_URL
    );
    const wallet = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(
      network.CREATE_SCORE_CONTRACT_ADDRESS,
      network.CREATE_SCORE_ABI,
      wallet
    );
    const tx = await contract.addScore(
      address,
      parseInt(reputeXScore.data?.reputeXScore.toString() || "0"),
      reputeXScore.message
    );
    await tx.wait();
    console.log("Score updated successfully.", tx);
  } catch (error: any) {
    console.log(error);
  }
};
