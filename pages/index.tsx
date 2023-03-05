import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useWeb3React } from "@web3-react/core";

import { useMetamask } from "../app/ConnectMetamask";
import nftImage from "../public/nft.png";
import useMinter from "../app/useMinter";
import Modal from "../components/Modal";
import { useRouter } from "next/dist/client/router";
import Web3 from "web3";
import { useContracts } from "../app/ContractsProvider";

import { toast } from "react-toastify";

function MainPage() {
  const { active: isMetaMaskActive, activate } = useWeb3React();
  const { activateMetamask } = useMetamask();
  const { accountAddress } = useContracts();
  const { mintNft, mintedAmount, alreadyMinted } = useMinter();
  const router = useRouter();

  async function tryMint() {
    const id = toast.loading("Please wait...");

    await mintNft().then(
      () => {
        toast.update(id, {
          render: "NFT successfully minted",
          type: "success",
          isLoading: false,
          closeOnClick: true,
        });
      }
    ).catch((e: Error) => {
      toast.update(id, {
        render: "Failed to mint NFT.",
        type: "error",
        isLoading: false,
        closeOnClick: true,
      });
    });
  }


  return (
    <div className="">
      <div className="relative">
        <div className="mx-auto max-w-md px-4 text-center sm:px-6 sm:max-w-3xl lg:px-8 lg:max-w-7xl">
          <div className="max-w-7xl mx-auto rounded-3xl bg-white"></div>

          <div className="">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
                <span className="text-cyan-600">
                  Mint your own BlockSide NFT
                </span>
              </h2>
              <div className="text-cyan-600 text-2xl mt-2">
                  {isMetaMaskActive ? mintedAmount : '???'}/10000
                </div>
              <div className="flex flex-row justify-center my-10">
              <div className="lg:w-1/2 md:w-2/3 w-full rounded-lg shadow-md">
                      <Image
                        layout="responsive"
                        className="w-full rounded-lg "
                        src={nftImage}
                        alt="Arbicats Logo"
                      />
                    </div>
                    </div>
              <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                <div className="mx-auto flex space-x-4">
                  {
                    alreadyMinted ?
                    <button
                    disabled
                      className="block w-full py-3 px-12 rounded-md shadow bg-gradient-to-r from-gray-500 to-gray-600 text-white font-medium "
                    >
                      Already minted
                    </button>
                    :
                  isMetaMaskActive ? (
                    <button
                      onClick={tryMint}
                      className="block w-full py-3 px-12 rounded-md shadow bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-medium hover:from-teal-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 "
                    >
                      Mint 1 BLS
                    </button>
                  ) : (
                    <button
                      onClick={activateMetamask}
                      className="block w-full py-3 px-8 rounded-md shadow bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium hover:from-teal-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 "
                    >
                      Connect
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
