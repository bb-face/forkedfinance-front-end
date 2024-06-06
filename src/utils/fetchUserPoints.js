import axios from "axios";

export async function fetchUserPoints(address) {
  const res = await axios({
    url: `${import.meta.env.VITE_SERVER_URL}/points/${address}`,
    method: "get",
  });

  const res1 = await axios({
    url: `${import.meta.env.VITE_SERVER_URL}/mutliplier/${address}`,
    method: "get",
  });

  return {
    userPoints: (Math.round(res.data)*10)/10 || 0,
    userPointsMultiplier: (Math.round(res1.data)*10)/10 || 1
    };
}
