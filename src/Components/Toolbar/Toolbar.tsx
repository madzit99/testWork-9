import React from "react";
import { NavLink } from "react-router-dom";

const Toolbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid w-50">
        <NavLink to="/" className="navbar-brand">
          Финансовый Тракер
        </NavLink>
        <ul className="navbar-nav mr-auto flex-row gap-2 flex-nowrap">
          <NavLink to="/categories" className="nav-link">
            <li className="nav-item">Категории</li>
          </NavLink>
          <NavLink to="/add" className="nav-link">
            <li className="nav-item">Добавить</li>
          </NavLink>
        </ul>
      </div>
    </nav>
  );
};

export default Toolbar;
