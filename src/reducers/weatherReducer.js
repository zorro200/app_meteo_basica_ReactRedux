const initialState = {
  currentW: {},
  futPrev: {},
  API_key: 'e6715c036f2a31c0ae2045316f6690e8',
};

export const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CURRENT&FUT_W_INFO':
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
function handleLocInfoAll() {
  return async (dispatch) => {
    const data = await getLocInfoAll();
    dispatch({
      type: 'CURRENT&FUT_W_INFO',
      data: data,
    });
  };
}
// function handleLocInfoAll(data) {
//   return {
//     type: 'CURRENT&FUT_W_INFO',
//     data: data,
//   };
// }

export { handleLocInfoAll };
