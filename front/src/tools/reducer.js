const reducer = (state,action) => {
    
    switch(action.type){
        
        case 'LOGIN' :
            return {
                ...state,
                user : action.payload,
                isLogged:true
            }
            
        case 'ADD_TO_CART' :
            return {
                ...state,
                cart : action.payload
            }
        default :
           return state
    }
}

export {reducer}