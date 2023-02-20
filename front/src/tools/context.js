import React from "react"

const StoreContext = React.createContext([]) 

const initialState = {
    user : {},
    cart : [],
}

export {StoreContext, initialState}