const initialState = {
  currentW: {},
  futPrev: {},
  API_key: 'e6715c036f2a31c0ae2045316f6690e8',
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CURRENT&FUT_W_INFO':
      return {
        ...state,
        currentW: action.data.currentW,
        futPrev: action.data.futPrev,
      };
    // case 'CURRENT_W_INFO':
    //   return {
    //     ...state.currentW,
    //     currentW: action.data,
    //   };
    // case 'FUTURE_PREVISION':
    //   return {
    //     ...state.futPrev,
    //     futPrev: action.data,
    //   };
    default:
      return state;
  }
};
