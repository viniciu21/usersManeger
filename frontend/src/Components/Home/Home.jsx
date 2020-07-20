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
        Aqui podemos adicionar novos usuários, modificar existentes, vê-los e
        excluí-los.!
      </p>
      <p className="mb-0 text-center">
        Este app foi feito com React no frontend e bootstrap, já o backend em
        node.js
      </p>
      <h5 className="text-center pt-4 text-danger">Observação</h5>
      <p className="text-center">
        As senhas dos usuários são visíveis apenas para quesito de aprendizagem,
        em um app real, elas não poderiam ser acessadas
      </p>
    </Main>
  );
}

export default Home;
