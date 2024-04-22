import { useEffect, useState } from "react";

import { ethers } from "ethers";
import { Input } from "antd";
import { permitSigned } from "../utils/Permit";
import { contract } from "../utils/ContractInstance";
import { parse, format } from "../utils/formats";



import Button from "../atoms/Button";

import usdcABI from "../assets/USDCABI.json";

import rewardRouterABI from "../assets/RewardRouterABI.json";
import stableCoinTrackerABI from "../assets/StableCoinContractABI.json";
import rewardTrackerABI from "../assets/RewardTrackerABI.json";
import TutoABI from "../assets/TutoABI.json";

import { useGlobalContext } from "../context/context";

const url = "https://server.forkedfinance.xyz";

const ff = "0x00295670C7f8C501f58FA66f1a161a66A05ddC78";

const USDCAddress ="0x8c7A265C1C40F65A6F924207fa859da29b581c2B";
const rewardRouterAddr ="0x4DdEc5379d5050bE1B23F759202b868617d13D18";

const feeUsdcAddr = "0x7885c88160C2cfcCF02445cc26709319b5C76337";
const feeTutoAddr = "0xB5000c1722E0AdbDe6cF4f0467C37e47b589818e";

const usdcModalLabel = "USDC";
const FFModalLabel = "FF";

const chainId = 11155111;

const unstakeModalButton = "Stop Earning";
const depositModalButton = "Deposit";
const withdrawModalButton = "Withdraw";
const depositStablecoinModalHeading = "Deposit Stablecoin - 0.5% Fee";
const withdrawStablecoinModalHeading = "Withdraw Stablecoin - 0.5% Fee";
const stakeFFModalHeading = "Stake FF";
const unstakeFFModalHeading = "Unstake FF";

const usdcDecimals = 10 ** 6;
const decimals = 10 ** 18;
const secondsPerYear = 31536000;

