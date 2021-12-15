import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import './App.css'
import CanvasBarrage from "./CanvasBarrage/CanvasBarrage"

class App extends Component<any, any>{
  render(): React.ReactNode {
    return (
      <BrowserRouter>
        <Route
          path={"/"}
        />
        <Route
          path={"/test1"}
          component={CanvasBarrage}
        />
        <Route
          path={"/test2"}
          component={CanvasBarrage}
        />
      </BrowserRouter>
    )
  }
}
export default App