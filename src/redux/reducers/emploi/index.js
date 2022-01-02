const initialState = {
    data: [],
    total: 1,
    params: {},
    allData: [],
    loading: true
  }
  
  const emploiReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_ALL_DATA':
        return {
          ...state,
          //allData: action.allData,
          data: action.data,
          loading: action.loading
         // total: action.totalPages,
          //params: action.params
        }
      case 'ADD_EMPLOI':
        return { ...state }  
      case 'DELETE_EMPLOI':
        return { ...state }
      default:
        return { ...state }
    }
  }
  export default emploiReducer