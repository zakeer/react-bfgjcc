import React from 'react';
import './style.css';

import UserForm from './userForm';

export default function App() {
  return (
    <div className="container py-4">
      <h1>Bakery Products</h1>

      <UserForm />
    </div>
  );
}
