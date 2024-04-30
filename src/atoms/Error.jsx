import React from "react";
import { useRecoilValue } from "recoil";
import { errorAtom } from "../state/error";

function Error() {
  const error = useRecoilValue(errorAtom);

  return (
    <div
      className="bg-warning-light border-l-4 border-warning text-warning-dark p-4"
      role="alert"
    >
      <p className="font-bold">Be Warned</p>
      <p>{error}</p>
    </div>
  );
}

export default Error;
