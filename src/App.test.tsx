import * as React from "react";
import {render, screen, cleanup} from "@testing-library/react"
import App from "./App";



test('run', () => {
    render(<App/>);
    const app = screen.getByTestId('app');
    expect(app).toBeInTheDocument()

})
test('number of grids', () => {
    render(<App/>);
    const titles = screen.getAllByTestId('title');
    expect(titles.length).toBe(3);
})
