import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { initialState } from "../../Redux/store";
import SmallLoading from "../Loading/SmallLoading";
import styles from "./Colors.module.scss";
const Colors = () => {
  const colorsPalette = useSelector(
    (state: typeof initialState) => state.Color.colors
  );
  const currentAccount = useSelector(
    (state: typeof initialState) => state.AccountData.addressAccounts
  );
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);
  return (
    <div className={styles.container}>
      <>
        {currentAccount.length > 0 ? (
          <>
            {loading ? (
              <div>
                <SmallLoading />
              </div>
            ) : (
              <>
                {colorsPalette.length > 0 ? (
                  <div className={styles.cards}>
                    {colorsPalette.map((item: any) => {
                      return (
                        <div className={styles.card} key={item.id}>
                          <div
                            className={styles.color}
                            style={{ backgroundColor: `${item.color}` }}
                          />
                          <div className={styles.hex}>{item.color}</div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div>No color added yet</div>
                )}
              </>
            )}
          </>
        ) : (
          <div className={styles.warning}>
            <span>connect to your Account first</span>
          </div>
        )}
      </>
    </div>
  );
};

export default Colors;
