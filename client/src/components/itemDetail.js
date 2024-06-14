import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getItemById } from '../api/itemService';

const ItemDetail = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchItem(id);
    }, [id]);

    const fetchItem = async (id) => {
        try {
            const response = await getItemById(id);
            setItem(response.data);
        } catch (err) {
            setError('Item not found');
        }
    };

    if (error) return <div>{error}</div>;
    if (!item) return <div>Loading...</div>;

    return (
        <div>
            <h1>{item.name}</h1>
            <p>{item.description}</p>
            <Link to={`/edit/${item._id}`}>Edit</Link>
        </div>
    );
};

export default ItemDetail;
