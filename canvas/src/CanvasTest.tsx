import React, { Component } from "react"
import { BrowserRouter, Route } from "react-router-dom"
import CanvasBarrage from "./CanvasBarrage/CanvasBarrage"

class CanvasTest extends Component<any, any>{
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
export default CanvasTest