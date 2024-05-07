import axios from "axios";

export async function fetchUserBalance(address) {
  const res = await axios({
    url: `${import.meta.env.VITE_SERVER_URL}/balances/${address}`,
    method: "get",
  });

  return res.data || 0;
}
