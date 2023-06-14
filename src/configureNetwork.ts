import { listenToBlockDetails } from "./listenToNetork";
import { polygonScoreGenerateABI } from "./abi/polygonScoreGenerateABI";
import { polygonScoreRegisterABI } from "./abi/polygonScoreRegisterABI";
import { arbitrumRequestScoreABI } from "./abi/arbitrum/requestScoreABI";
import { arbitrumRegisterScoreABI } from "./abi/arbitrum/registerScoreABI";
import { ethRequestScoreABI } from "./abi/eth/requestScoreABI";
import { ethRegisterScoreABI } from "./abi/eth/registerScoreABI";

export enum ChainId {
  ETH_MAINNET = "5", //"1",
  POLYGON_MAINNET = "80001", //"137",
  ARBITRUM_MAINNET = "42016", //"42161",
  OPTIMISM_MAINNET = "10",
}

export interface NetworkInfo {
  NAME: string;
  LISTEN_URL: string;
  LISTEN_CONTRACT_ADDRESS: string;
  LISTEN_ABI: any;
  CHAIN: ChainId;
  CREATE_SCORE_URL: string;
  CREATE_SCORE_CONTRACT_ADDRESS: string;
  CREATE_SCORE_ABI: any;
}

export const networkInfo = {
  ETH_MAINNET: {
    NAME: "ETH_MAINNET",
    LISTEN_URL: `wss://eth-goerli.g.alchemy.com/v2/${process.env.ETHEREUM_ALCHEMY}`,
    LISTEN_CONTRACT_ADDRESS: "0x34Ff67233BCE11e3222Fda1360085f5e29DEd00E",
    LISTEN_ABI: ethRequestScoreABI,
    CHAIN: ChainId.ETH_MAINNET,
    CREATE_SCORE_URL: `https://eth-goerli.g.alchemy.com/v2/${process.env.ETHEREUM_ALCHEMY}`,
    CREATE_SCORE_CONTRACT_ADDRESS: "0x9bA99c7f24CFEA5354B4554ca81200dAa3e8e633",
    CREATE_SCORE_ABI: ethRegisterScoreABI,
  },
  POLYGON_MAINNET: {
    NAME: "POLYGON_MUMBAI",
    LISTEN_URL: `wss://polygon-mumbai.g.alchemy.com/v2/${process.env.POLYGON_ALCHEMY}`,
    LISTEN_CONTRACT_ADDRESS: "0x68aB4e0483dd9Af95a4D65F656FCc53D57FB2B46", //"0x620AF0E21215A3fE6F51e6E3ae5E742255E97b24",
    LISTEN_ABI: polygonScoreGenerateABI,
    CHAIN: ChainId.POLYGON_MAINNET,
    CREATE_SCORE_URL: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.POLYGON_ALCHEMY}`,
    CREATE_SCORE_CONTRACT_ADDRESS: "0x42FcfC548b273FF53D122Dc93d92A6BC89174fd6",
    CREATE_SCORE_ABI: polygonScoreRegisterABI,
  },
  ARBITRUM_MAINNET: {
    NAME: "ARBITRUM_MAINNET",
    LISTEN_URL: `wss://arb-goerli.g.alchemy.com/v2/${process.env.ARBITRUM_ALCHEMY}`,
    LISTEN_CONTRACT_ADDRESS: "0x34Ff67233BCE11e3222Fda1360085f5e29DEd00E",
    LISTEN_ABI: arbitrumRequestScoreABI,
    CHAIN: ChainId.ARBITRUM_MAINNET,
    CREATE_SCORE_URL: `https://arb-goerli.g.alchemy.com/v2/${process.env.ARBITRUM_ALCHEMY}`,
    CREATE_SCORE_CONTRACT_ADDRESS: "0x9bA99c7f24CFEA5354B4554ca81200dAa3e8e633",
    CREATE_SCORE_ABI: arbitrumRegisterScoreABI,
  },
  OPTIMISM_MAINNET: {
    NAME: "OPTIMISM_MAINNET",
    LISTEN_URL: `wss://opt-mainnet.g.alchemy.com/v2/${process.env.OPTIMISM_ALCHEMY}`,
    LISTEN_CONTRACT_ADDRESS: "",
    LISTEN_ABI: "",
    CHAIN: ChainId.OPTIMISM_MAINNET,
    CREATE_SCORE_URL: "",
    CREATE_SCORE_CONTRACT_ADDRESS: ChainId.OPTIMISM_MAINNET,
    CREATE_SCORE_ABI: "",
  },
};

export const startReputeXRelay = async () => {
  try {
    listenToBlockDetails(networkInfo.ETH_MAINNET);
    listenToBlockDetails(networkInfo.POLYGON_MAINNET);
    listenToBlockDetails(networkInfo.ARBITRUM_MAINNET);
    // getBlockDetails(networkInfo.OPTIMISM_MAINNET);
  } catch (error: any) {
    console.log(error.message);
  }
};
