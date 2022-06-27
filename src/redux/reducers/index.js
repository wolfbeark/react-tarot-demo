
import { combineReducers } from "redux";
import gameManager from "./gameManager_reduer";

const rootReducer = combineReducers({
    gameManager,
});

export default rootReducer;