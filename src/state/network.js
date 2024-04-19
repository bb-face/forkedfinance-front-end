import { atom } from "recoil";
import { useRecoilState } from "recoil";

export const chainIdAtom = atom({
  key: "chainId",
  default: null,
});

export function useChainIdSetter() {
  const [chainId, setChainId] = useRecoilState(chainIdAtom);

  const setProcessedChainId = (newChainId) => {
    let processedChainId;

    if (typeof newChainId === "string" && newChainId.startsWith("0x")) {
      processedChainId = parseInt(newChainId.slice(2), 16);
    } else {
      processedChainId = Number(newChainId);
    }

    setChainId(processedChainId);
  };

  return [chainId, setProcessedChainId];
}
