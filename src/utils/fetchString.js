import axios from "axios";

export async function fetchString(address, type) {
  const res = await axios({
    url: `${import.meta.env.VITE_SERVER_URL}/sign`,
    method: "post",
    data: {
        account: address,
        type: type
      }
  });

return res.data || 0
}
