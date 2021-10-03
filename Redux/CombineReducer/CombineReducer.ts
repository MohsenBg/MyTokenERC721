import { reducerLoading } from "./../Loading/Reducer";
import { reducerAccountInfo } from "../AccountInfo/reducer/Reducer";
import { combineReducers } from "redux";
import { reducerError } from "../Error/Reducer";
import { reducerColor } from "../Color/Reducer";

export const RootReducer = combineReducers({
  AccountData: reducerAccountInfo,
  Loading: reducerLoading,
  Error: reducerError,
  Color: reducerColor,
});
