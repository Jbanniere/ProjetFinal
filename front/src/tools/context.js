import React from "react"

const StoreContext = React.createContext([]) 

const initialState = {
    user : {}
}

export {StoreContext, initialState}