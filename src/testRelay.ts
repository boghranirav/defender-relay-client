import { BigNumber, ethers } from "ethers";
import { Relayer } from "defender-relay-client";
import {
  DefenderRelayProvider,
  DefenderRelaySigner,
} from "defender-relay-client/lib/ethers";
import { polygonTestABI } from "./abi/polygonContractABI";

export const testWebSocket = async () => {
  try {
    const provider = new ethers.providers.WebSocketProvider(
      `wss://polygon-mainnet.g.alchemy.com/v2/${process.env.POLYGON_ALCHEMY}`
    );
    provider.on("block", async (blockNumber) => {
      // Fetch the block and get all transactions
      const block = await provider.getBlock(blockNumber);
      if (block) {
        const transactions = block.transactions;

        // Process each transaction and log the events
        for (const transactionHash of transactions) {
          const transaction = await provider.getTransaction(transactionHash);
          const receipt = await provider.getTransactionReceipt(transactionHash);

          // Check if the transaction has logs/events
          if (receipt && receipt.logs.length > 0) {
            console.log("Transaction Hash:", transaction?.hash);
            console.log("Events:", receipt.logs);
            console.log("------------------------");
          }
        }
      }
    });
  } catch (error: any) {
    console.log(error.message);
  }
};

export const sendMessageOnPolygon = async () => {
  try {
    const contractAddress = "0x34Ff67233BCE11e3222Fda1360085f5e29DEd00E";

    const credentials = {
      apiKey: process.env.DEFENDER_API_KEY ?? "",
      apiSecret: process.env.DEFENDER_API_SECRET ?? "",
    };

    const provider = new DefenderRelayProvider(credentials);
    const signer = new DefenderRelaySigner(credentials, provider, {
      speed: "fast",
    });

    const contractInterface = new ethers.Contract(
      contractAddress,
      polygonTestABI,
      signer
    );
    const updateMessage = "TestMyMsg";
    const transaction = await contractInterface.populateTransaction.update(
      updateMessage
    );
    const gasEstimate: BigNumber = await contractInterface.estimateGas.update(
      updateMessage
    );

    const relayer = new Relayer(credentials);
    const tx = await relayer.sendTransaction({
      to: contractAddress,
      data: transaction.data,
      gasLimit: gasEstimate.toString(),
      speed: "fast",
    });
    console.log("transaction", tx);
  } catch (error: any) {
    console.log(error);
  }
};
