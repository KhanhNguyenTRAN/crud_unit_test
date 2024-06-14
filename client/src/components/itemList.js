import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllItems, deleteItem } from '../api/itemService';

const ItemList = () => {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await getAllItems();
            setItems(response.data);
        } catch (error) {
            setError('Error fetching items');
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteItem(id);
            fetchItems();
        } catch (error) {
            setError('Error deleting item');
        }
    };

    return (
        <div>
            <h1>Items</h1>
            <Link to="/create">Create New Item</Link>
            {error && <p>{error}</p>}
            <ul>
                {items.map((item) => (
                    <li key={item._id}>
                        <Link to={`/items/${item._id}`}>{item.name}</Link>
                        <button onClick={() => handleDelete(item._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ItemList;
