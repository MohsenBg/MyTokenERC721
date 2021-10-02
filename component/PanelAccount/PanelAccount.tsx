import detectEthereumProvider from "@metamask/detect-provider";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Web3 from "web3";
import { initialState } from "../../Redux/store";
import styles from "./PanelAccount.module.scss";
const PanelAccount = () => {
  const [ETHBalance, setETHBalance] = useState("0");

  const ETH = useSelector(
    (state: typeof initialState) => state.AccountData.balance
  );

  useEffect(() => {
    convert();
  }, [ETH]);
  const convert = async () => {
    const provider: any = await detectEthereumProvider();
    if (provider) {
      const web3 = new Web3(provider);
      if (typeof ETH === "string") {
        let Ether = web3.utils.fromWei(ETH, "ether");
        if (Ether.length > 8) {
          Ether = Ether.substring(0, 6);
        }
        setETHBalance(Ether);
      }
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <div className={styles.mainContent}>
          <div className={styles.option}>
            <span>balance (ETH):</span>
            <span className={styles.number}>{ETHBalance}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanelAccount;
