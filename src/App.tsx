import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Gallery from './components/Gallery'
import Detail from './components/Detail'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Route exact path='/' component={Gallery}></Route>
          <Route path='/detail' component={Detail}></Route>
        </Router>
      </header>
    </div>
  );
}

export default App;
