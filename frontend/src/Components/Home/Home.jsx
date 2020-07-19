import React from 'react';
import Main from '../Main';

function Home() {
  return (
    <Main icon="home" title="inicio" subtitle="Cadrasto de usuário">
      <div className="display-4">Bem vindo !!</div>
      <hr />
      <p className="mb-0">
        Sistema para exemplificar a construção de um cadrastro desenvolvido em
        React!!
      </p>
    </Main>
  );
}

export default Home;
