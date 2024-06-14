import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ItemList from './ItemList';
import * as itemService from '../api/itemService';

jest.mock('../api/itemService');

const mockItems = [
    { _id: '1', name: 'Item 1', description: 'Description 1' },
    { _id: '2', name: 'Item 2', description: 'Description 2' },
];

test('renders items', async () => {
    itemService.getAllItems.mockResolvedValue({ data: mockItems });

    render(
        <BrowserRouter>
            <ItemList />
        </BrowserRouter>
    );

    await waitFor(() => {
        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.getByText('Item 2')).toBeInTheDocument();
    });
});

test('handles error during fetch', async () => {
    itemService.getAllItems.mockRejectedValue(new Error('Network Error'));

    render(
        <BrowserRouter>
            <ItemList />
        </BrowserRouter>
    );

    await waitFor(() => {
        expect(screen.getByText('Error fetching items')).toBeInTheDocument();
    });
});
