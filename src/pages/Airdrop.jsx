import React, { useState } from "react";
import WalletAddress from "../atoms/WalletAddress";

function Airdrop() {
  const [leaderboardData, setLeaderboardData] = useState([
    { rank: 1, address: "0x1231273678126378126378162783abc", points: 98 },
    { rank: 2, address: "0x4561273678126378126378162783def", points: 87 },
    { rank: 3, address: "0x4561273678126378126378162783def", points: 15 },
    { rank: 4, address: "0x4561273678126378126378162783def", points: 12 },
    { rank: 5, address: "0x4561273678126378126378162783def", points: 8 },
    { rank: 6, address: "0x4561273678126378126378162783def", points: 7 },
  ]);

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
        {leaderboardData.map((entry, index) => (
          <tr
            key={entry.rank}
            className={`${
              index < leaderboardData.length - 1
                ? "border-b border-primary border-dotted"
                : ""
            }`}
          >
            <td className="px-4 py-2 text-center">{entry.rank}</td>
            <td className="px-4 py-2 text-center">
              <WalletAddress address={entry.address} />
            </td>
            <td className="px-4 py-2 text-center">{entry.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Airdrop;
