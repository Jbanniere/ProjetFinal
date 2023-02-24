const reducer = (state,action) => {
    
    switch(action.type){
        
        case 'LOGIN' :
            return {
                ...state,
                user : {
                    isLogged:true,
                    isAdmin:action.payload.admin,
                    ...action.payload
                },
                isLogged:true
            }
        case 'LOGOUT' :
            return {
                ...state,
                user:{isLogged:false},
                isLogged:false
            }
            
        case 'ADD_TO_CART' :
            return {
                ...state,
                cart : [...state.cart, action.payload],
            }
            
        case 'REMOVE_ITEM' :
            return {
                ...state,
                cart : action.payload
            }
            
        default :
           return state
    }
}

export {reducer}