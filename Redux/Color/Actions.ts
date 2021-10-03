import { ActionTypeColor as ActionType } from "./ActionType";

interface color {
  type: ActionType.COLOR;
  payload: any;
}

export type ActionsColor = color;
