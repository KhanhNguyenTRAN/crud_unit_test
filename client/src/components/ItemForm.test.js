import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, useNavigate, useParams } from 'react-router-dom';
import ItemForm from './ItemForm';
import * as itemService from '../api/itemService';

jest.mock('../api/itemService');
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
    useParams: jest.fn(),
}));

const mockNavigate = useNavigate;

test('renders create item form', () => {
    useParams.mockReturnValue({ id: null });

    render(
        <BrowserRouter>
            <ItemForm />
        </BrowserRouter>
    );

    expect(screen.getByText('Create Item')).toBeInTheDocument();
});

test('renders edit item form', async () => {
    useParams.mockReturnValue({ id: '1' });
    itemService.getItemById.mockResolvedValue({
        data: { _id: '1', name: 'Item 1', description: 'Description 1' },
    });

    render(
        <BrowserRouter>
            <ItemForm />
        </BrowserRouter>
    );

    await waitFor(() => {
        expect(screen.getByDisplayValue('Item 1')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Description 1')).toBeInTheDocument();
    });
});

test('submits the form', async () => {
    useParams.mockReturnValue({ id: null });
    const mockCreateItem = itemService.createItem;
    mockCreateItem.mockResolvedValue({});
    const navigate = jest.fn();
    mockNavigate.mockReturnValue(navigate);

    render(
        <BrowserRouter>
            <ItemForm />
        </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/name/i), {
        target: { value: 'New Item' },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
        target: { value: 'New Description' },
    });

    fireEvent.click(screen.getByText(/submit/i));

    await waitFor(() => {
        expect(mockCreateItem).toHaveBeenCalledWith({
            name: 'New Item',
            description: 'New Description',
        });
        expect(navigate).toHaveBeenCalledWith('/');
    });
});
