import React from 'react';
import './Footer.css';

function Footer(props) {
  return (
    <footer className="footer">
      <span>
        Desenvolvido com <i className="fa fa-heart text-danger" /> por
        <strong>
          <span className="text-info"> Vinicius Oliveira da Silva</span>
        </strong>
        .
      </span>
    </footer>
  );
}

export default Footer;
