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
    expect(titles.length).toBe(4);
})
test('sadra', () => {
    render(<App/>);
    // eslint-disable-next-line jest/valid-expect-in-promise
    screen.findByText('sadra').then(res => {
        expect(res).toBeInTheDocument()
    })

})

test('filter', () => {
    render(<App/>);
    // eslint-disable-next-line jest/valid-expect-in-promise
    screen.findAllByPlaceholderText('FILTER HERE').then(res => {
        expect(res.length).toBe(2)
    })

})

test('search', () => {
    render(<App/>);
    // eslint-disable-next-line jest/valid-expect-in-promise
    screen.findAllByPlaceholderText('SEARCH HERE').then(res => {
        expect(res.length).toBe(1)
    })

})





