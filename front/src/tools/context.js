import React from "react"

const StoreContext = React.createContext([]) 

const initialState = {
    user : {},
    cart : [],
    isLogged : false
}

export {StoreContext, initialState}