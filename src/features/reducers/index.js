import { combineReducers } from "redux";
import { seatsNumber } from "./seatsNumber";
import { isAlongside } from "./isAlongside";
import { seatsSelected } from "./seatsSelected";

export default combineReducers({
  seatsNumber,
  isAlongside,
  seatsSelected
});