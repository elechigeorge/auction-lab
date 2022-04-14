import {
    CREATE_BID_REQUEST,
    CREATE_BID_SUCCESS,
    CREATE_BID_FAILED,

    GET_BID_REQUEST,
    GET_BID_SUCCESS,
    GET_BID_FAILED,
} from "../constant/types";

export const createBidReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_BID_REQUEST:
      return { loading: true };
    case CREATE_BID_SUCCESS:
      return { loading: false, bid: action.payload };
    case CREATE_BID_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export const getBidReducer = (state = [], action) => {
  switch (action.type) {
    case GET_BID_REQUEST:
      return { loading: true };
    case GET_BID_SUCCESS:
      return { loading: false, bids: action.payload };
    case GET_BID_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}