import React, {useEffect, useState } from "react";
import axios from "axios";
import WalletAddress from "../atoms/WalletAddress";

function Airdrop() {
  // TODO: this is going to be an API request coming from the back-end;

  const url = "http://localhost:4000/api/v1/balances/points";


  const [leaderboardData, setLeaderboardData] = useState([
  ]);
  // const updateLeaderboard= async () => {
  //   try {
  //     const { data } = await axios.get(`${import.meta.env.VITE_SERVER_URL}`, {
  //       // withCredentials: true,
  //     });
  //     console.log(meta.env.VITE_SERVER_URL)

  //     console.log(data)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const updateLeaderboard= async () => {
    try {
      const { data } = await axios.get(import.meta.env.VITE_SERVER_URL);
      setLeaderboardData(data)
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  };




  useEffect(() => { //fetch pointsMultiplier from backend
    updateLeaderboard()
    // fetch function points, balance, pointsMultiplier
  }, []);
  

  return (
    <table className="m-6 table-auto w-full shadow-md rounded-lg border-2 border-primary">
      <thead className="bg-primary">
        <tr>
          <th className="px-4 py-2">Rank</th>
          <th className="px-4 py-2">Ethereum Address</th>
          <th className="px-4 py-2">Points</th>
        </tr>
      </thead>
      <tbody>
        {leaderboardData.length > 0 && leaderboardData.map((entry, index) => (
          <tr
            key={entry.rank}
            className={`${
              index < leaderboardData.length - 1
                ? "border-b border-primary border-dotted"
                : ""
            }`}
          >
            <td className="px-4 py-2 text-center">{index + 1}</td>
            <td className="px-4 py-2 text-center">
              <WalletAddress address={entry.wallet} />
            </td>
            <td className="px-4 py-2 text-center">{Math.round(entry.points)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Airdrop;
