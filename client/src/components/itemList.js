import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllItems, deleteItem } from '../api/itemService';

const ItemList = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        const response = await getAllItems();
        setItems(response.data);
    };

    const handleDelete = async (id) => {
        await deleteItem(id);
        fetchItems();
    };

    return (
        <div>
            <h1>Items</h1>
            <Link to="/create">Create New Item</Link>
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
