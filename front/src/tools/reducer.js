const reducer = (state,action) => {
    
    switch(action.type){
        
        case 'LOGIN' :
            return {
                ...state,
                user : action.payload,
                isLogged:true
            }
            
        default :
           return state
    }
}

export {reducer}