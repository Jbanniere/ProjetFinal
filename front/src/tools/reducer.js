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
            const data = state.cart.map(e => {
                if(e.product === action.payload.product){
                    const product = e
                    product.quantite = product.quantite + action.payload.quantite
                    return product
                }
                return e
            })
            return {
                ...state,
                // cart : [...state.cart, action.payload],
                cart : data,
            }
            
        case 'INIT_CART' :
            return {
                ...state,
                cart : action.payload,
            }
            
        case 'REMOVE_ITEM_FROM_CART' :
            return {
                ...state,
                cart : action.payload
            }
        
        case 'ALL_PRODUCTS' :
            return {
                ...state,
                products : action.payload
            }
            
        default :
           return state
    }
}

export {reducer}