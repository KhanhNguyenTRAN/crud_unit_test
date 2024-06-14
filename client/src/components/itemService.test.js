import axios from 'axios';
import { getAllItems, getItemById, createItem, updateItem, deleteItem } from '../api/itemService';

jest.mock('axios');

test('fetches all items', async () => {
    const data = { data: [{ _id: '1', name: 'Item 1' }] };
    axios.get.mockResolvedValue(data);

    const result = await getAllItems();

    expect(result).toEqual(data);
    expect(axios.get).toHaveBeenCalledWith('http://localhost:8000/api/items');
});

test('fetches item by id', async () => {
    const data = { data: { _id: '1', name: 'Item 1' } };
    axios.get.mockResolvedValue(data);

    const result = await getItemById('1');

    expect(result).toEqual(data);
    expect(axios.get).toHaveBeenCalledWith('http://localhost:8000/api/items/1');
});

test('creates an item', async () => {
    const item = { name: 'New Item', description: 'New Description' };
    const data = { data: { ...item, _id: '1' } };
    axios.post.mockResolvedValue(data);

    const result = await createItem(item);

    expect(result).toEqual(data);
    expect(axios.post).toHaveBeenCalledWith('http://localhost:8000/api/items', item);
});

test('updates an item', async () => {
    const item = { name: 'Updated Item', description: 'Updated Description' };
    const data = { data: { ...item, _id: '1' } };
    axios.put.mockResolvedValue(data);

    const result = await updateItem('1', item);

    expect(result).toEqual(data);
    expect(axios.put).toHaveBeenCalledWith('http://localhost:8000/api/items/1', item);
});

test('deletes an item', async () => {
    const data = { data: { message: 'Item deleted' } };
    axios.delete.mockResolvedValue(data);

    const result = await deleteItem('1');

    expect(result).toEqual(data);
    expect(axios.delete).toHaveBeenCalledWith('http://localhost:8000/api/items/1');
});
