import React from 'react';
import Main from '../Main/Main';

function Home() {
  return (
    <Main icon="home" title="inicio" subtitle="Cadrasto de usuário">
      <div className="display-4 text-center">Bem vindo !!</div>
      <hr />
      <p className="mb-0 text-center">
        Sistema para exemplificar o controle de usuários em React!!
      </p>
      <p className="mb-0 text-center">
        Aqui podemos Adicionar novos usuários, modificar existentes, ve-los e
        exclui-los !!
      </p>
      <p className="mb-0 text-center">
        Este app foi feito com React no frontend e bootstrap, e no backend em
        node.js
      </p>
    </Main>
  );
}

export default Home;
