declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      NODE_ENV: string;
      DATABASE_URL: string;
      INFURA_LINK: string;
      ALCHEMY_KEY: string;
      ETHER_SCAN_KEY: string;
      NFT_NUMBER_OF_TRANSACTION: string;
      REDIS_HOST: string;
      INFURA_KEY: string;
      POLYGON_ALCHEMY: string;
      DEFENDER_API_KEY: string;
      DEFENDER_API_SECRET: string;
      WALLET_PRIVATE_KEY: string;
      ARBITRUM_ALCHEMY: string;
      OPTIMISM_ALCHEMY: string;
      ETHEREUM_ALCHEMY: string;
      REPUTEX_ACCESS_KEY: string;
      REPUTEX_SECRET_KEY: string;
    }
  }
}
export {};
