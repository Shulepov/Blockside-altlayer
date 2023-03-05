import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import Web3 from "web3";
import { useMetamask } from "./ConnectMetamask";

import { useContracts } from "./ContractsProvider";

const initialState = { mintedNftInfo: null };

function reducer(
  state: { mintedNftInfo: any },
  action: { type: any; payload?: any }
) {
  switch (action.type) {
    case "minted":
      return { mintedNftInfo: action.payload };
    case "reset":
      return { mintedNftInfo: null };
    default:
      throw new Error();
  }
}

function useMinter() {
  const {
    contracts: { minterContract, NFTContract },
    accountAddress,
    web3Instance,
  } = useContracts();
  const { isMetaMaskActive, activateMetamask } = useMetamask();
  const [mintedAmount, setMintedAmount] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [alreadyMinted, setAlreadyMinted] = useState(false);

  useEffect(() => {
    const getMintedAmount = async () => {
      if (!(minterContract && accountAddress)) {
        return;
      }

      if (!isMetaMaskActive) {
        await activateMetamask();
      }

      await minterContract.methods
        .currentSupply()
        .call({ from: accountAddress })
        .then(setMintedAmount);
    };

    getMintedAmount();
  }, [minterContract && accountAddress && isMetaMaskActive, state]);

  useEffect(() => {
    const getBalance = async () => {
      if (!(minterContract && accountAddress)) {
        return;
      }

      if (!isMetaMaskActive) {
        await activateMetamask();
      }

      await NFTContract.methods
        .balanceOf(accountAddress)
        .call({ from: accountAddress })
        .then(async (response: Number) => {
          setAlreadyMinted(response > 0);
        });
    };

    getBalance();
  }, [minterContract && accountAddress && isMetaMaskActive]);

  // Mint an Nft
  const mintNft = () => {
    if (!(minterContract && accountAddress && isMetaMaskActive)) {
      return Promise.reject<Error>(new Error("Metamask not connected"));;
    }

    return minterContract.methods
      .mint()
      .send({
        from: accountAddress,
        gas: 3000000,
        value: (web3Instance as Web3).utils.toWei("1", "ether"),
      })
      .then(async (response: any) => {
        dispatch({ type: "minted", payload: {"data": {}} })
      });
  };

  const resetNftInfo = () => dispatch({ type: "reset" });

  return {
    mintNft,
    mintedAmount,
    alreadyMinted,
    state,
    dispatch,
    resetNftInfo,
  };
}

export default useMinter;
