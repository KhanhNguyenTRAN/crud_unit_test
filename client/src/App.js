import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ItemList from './components/itemList';
import ItemForm from './components/itemForm';
import ItemDetail from './components/itemDetail';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ItemList />} />
                <Route path="/create" element={<ItemForm />} />
                <Route path="/edit/:id" element={<ItemForm />} />
                <Route path="/items/:id" element={<ItemDetail />} />
            </Routes>
        </Router>
    );
};

export default App;
