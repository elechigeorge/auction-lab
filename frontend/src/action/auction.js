import api from "../util/api";
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
  GET_SINGLE_AUCTION_SUCCESS
} from "../constant/types";

// ARTICLE CREATION PROCESS
export const makeAuction =
  (image, title, description, expiry) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CREATE_AUCTION_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          token: userInfo.token,
        },
      };

      const { data } = await api.post(
        "/auction/create",
        { image, title, description, expiry },
        config
      );

      dispatch({
        type: CREATE_AUCTION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_AUCTION_FAILED,
        payload:
          error && error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// GET ALL ARTICLES
export const grabAuction = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_AUCTION_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await api.get("/auction/z", config);

    dispatch({
      type: GET_AUCTION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_AUCTION_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// DELETE SINGLE 
export const removeSingleAuction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_AUCTION_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await api.delete(`/auction/z/${id}`, config);

    dispatch({
      type: DELETE_AUCTION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_AUCTION_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


// GET SINGLE 
export const getSingle = (id) => async (dispatch) => {
    try {
      dispatch({
        type: GET_SINGLE_AUCTION_REQUEST,
      });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const { data } = await api.get(`/auction/z/${id}`, config);
  
      dispatch({
        type: GET_SINGLE_AUCTION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SINGLE_AUCTION_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
