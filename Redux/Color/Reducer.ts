import { ActionTypeColor as ActionType } from "./ActionType";
import { ActionsColor as Actions } from "./Actions";

const initialState = {
  colors: [],
};

export const reducerColor = (state = initialState, action: Actions) => {
  switch (action.type) {
    case ActionType.COLOR:
      return {
        ...state,
        colors: action.payload,
      };
    default:
      return state;
  }
};
