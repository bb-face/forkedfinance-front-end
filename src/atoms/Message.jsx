import React from "react";
import { useRecoilValue } from "recoil";
import { messageAtom } from "../state/message";

function Message() {
  const message = useRecoilValue(messageAtom);

  return (
    <div className="bg-black bg-opacity-80 border-l-4 text-white p-4" role="">
      <p className="font-bold">{message}</p>
    </div>
  );
}

export default Message;
