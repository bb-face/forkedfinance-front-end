import axios from "axios";

export async function requestTransfer(address, signedMessage, addressTo, amount) {
  const res = await axios({
    url: `${import.meta.env.VITE_SERVER_URL}/transferBalance`,
    method: "patch",
    data: {
          account: address,
          type: "transfer",
          signedMessage: signedMessage,
          walletTo: addressTo,
          amount: amount,
      }
  });

return res.data || 0
}
