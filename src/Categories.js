import React from 'react';

export default function Categories({ list = [], currentActiveCategory, onClick }) {
  return (
    <ul className="nav nav-tabs">
      {list.map((category) => (
        <li className="nav-item" onDoubleClick={() => onClick(category)}>
          <a
            className={`nav-link ${
              currentActiveCategory === category ? 'active' : ''
            }`}
          >
            {category}
          </a>
        </li>
      ))}
    </ul>
  );
}

