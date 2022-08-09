import {beforeEach, describe, expect, test} from 'vitest';
import {render, screen} from '@testing-library/react';
import App, { UserLoginUI} from '../App'


describe("Login UI", () => {

    beforeEach( () => {
        render(<App />) 

    } )
    test("Should Show Login Form ", () => {
        expect(screen.getAllByText(/Login/i)).toBeDefined()
    })

    test("Should not display Chat UI", () => {
        expect(screen.queryByText(/Send/i)).toBeNull()
    })

})



