export const polygonScoreGenerateABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "scoreAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "chainId",
        type: "uint256",
      },
    ],
    name: "ScoreGenerated",
    type: "event",
  },
  {
    inputs: [
      { internalType: "address", name: "_address", type: "address" },
      { internalType: "uint256", name: "_chainId", type: "uint256" },
    ],
    name: "generateScore",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "scores",
    outputs: [
      { internalType: "address", name: "userAddress", type: "address" },
      { internalType: "uint256", name: "chainId", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
];

// [
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: true,
//         internalType: "address",
//         name: "scoreAddress",
//         type: "address",
//       },
//     ],
//     name: "ScoreGenerated",
//     type: "event",
//   },
//   {
//     inputs: [{ internalType: "address", name: "_address", type: "address" }],
//     name: "generateScore",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "scoreAddress",
//     outputs: [{ internalType: "address", name: "", type: "address" }],
//     stateMutability: "view",
//     type: "function",
//   },
// ];
