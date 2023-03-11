import { render, screen } from "@testing-library/react";
import App from "../App";

describe('App', () => {
    it('should have healine h1 with text Home', () => {
        render(<App />);
        expect(screen.getByText(/Home/i)).toBeInTheDocument();
    })
})