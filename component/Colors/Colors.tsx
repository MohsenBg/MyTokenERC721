import React from "react";
import { useSelector } from "react-redux";
import { initialState } from "../../Redux/store";
import styles from "./Colors.module.scss";
const Colors = () => {
  const colorsPalette = useSelector(
    (state: typeof initialState) => state.Color.colors
  );
  return (
    <div className={styles.container}>
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
    </div>
  );
};

export default Colors;
