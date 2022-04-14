import {
    CREATE_AUCTION_REQUEST,
    CREATE_AUCTION_SUCCESS,
    CREATE_AUCTION_FAILED,

    GET_AUCTION_REQUEST,
    GET_AUCTION_SUCCESS,
    GET_AUCTION_FAILED,

    DELETE_AUCTION_REQUEST,
    DELETE_AUCTION_SUCCESS,
    DELETE_AUCTION_FAILED,

    GET_SINGLE_AUCTION_FAILED,
    GET_SINGLE_AUCTION_REQUEST,
    GET_SINGLE_AUCTION_SUCCESS,

} from "../constant/types";

export const createAuctionReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_AUCTION_REQUEST:
      return { loading: true };
    case CREATE_AUCTION_SUCCESS:
      return { loading: false, auction: action.payload };
    case CREATE_AUCTION_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export const getAuctionReducer = (state = [], action) => {
  switch (action.type) {
    case GET_AUCTION_REQUEST:
      return { loading: true };
    case GET_AUCTION_SUCCESS:
      return { loading: false, auctions: action.payload };
    case GET_AUCTION_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

  export const deleteSingleAuctionReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_AUCTION_REQUEST:
      return { loading: true };
    case DELETE_AUCTION_SUCCESS:
      return { loading: false, auction: action.payload };
    case DELETE_AUCTION_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export const getSingleAuctionReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_SINGLE_AUCTION_REQUEST:
        return { loading: true };
      case GET_SINGLE_AUCTION_SUCCESS:
        return { loading: false, auction: action.payload };
      case GET_SINGLE_AUCTION_FAILED:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }