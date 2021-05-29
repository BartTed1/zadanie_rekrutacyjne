export const isAlongside = (state = false, action) => { // (1)
    switch (action.type) { 
        case "SET_VALUE":
            return state = action.value
      default:
        return state
    }
}