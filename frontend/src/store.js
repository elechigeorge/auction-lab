import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { userLoginReducer, userRegisterReducer } from "./reducer/user";
import {
  createAuctionReducer,
  deleteSingleAuctionReducer,
  getAuctionReducer,
  getSingleAuctionReducer
} from "./reducer/auction";

import {
  createBidReducer,
  getBidReducer
} from "./reducer/bid"

const reducer = combineReducers({
  // user reducers list
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,

  // auction reducers list
  createAuction: createAuctionReducer,
  getAuction: getAuctionReducer,
  deleteAuction: deleteSingleAuctionReducer,
  getSingleAuction: getSingleAuctionReducer,

  // bid reducer list
  createBid: createBidReducer,
  getBid: getBidReducer,

});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
