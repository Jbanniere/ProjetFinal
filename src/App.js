import React from 'react';
import {StoreContext} from "./tools/context.js"
import './App.css';

function App() {
  const [state, dispatch] = React.useContext(StoreContext)
  
  const increment = () => {
      dispatch({
        type : 'INCR' ,
      })
  }
  
   const decrement = () => {
      dispatch({
        type : 'DECR' ,
      })
  }
  
  return (
    <div className="App">
        <p> Counter = {state.count} </p>
        <button onClick={increment}>+1</button>
        <button onClick={decrement}>-1</button>
    </div>
  );
}

export default App;
