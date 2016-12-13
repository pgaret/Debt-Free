import $, { ajax } from 'jquery';
import { setCurrentUser, setCard, overWritePeriods } from './current'
import {setInitial} from './userAccess'
import {setValue} from './tableData'
export default function signOutUser(){
  localStorage.removeItem('token')
  localStorage.removeItem('current_user_id')
  return function(dispatch){ 
  dispatch(setCurrentUser(''))
  dispatch(setCard(''))
  dispatch(overWritePeriods([]))
  dispatch(setInitial())
  const newValues = {debt: '',
                      start_month: '',
                      start_year: '',
                      creditcard: '',
                      payment: '',
                      expenditure: '',
                      interest: '' }
  dispatch(setValue(newValues))
}
}

// export const findUser = () => ({type: 'FIND_USER'})
// export const loginUser = () => ({type: 'LOGIN_USER'})
