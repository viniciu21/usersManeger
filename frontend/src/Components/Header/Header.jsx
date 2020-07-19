import './Header.css';
import React from 'react';

function Header(props) {
  return (
    <header className="hd d-nome d-sm-flex flex-columm">
      <h1 className="mt-3">
        <i className={`fa fa-${props.icon}`} /> {props.title}
        <p className="lead text-muted"> {props.subtitle}</p>
      </h1>
    </header>
  );
}

export default Header;
