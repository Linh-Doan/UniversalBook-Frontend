import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { Comment } from "../Comment";

describe('Comment', () => { 
    test('render text correctly', () => {
        render(<Comment commentText="This is a comment"/>);
        expect(screen.getByText("This is a comment")).toBeInTheDocument();
    })
 })