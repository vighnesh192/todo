import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import AppNavbar from "./components/AppNavbar";
import TodoList from "./components/TodoList";
import About from './components/pages/About';


function App() {
  return (
    <BrowserRouter>
      <AppNavbar />
      <Route exact path="/" render={props => (
        <div className="App">
          <TodoList />
        </div>
      )} />
      
      <Route path="/about" component={About} />
    </BrowserRouter>
  );
}

export default App;
