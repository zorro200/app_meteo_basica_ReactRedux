import { getLocInfoAll } from '../services/locInfo';

const initialState = {
  currentW: {},
  futPrev: {},
  API_key: 'e6715c036f2a31c0ae2045316f6690e8',
};

export const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case '@weather/current&fut':
      return {
        ...state,
        currentW: action.data.currentW,
        futPrev: action.data.futPrev,
      };
    default:
      return state;
  }
};

// ACTIONS
const handleLocInfoAll = (API_key) => {
  return async (dispatch) => {
    const data = await getLocInfoAll(API_key);
    console.log(data);
    dispatch({
      type: '@weather/current&fut',
      data: data,
    });
  };
};
// function handleLocInfoAll(data) {
//   return {
//     type: 'CURRENT&FUT_W_INFO',
//     data: data,
//   };
// }

export { handleLocInfoAll };
