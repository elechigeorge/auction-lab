import api from "../util/api";
import {
  CREATE_BID_REQUEST,
  CREATE_BID_SUCCESS,
  CREATE_BID_FAILED,
  GET_BID_REQUEST,
  GET_BID_SUCCESS,
  GET_BID_FAILED,
  
} from "../constant/types";

// ARTICLE CREATION PROCESS
export const makeBid =
  (price, id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CREATE_BID_REQUEST,
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
        `/bid/create/${id}`,
        { price },
        config
      );

      dispatch({
        type: CREATE_BID_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_BID_FAILED,
        payload:
          error && error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// GET ALL ARTICLES
export const grabBid = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_BID_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await api.get(`/bid/${id}`, config);

    dispatch({
      type: GET_BID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_BID_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
