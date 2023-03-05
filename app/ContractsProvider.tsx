import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import { provider } from "web3-core";

import minter from "../contracts/BlockSideNFTMinter.sol/BlockSideNFTMinter.json";
import nft from "../contracts/BlockSideNFT.sol/BlockSideNFT.json";

import { useMetamask } from "./ConnectMetamask";

const ContractsContext = React.createContext({});

export interface Address {
  MINTER_CONTRACT_ADDRESS: string;
  NFT_CONTRACT_ADDRESS: string;
}

const ADDRESS: Address = {
  MINTER_CONTRACT_ADDRESS: "0x8617e82f151c89cD0123EF51F2ef4b793179Df5c",
  NFT_CONTRACT_ADDRESS: "0x7A65B7100b549eEa87BA5Ab6a113aC8ae0B33fC9",
};

interface Props {}

const ContractsProvider: React.FC<Props> = ({ children }) => {
  const { active, connector } = useWeb3React();
  const { isMetaMaskActive, activateMetamask } = useMetamask();
  const [web3Instance, setWeb3Instance] = useState<any>(null);
  const [accountAddress, setAccount] = useState<string>("");

  const [minterContract, setMinterContract] = useState<any>(null);
  const [NFTContract, setNFTContract] = useState<any>(null);

  useEffect(() => {
    const getWeb3Instance = async () => {
      connector?.getProvider().then((provider: provider) => {
        const instance = new Web3(provider);
        setWeb3Instance(instance);
      });
    };

    getWeb3Instance();
  }, [active, connector]);

  useEffect(() => {
    if (web3Instance === null) {
      return;
    }
    (web3Instance as Web3).eth.getAccounts((err, accounts: string[]) => {
      if (err) {
        debugger;
        console.error(err);
      } else {
        // console.log("accounts[0]", accounts[0]);
        setAccount(accounts[0]);
      }
    });
  }, [web3Instance]);

  // setup minterContract
  useEffect(() => {
    if (web3Instance === null) {
      return;
    }
    if (!isMetaMaskActive) {
      activateMetamask();
      // console.log('Activating Metamask!')
    }

    const MinterContract = new (web3Instance as Web3).eth.Contract(
      minter.abi as any,
      ADDRESS.MINTER_CONTRACT_ADDRESS
    );
    setMinterContract(MinterContract);
  }, [web3Instance, isMetaMaskActive, activateMetamask]);

  // setup CoolCatsNFT
  useEffect(() => {
    if (web3Instance === null) {
      return;
    }
    if (!isMetaMaskActive) {
      activateMetamask();
      // console.log('Activating!')
    }
    const CoolCatsNFT = new (web3Instance as Web3).eth.Contract(
      nft.abi as any,
      ADDRESS.NFT_CONTRACT_ADDRESS
    );
    setNFTContract(CoolCatsNFT);
  }, [web3Instance, isMetaMaskActive, activateMetamask]);

  return (
    <ContractsContext.Provider
      value={{
        accountAddress,
        web3Instance,
        address: ADDRESS,
        contracts: {
          minterContract,
          NFTContract,
        },
      }}
    >
      {children}
    </ContractsContext.Provider>
  );
};

function useContracts(): any {
  const context = React.useContext(ContractsContext);
  if (context === undefined) {
    throw new Error("useContracts must be used within a ContractsProvider");
  }
  return context;
}

export { ContractsProvider, useContracts };

export default ContractsProvider;
