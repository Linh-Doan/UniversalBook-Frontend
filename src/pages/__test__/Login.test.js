import {render, screen} from '@testing-library/react';
import { Login } from "../Login"
import { BrowserRouter } from "react-router-dom"

describe('Login', () => {
    
    it('renders Login component', () => {
        render(<BrowserRouter><Login/></BrowserRouter>);
        expect(screen.getByText('Email')).toBeInTheDocument;
        expect(screen.getByText('Password')).toBeInTheDocument;
        expect(screen.getByRole('button', {name: /Login/i})).toBeInTheDocument;
    })
})