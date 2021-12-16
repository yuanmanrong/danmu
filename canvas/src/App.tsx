import React, { Component } from "react"
import { BrowserRouter, Route } from "react-router-dom"
import './App.css'
import CanvasTest from "./CanvasTest"

class App extends Component<any, any>{
  render(): React.ReactNode {
    return (
      <div>
        <CanvasTest></CanvasTest>
      </div>
    )
  }
}
export default App