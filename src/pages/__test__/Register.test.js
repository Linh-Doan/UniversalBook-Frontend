import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { Register } from "../Register"
import { BrowserRouter } from "react-router-dom"

describe('Register', () => {
    
    test('renders Register component', () => {
        render(<BrowserRouter><Register/></BrowserRouter>);
        expect(screen.getByText('Email')).toBeInTheDocument();
        expect(screen.getByText('Password')).toBeInTheDocument();
        expect(screen.getByText('Confirm Password')).toBeInTheDocument();
        expect(screen.getByRole('button', {name: "Register"})).toBeInTheDocument();
    })
})