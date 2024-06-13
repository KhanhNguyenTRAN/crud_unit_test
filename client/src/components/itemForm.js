import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createItem, getItemById, updateItem } from '../api/itemService';

const ItemForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            fetchItem(id);
        }
    }, [id]);

    const fetchItem = async (id) => {
        const response = await getItemById(id);
        setName(response.data.name);
        setDescription(response.data.description);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const item = { name, description };
        if (id) {
            await updateItem(id, item);
        } else {
            await createItem(item);
        }
        navigate('/');
    };

    return (
        <div>
            <h1>{id ? 'Edit Item' : 'Create Item'}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default ItemForm;
