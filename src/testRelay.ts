import { BigNumber, ethers } from "ethers";
import { Relayer } from "defender-relay-client";
import {
  DefenderRelayProvider,
  DefenderRelaySigner,
} from "defender-relay-client/lib/ethers";
import { polygonTestABI } from "./abi/polygonContractABI";

const networkInfo = {
  ETH_MAINNET: {
    URL: `wss://mainnet.infura.io/ws/v3/${process.env.INFURA_KEY}`,
    NAME: "ETH_MAINNET",
  },
  POLYGON_MAINNET: {
    URL: `wss://polygon-mumbai.g.alchemy.com/v2/${process.env.POLYGON_ALCHEMY}`,
    NAME: "POLYGON_MUMBAI",
  },
  ARBITRUM_MAINNET: {
    URL: `wss://arb-mainnet.g.alchemy.com/v2/${process.env.ARBITRUM_ALCHEMY}`,
    NAME: "ARBITRUM_MAINNET",
  },
  OPTIMISM_MAINNET: {
    URL: `wss://opt-mainnet.g.alchemy.com/v2/${process.env.OPTIMISM_ALCHEMY}`,
    NAME: "OPTIMISM_MAINNET",
  },
};

export const testWebSocket = async () => {
  try {
    getBlockDetails(networkInfo.ETH_MAINNET);
    getBlockDetails(networkInfo.POLYGON_MAINNET);
    getBlockDetails(networkInfo.ARBITRUM_MAINNET);
    getBlockDetails(networkInfo.OPTIMISM_MAINNET);
  } catch (error: any) {
    console.log(error.message);
  }
};

const getBlockDetails = async (providerInfo: { URL: string; NAME: string }) => {
  try {
    const provider = new ethers.providers.WebSocketProvider(providerInfo.URL);
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
            // console.log("Transaction for :", providerInfo.NAME);
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
    const updateMessage = "TestMyMsg 2";
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
