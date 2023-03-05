import React, { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";

type WindowWithEthereum = Window & typeof globalThis & { ethereum?: any };

// const TEST_CHAIN_IDS = 421611; // Arbitrum Testnet
const CHAIN_IDS = 0xf4264; // Arbitrum

const AltlayerParams = {
  chainId: "0xf4264",
  chainName: "Altlayer",
  nativeCurrency: {
    name: "BLS",
    symbol: "BLS",
    decimals: 18,
  },
  rpcUrls: ["https://blocksidefed067c1-alt-producer-rpc.alt.technology"],
  blockExplorerUrls: ["https://explorer.alt.technology?rpcUrl=https://blocksidefed067c1-alt-producer-rpc.alt.technology"],
};


const injected = new InjectedConnector({ supportedChainIds: [CHAIN_IDS] });

const MetamaskContext = React.createContext({});

const MetamaskProvider: React.FC<{}> = ({ children }) => {
  const { active: isMetaMaskActive, activate } = useWeb3React();

  const onError = (err: any) => {
    console.error(err);
    debugger;
  };

  const activateMetamask = () => {
    //console.log("activateMetamask run");
    activate(injected, onError, true).catch((err) => {
      //console.error(err);
      //debugger;
    });
  };

  if (!isMetaMaskActive) {
   // activateMetamask();
  }
/*
  useEffect(() => {
    const switchEthereumChain = async () => {
      debugger;
      try {
        await (window as WindowWithEthereum).ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: CHAIN_IDS }],
        });
      } catch (switchError: any) {
        console.warn('switchError', switchError);
        // This error code indicates that the chain has not been added to MetaMask.
        // if (switchError.code === 4902) {
          try {
            await (window as WindowWithEthereum).ethereum.request({
              method: "wallet_addEthereumChain",
              params: [AltlayerParams],
            });
          } catch (addError) {
            // handle "add" error
          }
        // }
        // handle other "switch" errors
      }
    };
    switchEthereumChain();
  }, [isMetaMaskActive]);*/

  return (
    <MetamaskContext.Provider
      value={{
        isMetaMaskActive,
        activateMetamask,
      }}
    >
      {children}
    </MetamaskContext.Provider>
  );
};

function useMetamask(): any {
  const context = React.useContext(MetamaskContext);
  if (context === undefined) {
    throw new Error("useMetamask must be used within a MetamaskProvider");
  }
  return context;
}

export { MetamaskProvider, useMetamask };

export default MetamaskProvider;
