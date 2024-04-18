import React from "react";
import { useRecoilValue } from "recoil";
import { errorAtom } from "../state/error";

function Error() {
  const error = useRecoilValue(errorAtom);

  return (
    <div
      className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
      role="alert"
    >
      <p className="font-bold">Be Warned</p>
      <p>{error}</p>
    </div>
  );
}

export default Error;
