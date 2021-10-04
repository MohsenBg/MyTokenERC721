import detectEthereumProvider from "@metamask/detect-provider";
import React, { useEffect, useState } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";
import { useDispatch, useSelector } from "react-redux";
import Web3 from "web3";
import { ABI_COLOR, ADDRESS_COLOR } from "../../config_Contracts";
import { ActionTypeError } from "../../Redux/Error/ActionType";
import { initialState } from "../../Redux/store";
import { ErrorTypes } from "../Error/ErrorType/ErrorType";
import styles from "./ColorPalette.module.scss";
const ColorPalette = () => {
  const [color, setColor] = useColor("hex", "#121212");
  const currentAccount = useSelector(
    (state: typeof initialState) => state.AccountData.addressAccounts
  );
  const colors = useSelector(
    (state: typeof initialState) => state.Color.colors
  );
  const [warning, setWarning] = useState("");
  const dispatch = useDispatch();
  const handelAddColorBtn = async () => {
    const provider: any = await detectEthereumProvider();
    if (provider) {
      const web3 = new Web3(provider);
      const ColorContract = new web3.eth.Contract(
        //@ts-ignore
        ABI_COLOR,
        ADDRESS_COLOR
      );
      try {
        let gas: any;
        await ColorContract.methods
          .mint(color.hex)
          .estimateGas({ from: currentAccount[0] })
          .then(function (gasAmount: any) {
            gas = gasAmount;
          });
        await ColorContract.methods
          .mint(color.hex)
          .send({ from: currentAccount[0], gas: gas });
      } catch (error: any) {
        if (error.code === 4001) {
          dispatch({
            type: ActionTypeError.ON_ERROR,
            title: "Meta Mask",
            text: "Denied transaction signature",
            icon: "error",
            countBtn: 1,
            btn1: "ok",
            btn2: "",
            hidden: false,
            fontSize: "18px",
            zIndex: 10,
            ErrorType: ErrorTypes.META_MASK_USER_DENIED_TRANSACTION,
          });
          if (error.code === -32002) {
            dispatch({
              type: ActionTypeError.ON_ERROR,
              title: "Meta Mask",
              text: "request already sent to you ",
              icon: "error",
              countBtn: 1,
              btn1: "ok",
              btn2: "",
              hidden: false,
              fontSize: "18px",
              zIndex: 10,
              ErrorType: ErrorTypes.META_MASK_CONNECTION_REJECTED,
            });
          }
        }
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.colorPalette}>
        <ColorPicker
          width={350}
          height={150}
          color={color}
          onChange={setColor}
          hideHSV
          hideRGB
          dark
        />
        <div className={styles.read} />
        <div className={styles.btn}>
          <span onClick={handelAddColorBtn}>AddColor</span>
        </div>
        <div>{warning}</div>
      </div>
    </div>
  );
};

export default ColorPalette;
