import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { errorAtom } from "../state/error";
import { messageAtom } from "../state/message";

import Error from "../atoms/Error";
import Message from "../atoms/Message";

const Popup = () => {
  const [showPopup, setShowPopup] = useState(false);

  const error = useRecoilValue(errorAtom);
  const setError = useSetRecoilState(errorAtom);

  const message = useRecoilValue(messageAtom);
  const setMessage = useSetRecoilState(messageAtom);

  useEffect(() => {
    if (!error && !message) return;

    setShowPopup(true);

    const timer = setTimeout(() => {
      setShowPopup(false);
      setError(null);
      setMessage(null);
    }, 5000);

    return () => clearTimeout(timer);
  }, [error, message]);

  if (!showPopup) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        top: "20%",
        left: "50%",
        transform: "translateX(-50%)",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      {error && <Error />}
      <div style={{ height: "10px" }}></div>
      {message && <Message />}
    </div>
  );
};

export default Popup;
