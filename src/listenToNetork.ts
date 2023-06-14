import { ethers } from "ethers";
import { getScoreAndPushToNetwork } from "./generateAndSetScore";
import { NetworkInfo } from "./configureNetwork";

export const listenToBlockDetails = async (networkInfo: NetworkInfo) => {
  let retryCount = 0;
  const maxRetries = 5;
  const retryDelay = 5000; // 5 seconds
  const startEventListener = async () => {
    try {
      const provider = new ethers.providers.WebSocketProvider(
        networkInfo.LISTEN_URL
      );
      const contract = new ethers.Contract(
        networkInfo.LISTEN_CONTRACT_ADDRESS,
        networkInfo.LISTEN_ABI,
        provider
      );
      console.log(`Started listening to ${networkInfo.NAME}..`);
      contract.on("ScoreGenerated", async (scoreAddress, chain) => {
        await getScoreAndPushToNetwork(scoreAddress, chain);
      });
      contract.on("error", (error) => {
        console.error("Event subscription error:", error);
      });
    } catch (error: any) {
      console.log(error.message);
      if (retryCount < maxRetries) {
        retryCount++;
        console.log(`Retrying in ${retryDelay / 1000} seconds...`);
        setTimeout(startEventListener, retryDelay);
      } else {
        console.error(`Max retry attempts reached. Exiting...`);
      }
    }
  };
  startEventListener();
};
