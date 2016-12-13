import $ from 'jquery';

export default (state={user: "", card: "", periods: []}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {...state, user: action.payload}
    case 'ADD_CARD_TO_USER':
      return{...state, user: {...state.user, credit_cards: [...state.user.credit_cards, action.payload]} }
    case 'SET_CARD':
      return {...state, card: action.payload}
    case 'ADD_PERIOD_TO_USER':
      return{...state, user: {...state.user, periods: [...state.user.periods, action.payload]} }
    case 'REMOVE_PERIOD_FROM_CURRENT':
      var filteredPeriods = state.periods.filter(item=>{ if (item.id != action.payload)
      {return item}})
      return {...state, periods: filteredPeriods}
    case 'REMOVE_PERIOD_FROM_USER':
      var filteredPeriods = state.user.periods.filter(item=>{ return item.id != action.payload})
      var filteredUser = Object.assign(state.user, {}, {periods: filteredPeriods})
      return  Object.assign({}, state, {user: filteredUser})
    case 'SET_PERIOD':
      return {...state, periods: [...state.periods, ...action.payload]}
    case 'OVERWRITE_PERIODS':
      return {...state, periods: action.payload}
    case 'REMOVE_CARD_FROM_USER':

      var filteredCards = state.user.credit_cards.filter(item=>{ return item.id != action.payload})
      var filteredUser = Object.assign(state.user, {}, {credit_cards: filteredCards})
      return  Object.assign({}, state, {user: filteredUser})
    case 'LOG_OUT_USER':
      return {user: "", card: "", periods: []}
    default:
      return state
  }
}

export function resetCurrent(){
  return {type: 'LOG_OUT_USER'}
}

export function overWritePeriods(input){
  return {type: 'OVERWRITE_PERIODS', payload: input}
}

export function deletePeriodFromRails(input){

  return function(dispatch){
    $.ajax({
      url: `${process.env.API_HOST}/periods/` + input,
      type: 'DELETE',
      data: input,
      contentType:"application/json; charset=utf-8",
      datatype: 'json',
      headers: {authorization: localStorage.getItem('token')}
    }).done((response) => {
      dispatch(removePeriodFromCurrent(response.id))
      dispatch(removePeriodFromUser(response.id))
    })
  }
}

export function removePeriodFromCurrent(input){
  return {type: 'REMOVE_PERIOD_FROM_CURRENT', payload: input}
}

export function addNewCardtoUser(input){
  return {type: 'ADD_CARD_TO_USER', payload: input}
}

export function addPeriodToUser(input){
  return {type: 'ADD_PERIOD_TO_USER', payload: input}
}
export function removePeriodFromUser(input){
  return {type: 'REMOVE_PERIOD_FROM_USER', payload: input}
}

export function removeCardFromUser(input){
  return {type: 'REMOVE_CARD_FROM_USER', payload: input}

}


export function setCurrentUser(input){
  return {type: 'SET_USER', payload: input}
}

export function setCard(input){
  return {type: 'SET_CARD', payload: input}
}

export function setPeriod(input){
  return {type: 'SET_PERIOD', payload: input}
}