function Dashboard() {
  const { user } = useGlobalContext();
  const [currentAccount, setCurrentAccount] = useState(null);
  const [shortCurrentAccount, setShortCurrentAccount] = useState(null);

  const [amount, setAmount] = useState(null);
  const [usdcAccountBalance, setUsdcAccountBalance] = useState(null);

  const [stableCoinStakedAmount, setStableCoinStakedAmount] = useState(null);
  const [totalStableCoinStakedAmount, setTotalStableCoinStakedAmount] =
    useState(null);

  const [modal, setModal] = useState(false);
  const [modalHeading, setModalHeading] = useState(false);
  const [modalLabel, setModalLabel] = useState(false);
  const [modalButton, setModalButton] = useState(false);

  const [signedData, setSignedData] = useState(null);
  const [deadline, setDeadline] = useState(null);


  const [balance, setBalance] = useState(null);
  const [APR, setAPR] = useState(null);
  const [feeTutoAPR, setfeeTutoAPR] = useState(null);

  const [ffClaimableRewards, setFFClaimableRewards] = useState(null);
  const [usdcClaimableRewards, setUsdcClaimableRewards] = useState(null);
  const [totalFeeClaimableRewards, setTotalFeeClaimableRewards] =
    useState(null);

  const [ffPrice, setFFPrice] = useState(null);
  const [ffSupply, setFFSuply] = useState(null);

  const [ffBalance, setFFBalance] = useState(null);
  const [ffStakedAmounts, setFFStakedAmounts] = useState(null);

  const [ffTotalStakedAmounts, setFFTotalStakedAmounts] = useState(null);

  function changeAmount(e) {
    setAmount(e.target.value);
  }

  function handleModalButton(modalHeading) {
    if (modalHeading === depositStablecoinModalHeading) {
      depositUSDC();
    }
    if (modalHeading === withdrawStablecoinModalHeading) {
      withdrawUSDC();
    }
    if (modalHeading === stakeFFModalHeading) {
      stakeFF();
    }
    if (modalHeading === unstakeFFModalHeading) {
      unstakeFF();
    }
  }

  
  
  

  function test() {
    console.log("click test")
    depositUSDC();
  }

  const signPermit = async (contractAddr, ABI) => {
    
    if (window.ethereum?.isMetaMask) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const block = await provider.getBlock('latest');
      const contract = contract(contractAddr, ABI, signer);
      const data = await permitSigned(signer, contract, feeUsdcAddr, block.timestamp);
      const signature = await signer._signTypedData(data[0], data[1], data[2]);
      const VRS = ethers.utils.splitSignature(signature);
      setSignedData(VRS)
      setDeadline((data[2].deadline).toString())
  }};

  const depositUSDC = async () => {
    

    if (window.ethereum?.isMetaMask) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const network = await provider.getNetwork();
      const signer = provider.getSigner();
      const currentAddress = signer.getAddress();
      
      if(!amount) {return};
      if (JSON.parse(network.chainId) === chainId) {
        
        const usdcContract = contract(USDCAddress, usdcABI, signer);
        const allowance = await usdcContract.allowance(currentAddress, feeUsdcAddr);
        const parsedAllowance = JSON.parse(allowance);
        const maxUint = "115792089237316195423570985008687907853269984665640564039457584007913129639935"
        const parsedAmount = parse(amount, 6);
        const feeUsdc = contract(feeUsdcAddr, stableCoinTrackerABI.abi, signer) 
        
        if (amount > parsedAllowance) {
          await feeUsdc
            .stakeWithPermit(amount, maxUint, deadline, signedData.v, signedData.r, signedData.s)
            .then((tx) => {
              console.log(tx.hash);
            })
            .catch((e) => {
              if (e.code === 4001) {
                console.log("Rejected");
              }
            });
        } else {
          
          const rewardRouter = contract(rewardRouterAddr,rewardRouterABI.abi,signer);

          await rewardRouter
            .depositUsdc(parsedAmount)
            .then((tx) => {
              console.log(tx.hash);
              //do whatever you want with tx
            })
            .catch((e) => {
              if (e.code === 4001) {
                console.log("Rejected");
              }
            });
        }
      }
    }
  };
  const withdrawUSDC = async () => {
    if (window.ethereum?.isMetaMask) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const network = await provider.getNetwork();
      const signer = provider.getSigner();

      if (network.chainId === chainId) {
        const contractRewardRouter = contract(
          rewardRouterAddr,
          rewardRouterABI.abi,
          signer
        );

        const parsedAmount = parse(amount, 6);
        await contractRewardRouter
          .withdrawUsdc(parsedAmount)
          .then((tx) => {
            console.log(tx.hash)
          })
          .catch((e) => {
            if (e.code === 4001) {
              console.log("Rejected");
            }
          });
      }
    }
  };
  const stakeTuto = async () => {

    if (window.ethereum?.isMetaMask) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const network = await provider.getNetwork();
      const currentAddress = signer.getAddress();
      const signer = provider.getSigner();

      if (network.chainId === chainId) {
        const contractRewardRouter = contract(
          rewardRouterAddr,
          rewardRouterABI.abi,
          signer
        );
        const tuto = contract(tutoAdr, TutoABI.abi, signer);
        const allowance = await tuto.allowance(currentAddress, feeTutoAddr);
        const parsedAllowance = JSON.parse(allowance);

        if (amount > parsedAllowance) {

          signPermit(tutoAdr,TutoABI.abi);
          
          const maxUint =
            "115792089237316195423570985008687907853269984665640564039457584007913129639935";
          await tuto
          .stakeWithPermit(amount, maxUint, deadline, signedData.v, signedData.r, signedData.s)
          .then((tx) => {
            console.log(tx.hash);
          })
          .catch((e) => {
            if (e.code === 4001) {
              console.log("Rejected");
            }
          });
        } else {
          const parsedUnit = ethers.utils.parseUnits(amount, 18);

          await contractRewardRouter
            .stakeFF(parsedUnit)
            .then((tx) => {
              console.log(tx);
              //do whatever you want with tx
            })
            .catch((e) => {
              if (e.code === 4001) {
                console.log("Rejected");
              }
            });
        }
      }
    }
  };
  const unstakeFF = async () => {
    if (window.ethereum?.isMetaMask) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const network = await provider.getNetwork();
      const currentAddress = await provider
        .getSigner()
        .getAddress()
        .catch((e) => {
          if (e.code === 4001) {
            console.log("Rejected");
          }
        });
      const signer = provider.getSigner();

      if (network.chainId === chainId) {
        const contractRewardRouter = new ethers.Contract(
          rewardRouter,
          rewardRouterABI.abi,
          signer
        );

        const parsedUnit = ethers.utils.parseUnits(amount, 18);

        await contractRewardRouter
          .unstakeFF(parsedUnit)
          .then((tx) => {
            //do whatever you want with tx
          })
          .catch((e) => {
            if (e.code === 4001) {
              console.log("Rejected");
            }
          });
      }
    }
  };

  const compound = async () => {
    if (window.ethereum?.isMetaMask) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const network = await provider.getNetwork();
      const currentAddress = await provider
        .getSigner()
        .getAddress()
        .catch((e) => {
          if (e.code === 4001) {
            console.log("Rejected");
          }
        });
      const signer = provider.getSigner();

      if (network.chainId === chainId) {
        const contractRewardRouter = new ethers.Contract(
          rewardRouter,
          rewardRouterABI.abi,
          signer
        );

        await contractRewardRouter
          .handleRewards(true, true, true, true, true, true, true)
          .then((tx) => {
            //do whatever you want with tx
          })
          .catch((e) => {
            if (e.code === 4001) {
              console.log("Rejected");
            }
          });
      }
    }
  };
  const claimRewards = async () => {
    if (window.ethereum?.isMetaMask) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const network = await provider.getNetwork();
      const currentAddress = await provider
        .getSigner()
        .getAddress()
        .catch((e) => {
          if (e.code === 4001) {
            console.log("Rejected");
          }
        });
      const signer = provider.getSigner();

      if (network.chainId === chainId) {
        const contractRewardRouter = new ethers.Contract(
          rewardRouter,
          rewardRouterABI.abi,
          signer
        );

        await contractRewardRouter
          .handleRewards(true, false, true, false, false, true, false)
          .then((tx) => {
            //do whatever you want with tx
          })
          .catch((e) => {
            if (e.code === 4001) {
              console.log("Rejected");
            }
          });
      }
    }
  };

  const getAccountContractsData = async () => {
    if (window.ethereum?.isMetaMask) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const network = await provider.getNetwork();
      await provider.send("eth_requestAccounts");
      const currentAddress = await provider
        .getSigner()
        .getAddress()
        .catch((e) => {
          if (e.code === 4001) {
            console.log("Rejected");
          }
        });

      setCurrentAccount(currentAddress);
      setShortCurrentAccount(
        `${currentAddress.slice(0, 7)}...${currentAddress.slice(36)}`
      );
      const signer = provider.getSigner();

      async function signerContract(address, ABI) {
        return new ethers.Contract(address, ABI, signer);
      }

      function formatUsdc(chainOutput) {
        return (
          Math.round(
            parseFloat(ethers.utils.formatUnits(chainOutput, 6)) * 10
          ) / 10
        );
      }
      function formatErc(chainOutput) {
        return (
          Math.round(parseFloat(ethers.utils.formatEther(chainOutput)) * 10) /
          10
        );
      }

      if (network.chainId === 5) {
        // Trackers

        const usdcContract = new ethers.Contract(USDCAddress, usdcABI, signer);

        const usdcFeeTrackerContract = new ethers.Contract(
          feeUsdc,
          stableCoinTrackerABI.abi,
          signer
        );

        const feeTutoTrackerContract = new ethers.Contract(
          feeTuto,
          rewardTrackerABI.abi,
          signer
        );

        const currentUsdcBalance = await usdcContract.balanceOf(currentAddress);
        const parsedUsdcBalance = ethers.utils.formatUnits(
          JSON.parse(currentUsdcBalance, null, 2),
          6
        );
        setUsdcAccountBalance(Math.round(parsedUsdcBalance * 10) / 10);

        const currentUsdcStaked = await usdcFeeTrackerContract.stakedAmounts(
          currentAddress
        );

        //.................................................................

        const claimableUsdcFeeReward = await usdcFeeTrackerContract.claimable(
          currentAddress
        );

        setUsdcClaimableRewards(formatUsdc(claimableUsdcFeeReward));
        setStableCoinStakedAmount(formatUsdc(currentUsdcStaked));

        const claimableFFFeeReward = await feeTutoTrackerContract.claimable(
          currentAddress
        );
        setFFClaimableRewards(formatUsdc(claimableFFFeeReward));

        // Tokens

        const ffContract = new ethers.Contract(ff, ffABI, signer);
        const ffAccountBalance = await ffContract.balanceOf(currentAddress);
        if (!ffAccountBalance) {
          setFFBalance("0");
        } else {
          setFFBalance(
            Math.round(ethers.utils.formatEther(ffAccountBalance) * 10) / 10
          );
        }

        // Distributors

        setTotalFeeClaimableRewards(
          Math.round(
            (formatUsdc(claimableUsdcFeeReward) +
              formatUsdc(claimableFFFeeReward)) *
              10
          ) / 10
        );
      }
    }
  };

  const getContractsData = async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      `https://eth-goerli.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_KEY}`
    );
    const network = await provider.getNetwork();

    async function providerContract(address, ABI) {
      return new ethers.Contract(address, ABI, provider);
    }

    function formatUsdc(chainOutput) {
      return (
        Math.round(parseFloat(ethers.utils.formatUnits(chainOutput, 6)) * 10) /
        10
      );
    }
    function formatErc(chainOutput) {
      return (
        Math.round(parseFloat(ethers.utils.formatEther(chainOutput)) * 10) / 10
      );
    }
    if (network.chainId === 5) {
      const stableCoinTrackerContract = await providerContract(
        feeUsdc,
        stableCoinTrackerABI.abi
      );

      const feeTutoTracker = await providerContract(feeTuto, stableCoinTrackerABI.abi);

      const totalStableCoinStaked =
        await stableCoinTrackerContract.totalDepositSupply(USDCAddress);

      setTotalStableCoinStakedAmount(formatUsdc(totalStableCoinStaked));

      const feeTokensPerInterval =
        await stableCoinTrackerContract.tokensPerInterval();
      const tokensPerYear = feeTokensPerInterval * secondsPerYear;

      setAPR(
        Math.round(
          (formatUsdc(tokensPerYear) / formatUsdc(totalStableCoinStaked)) * 1000
        ) / 10
      );

      const feeTutoTotalSupply = await feeTutoTracker.totalSupply();

      const ffFeeTokensPerInterval = await feeTutoTracker.tokensPerInterval();
      const ffFeeAPR =
        Math.round(
          (formatUsdc(ffFeeTokensPerInterval * secondsPerYear) /
            formatErc(feeTutoTotalSupply)) *
            1000
        ) / 10;
      setfeeTutoAPR(ffFeeAPR);

      const ffContract = new ethers.Contract(ff, ffABI, provider);

      const ffTotalSupply = await ffContract.totalSupply();
      setFFSuply(Math.round(ethers.utils.formatEther(ffTotalSupply)));
    }
  };

  const updateBalance = async () => {
    try {
      setBalance(Math.round((user / 1000000) * 100) / 100);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleModal = (heading, label, button) => {
    setModalHeading(heading);
    setModalLabel(label);
    setModalButton(button);
    setModal(!modal);
  };

  const closeModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  // getAccountContractsData();
  // getContractsData();
  const chainChanged = () => {
    window.location.reload();
  };
  window.ethereum.on("chainChanged", chainChanged);
  window.ethereum.on("accountChanged", getAccountContractsData);

  // useEffect(() => {
  //   updateBalance();
  //   getAccountContractsData();
  //   getContractsData();
  // }, [updateBalance, getAccountContractsData, getContractsData]);

  return (
    <div className="page">
      {alert.show && (
        <div className={`alert alert-${alert.type}`}>{alert.text}</div>
      )}
      {modal && (
        <>
          <Button type="button" onClick={closeModal} className="overlay" />
          <div className="modal">
            <div className="modal-content">
              <div className="modal-heading">{modalHeading}</div>
              <div className="modal-divider">
                <hr />
              </div>
              <Button
                type="button"
                className="close-modal"
                onClick={closeModal}
              >
                ✕
              </Button>
              <div className="modal-input">
                <Input
                  type="number"
                  placeholder="0.0"
                  bordered={false}
                  onChange={changeAmount}
                />
                <div className="label">{modalLabel}</div>
              </div>
              <div className="modal-divider">
                <hr />
              </div>
              <div className="modal-buttons">
                <Button
                  type="button"
                  className="modalButton"
                  onClick={() => {
                    handleModalButton(modalHeading);
                  }}
                >
                  {modalButton}
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="container mx-auto p-4">
        <div className="flex flex-wrap -mx-2">
          <div className="w-1/2 px-2">
            <div className=" p-6 shadow-xl">
              Avaliable Balance: <span>{balance}</span>
              <div>Total Points</div>
              <div className="flex justify-between items-center mb-2">
                <div>USDC</div>
                <div>{totalFeeClaimableRewards}</div>
              </div>
              <div className="cardRow">
                <div>Tuto</div>
              </div>
              <Button
                type="button"
                className="cardButton"
                onClick={claimRewards}
              >
                Claim
              </Button>
            </div>
          </div>
          <div className="w-1/2 px-2">
            <div className="p-6 shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-lg font-semibold">USDC</h1>
              </div>
              <div className="flex justify-between items-center mb-2">
                <div>Wallet</div>
                <div>${usdcAccountBalance}</div>
              </div>
              <div className="flex justify-between items-center mb-2">
                <div>Staked</div>
                <div>${stableCoinStakedAmount} </div>
              </div>
              <div className="flex justify-between items-center mb-2">
                <div>APR</div>
                <div>{APR}%</div>
              </div>
              <div className="flex justify-between items-center mb-2">
                <div>Points</div>
                <div>${usdcClaimableRewards}</div>
              </div>

              <div className="flex justify-between items-center mb-2">
                <div>Total Staked</div>
                <div>${totalStableCoinStakedAmount}</div>
              </div>

              <div className="flex justify-between items-center mb-2">
                <button
                  type="button"
                  className="cardButton"
                  onClick={test}
                  // onClick={() => {
                    
                  //   toggleModal(
                  //     depositStablecoinModalHeading,
                  //     usdcModalLabel,
                  //     depositModalButton
                  //   );
                  // }}
                >
                  Stake
                </button>
                <button
                  type="button"
                  className="cardButton"
                  onClick={signPermit}

                  // onClick={() => {
                  //   toggleModal(
                  //     withdrawStablecoinModalHeading,
                  //     usdcModalLabel,
                  //     withdrawModalButton
                  //   );
                  // }}
                >
                  Unstake
                </button>
              </div>
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-lg font-semibold">TUTO</h1>
              </div>
              <div className="flex justify-between items-center mb-2">
                <div>Price</div>
                <div> Soon!</div>
              </div>
              <div className="flex justify-between items-center mb-2">
                <div>Wallet</div>
                <div>{ffBalance}</div>
              </div>
              <div className="flex justify-between items-center mb-2">
                <div>Staked</div>
                <div>{ffStakedAmounts}</div>
              </div>
              <div className="flex justify-between items-center mb-2">
                <div>Points</div>
                <div>{ffClaimableRewards}</div>
              </div>
              <div className="flex justify-between items-center mb-2">
                <div>Total Staked</div>
                <div>{ffTotalStakedAmounts}</div>
              </div>
              <div className="flex justify-between items-center mb-2">
                <div>Total Supply</div>
                <div>{ffSupply}</div>
              </div>
              <div className="flex justify-between items-center mb-2">
                <Button
                  type="button"
                  onClick={() => {
                    toggleModal(
                      stakeFFModalHeading,
                      FFModalLabel,
                      stakeModalButton
                    );
                  }}
                >
                  Stake
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    toggleModal(
                      unstakeFFModalHeading,
                      FFModalLabel,
                      unstakeModalButton
                    );
                  }}
                >
                  Unstake
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
