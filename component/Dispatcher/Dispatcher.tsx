import detectEthereumProvider from "@metamask/detect-provider";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Web3 from "web3";
import { ActionTypeAccountInfo } from "../../Redux/AccountInfo/ActionType/ActionType";
import { ABI_COLOR, ADDRESS_COLOR } from "../../config_Contracts";
import { initialState } from "../../Redux/store";
import { ActionTypeError } from "../../Redux/Error/ActionType";
import { ErrorTypes } from "../Error/ErrorType/ErrorType";
import { useRouter } from "next/router";
import { ActionTypeColor } from "../../Redux/Color/ActionType";
const Dispatcher = () => {
  const dispatch = useDispatch();
  const [blockNumber, setBlockNumber] = useState<any>("");
  const [statusChainID, setStatusChainID] = useState<Boolean>(false);

  const currentAccount = useSelector(
    (state: typeof initialState) => state.AccountData.addressAccounts
  );

  const router = useRouter();
  //** chainIdHandler
  useEffect(() => {
    const OnChangeChainId = async () => {
      const providerMetaMask: any = await detectEthereumProvider();
      if (providerMetaMask) {
        //@ts-ignore
        providerMetaMask.on("chainChanged", async (chainId: string) => {
          await router.push("/", undefined, { shallow: false });
          window.location.reload();
        });
      }
    };
    OnChangeChainId();
  }, []);

  //** auto Connect
  useEffect(() => {
    const handelWalletIsConnected = async () => {
      const provider: any = await detectEthereumProvider();
      if (provider) {
        //Meta Mask installed
        const web3 = new Web3(provider);
        const accounts = await provider.request({
          method: "eth_requestAccounts",
        });
        ChainId(web3);
        setAccount(accounts);
        CheckChainId(web3);
        if (statusChainID) {
          BalanceOfETH(web3, accounts);
          getColors(web3, accounts);
        }
      }
    };
    handelWalletIsConnected();
  }, [statusChainID]);

  //** onChange Account
  useEffect(() => {
    const handelAccountChange = async () => {
      const provider: any = await detectEthereumProvider();
      if (provider) {
        const web3 = new Web3(provider);
        await provider.on("accountsChanged", async (accounts: any) => {
          ChainId(web3);
          CheckChainId(web3);
          setAccount(accounts);
          if (statusChainID) {
            BalanceOfETH(web3, accounts);
            getColors(web3, accounts);
          }
        });
      }
    };
    handelAccountChange();
  }, [statusChainID]);

  //**onBlackNumberChange
  useEffect(() => {
    const onBlackNumberChange = async () => {
      const provider: any = await detectEthereumProvider();
      if (provider) {
        if (currentAccount.length >= 1) {
          const web3 = new Web3(provider);
          const accounts = await provider.request({
            method: "eth_requestAccounts",
          });
          if (statusChainID) {
            BalanceOfETH(web3, accounts);
            getColors(web3, accounts);
          }
        }
      }
    };
    onBlackNumberChange();
  }, [blockNumber]);

  //! lack memory
  const time = 5000;
  let OldBlock: any;
  useEffect(() => {
    const interval = setInterval(async () => {
      const provider: any = await detectEthereumProvider();
      const web3 = new Web3(provider);
      const block = await web3.eth.getBlockNumber();
      if (OldBlock !== block) {
        setBlockNumber(block);
      }
      OldBlock = block;
    }, time);
    return () => clearInterval(interval);
  }, []);
  //!-------------------------------
  const setAccount = async (accounts: any) => {
    if (accounts.length >= 1 && currentAccount.length >= 1) {
      if (
        currentAccount[0].toString().toLowerCase() !==
        accounts.toString().toLowerCase()
      ) {
        dispatch({
          type: ActionTypeAccountInfo.ACCOUNT_ADDRESS,
          payload: accounts,
        });
      }
    } else if (accounts.length >= 1 && currentAccount.length < 1) {
      dispatch({
        type: ActionTypeAccountInfo.ACCOUNT_ADDRESS,
        payload: accounts,
      });
    } else {
      dispatch({
        type: ActionTypeAccountInfo.ACCOUNT_ADDRESS,
        payload: accounts,
      });
    }
  };

  let current_Balance_ETH: any;
  const BalanceOfETH = async (web3: Web3, accounts: any) => {
    if (accounts.length >= 1) {
      const balance = await web3.eth.getBalance(accounts[0]);
      if (balance !== current_Balance_ETH) {
        dispatch({
          type: ActionTypeAccountInfo.ACCOUNT_BALANCE,
          payload: balance,
        });
        current_Balance_ETH = balance;
      }
    } else {
      if ("" !== current_Balance_ETH) {
        dispatch({
          type: ActionTypeAccountInfo.ACCOUNT_BALANCE,
          payload: "",
        });
        current_Balance_ETH = "";
      }
    }
  };

  const ChainId = async (web3: any) => {
    const chainId = await web3.eth.getChainId();
    dispatch({ type: ActionTypeAccountInfo.CHAIN_ID, payload: chainId });
  };

  const CheckChainId = async (web3: Web3) => {
    let currentChainId: any = await web3.eth.getChainId();
    const chain_id: any = process.env.NEXT_PUBLIC_BSC_TESTNET_CHAIN_ID;
    if (currentChainId.toString() !== chain_id.toString()) {
      dispatch({
        type: ActionTypeError.ON_ERROR,
        title: "Chain ID",
        text: "switch BSC NetWork(ID:56)",
        icon: "error",
        countBtn: 1,
        btn1: "switch",
        btn2: "",
        hidden: false,
        fontSize: "18px",
        zIndex: 10,
        ErrorType: ErrorTypes.WRONG_CHAIN_ID,
      });
      setStatusChainID(false);
    } else {
      setStatusChainID(true);
    }
  };

  let totalSupply: any;
  const getColors = async (web3: Web3, accounts: any) => {
    const ColorContract = new web3.eth.Contract(
      //@ts-ignore
      ABI_COLOR,
      ADDRESS_COLOR
    );
    const total = await ColorContract.methods.totalSupply().call();
    if (total !== totalSupply) {
      let colors = [];
      for (let i = 0; i < parseInt(total); i++) {
        const color = await ColorContract.methods.colors(i).call();
        colors.push({
          id: i,
          color: color,
        });
      }
      dispatch({
        type: ActionTypeColor.COLOR,
        payload: colors.reverse(),
      });
    }
  };
  return null;
};

export default Dispatcher;
