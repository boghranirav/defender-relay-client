import { ethers } from "ethers";
import { polygonScoreGenerateABI } from "./abi/polygonScoreGenerateABI";
import { arbitrumRequestScoreABI } from "./abi/arbitrum/requestScoreABI";
import { ethRequestScoreABI } from "./abi/eth/requestScoreABI";

const contractAddressScoreRequest =
  "0x68aB4e0483dd9Af95a4D65F656FCc53D57FB2B46";

export const requestScoreOnPolygon = async (address: string) => {
  try {
    const privateKey = process.env.WALLET_PRIVATE_KEY || "";

    const providerUrl = `https://polygon-mumbai.g.alchemy.com/v2/${process.env.POLYGON_ALCHEMY}`;
    const provider = new ethers.providers.JsonRpcProvider(providerUrl);
    const wallet = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(
      contractAddressScoreRequest,
      polygonScoreGenerateABI,
      wallet
    );
    const tx = await contract.generateScore(address, "80001");
    await tx.wait();
    console.log("Score updated successfully.", tx);
  } catch (error: any) {
    console.log(error);
  }
};

export const requestScoreOnArbitrum = async (address: string) => {
  try {
    const privateKey = process.env.WALLET_PRIVATE_KEY || "";

    const providerUrl = `https://arb-goerli.g.alchemy.com/v2/${process.env.POLYGON_ALCHEMY}`;
    const provider = new ethers.providers.JsonRpcProvider(providerUrl);
    const wallet = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(
      "0x34Ff67233BCE11e3222Fda1360085f5e29DEd00E",
      arbitrumRequestScoreABI,
      wallet
    );
    const tx = await contract.generateScore(address, "42016");
    await tx.wait();
    console.log("Score updated successfully.", tx);
  } catch (error: any) {
    console.log(error);
  }
};

export const requestScoreOnEth = async (address: string) => {
  try {
    const privateKey = process.env.WALLET_PRIVATE_KEY || "";

    const providerUrl = `https://eth-goerli.g.alchemy.com/v2/${process.env.ETHEREUM_ALCHEMY}`;
    const provider = new ethers.providers.JsonRpcProvider(providerUrl);
    const wallet = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(
      "0x34Ff67233BCE11e3222Fda1360085f5e29DEd00E",
      ethRequestScoreABI,
      wallet
    );
    const tx = await contract.generateScore(address, "80001");
    await tx.wait();
    console.log("Score updated successfully.", tx);
  } catch (error: any) {
    console.log(error);
  }
};
