import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ItemList from './components/ItemList';
import ItemForm from './components/ItemForm';
import ItemDetail from './components/ItemDetail';

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
