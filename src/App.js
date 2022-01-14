import './App.css';
import React from "react";
import { AppRouter } from "./routes";
import 'bootstrap/dist/css/bootstrap.css';

function App() {

  return (
    <div className="App container">
      <AppRouter />
    </div>
  );
}

export default App;
