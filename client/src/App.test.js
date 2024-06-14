import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders create new item link', () => {
    render(<App />);
    const linkElement = screen.getByText(/Create New Item/i);
    expect(linkElement).toBeInTheDocument();
});
