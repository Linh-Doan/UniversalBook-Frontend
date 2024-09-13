import { render, screen } from "@testing-library/react";
import { Register } from "../Register"
import { BrowserRouter } from "react-router-dom"

describe('Login', () => {
    
    it('renders Register component', () => {
        render(<BrowserRouter><Register/></BrowserRouter>);
        expect(screen.getByText('Email')).toBeInTheDocument;
        expect(screen.getByText('Password')).toBeInTheDocument;
        expect(screen.getByText('Confirm Password')).toBeInTheDocument;
        expect(screen.getByRole('button', {name: "Register"})).toBeInTheDocument;
    })
})