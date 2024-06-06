
import maxUint from "../../costant/prod-costant";

async function permitSigned(signer, token, spender, timestamp) {
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
      maxUint,
      nonce,
      deadline,
    },
  ];

  return typedData;
}

export default permitSigned;
