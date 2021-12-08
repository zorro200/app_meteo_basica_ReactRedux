function handleLocInfo(data) {
  return {
    type: 'CURRENT_W_INFO',
    data: data,
  };
}

function handleFutPrev(data) {
  return {
    type: 'FUTURE_PREVISION',
    data: data,
  };
}

function handleLocInfoAll(data) {
  return {
    type: 'CURRENT&FUT_W_INFO',
    data: data,
  };
}

export { handleLocInfo, handleFutPrev, handleLocInfoAll };
