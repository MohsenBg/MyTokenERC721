
import { reducerLoading } from "./../Loading/Reducer";
import { reducerAccountInfo } from "../AccountInfo/reducer/Reducer";
import { combineReducers } from "redux";
import { reducerError } from "../Error/Reducer";


export const RootReducer = combineReducers({
  AccountData: reducerAccountInfo,
  Loading: reducerLoading,
  Error: reducerError,
});
