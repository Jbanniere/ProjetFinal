const reducer = (state,action) => {
    
    switch(action.type){
        
        case 'INCR' :
            return {
                ...state, count:state.count+1
            }
        case 'DECR' :
            return {
                ...state, count:state.count-1
            }
            
        default :
           return state
    }
}

export {reducer}