import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, useParams } from 'react-router-dom';
import ItemDetail from './ItemDetail';
import * as itemService from '../api/itemService';

jest.mock('../api/itemService');
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(),
}));

test('renders item detail', async () => {
    useParams.mockReturnValue({ id: '1' });
    itemService.getItemById.mockResolvedValue({
        data: { _id: '1', name: 'Item 1', description: 'Description 1' },
    });

    render(
        <BrowserRouter>
            <ItemDetail />
        </BrowserRouter>
    );

    await waitFor(() => {
        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.getByText('Description 1')).toBeInTheDocument();
    });
});

test('handles item not found', async () => {
    useParams.mockReturnValue({ id: '1' });
    itemService.getItemById.mockRejectedValue({ response: { status: 404 } });

    render(
        <BrowserRouter>
            <ItemDetail />
        </BrowserRouter>
    );

    await waitFor(() => {
        expect(screen.getByText('Item not found')).toBeInTheDocument();
    });
});
