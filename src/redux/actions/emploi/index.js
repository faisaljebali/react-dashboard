import axios from 'axios'
import themeConfig from '@configs/themeConfig'
const api = themeConfig.api_url

// ** Get All data
export const getAllDataEmploi = params => {
  return dispatch => {
    axios.get(`${api}/jobs/emploi`, params).then(response => {
      dispatch({
        type: 'GET_ALL_DATA',
       // allData: response.data.allData,
        data: response.data.emploi,
        //totalPages: response.data.total,
        loading: false,
        params
      })
    })
  }
}

// ** Add new Emploi
export const addEmploi = emploi => {
    return (dispatch, getState) => {
      axios
        .post(`${api}/jobs/emploi/store`, emploi)
        .then(response => {
          dispatch({
            type: 'ADD_EMPLOI',
            emploi
          })
        })
        .then(() => {
          //dispatch(getAllDataEmploi(getState().emploi.params))
        })
        .catch(err => console.log(err))
    }
  }

// ** Delete Emploi
export const deleteInvoice = id => {
  return (dispatch, getStore) => {
    axios
      .delete(`${api}/jobs/emploi/delete`, { id })
      .then(response => {
        dispatch({
          type: 'DELETE_EMPLOI'
        })
      })
      .then(() => dispatch(getAllDataEmploi(getStore().invoice.params)))
  }
}
