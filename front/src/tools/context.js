import React from "react"

const StoreContext = React.createContext([]) 

const initialState = {
    user : {
        isAdmin : false,
        isLogged: false,
        id:null
    },
    cart : [],
    products : []
}

export {StoreContext, initialState}