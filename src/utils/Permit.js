import { ethers } from "ethers";

// const chainId = 11155111 // this is for the chain's ID. value is 1 for remix

const value = ethers.constants.MaxUint256;

export async function permitSigned(signer, token, spender, timestamp) {
  const deadline = timestamp + 86400;
  const [nonce, name, version, chainId, ownerAddress] = await Promise.all([
    token.nonces(signer.getAddress()),
    token.name(),
    "1",
    signer.getChainId(),
    signer.getAddress(),
  ]);

  const typedData = [
    {
      name,
      version,
      chainId,
      verifyingContract: token.address,
    },
    {
      Permit: [
        {
          name: "owner",
          type: "address",
        },
        {
          name: "spender",
          type: "address",
        },
        {
          name: "value",
          type: "uint256",
        },
        {
          name: "nonce",
          type: "uint256",
        },
        {
          name: "deadline",
          type: "uint256",
        },
      ],
    },
    {
      owner: ownerAddress,
      spender,
      value,
      nonce,
      deadline,
    },
  ];

  return typedData;
}
