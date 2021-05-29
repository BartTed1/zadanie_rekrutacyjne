export const seatsSelected = (state = 0, action) => { // (1)
    switch (action.type) { 
        case "SET_VALUE":
            return state = action.value
      default:
        return state
    }
}