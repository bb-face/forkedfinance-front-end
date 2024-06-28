import React from "react";
import { useRecoilValue } from "recoil";
import { errorAtom } from "../state/error";

function Error() {
  const error = useRecoilValue(errorAtom);

  return (
    <div
      className="bg-yellow-300 	 border-l-4 border-white text-black p-4"
      role="alert"
    >
      <p className="font-bold">Ostorozhno</p>
      <p>{error}</p>
    </div>
  );
}

export default Error;
