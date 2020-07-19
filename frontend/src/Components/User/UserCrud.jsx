import React, { useState, useEffect } from 'react';
import api from '../../Services/api';
import Main from '../Main/Main';

import { toast } from 'react-toastify';

const headerProps = {
  icon: 'users',
  title: 'Usuários',
  subtitle: 'Cadastro de usuários: Incluir, Listar, Alterar e Excluir!',
};

const initialUser = { name: '', password: '', email: '' };

function UserCrud() {
  const [usersList, setUsersList] = useState([]);
  const [user, setUser] = useState(initialUser);

  const getUsers = async () => {
    const response = await api.get('/users');
    setUsersList(response.data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const OnSave = async () => {
    const userUpdated = { ...user };
    const method = user.id ? 'put' : 'post';
    try {
      const response = await api[method]('/users', userUpdated);
      const newList = getUpdatedList(response.data);
      setUser(initialUser);
      setUsersList(newList);
      toast.success(`New user ${method} with success`);
    } catch (e) {
      toast.error(e.response.data);
    }
  };

  const getUpdatedList = (user, add = true) => {
    const list = usersList.filter((u) => u.id !== user.id);
    if (add) list.unshift(user);
    return list;
  };

  const updateInputField = (event) => {
    const userUpdated = { ...user };
    userUpdated[event.target.name] = event.target.value;
    setUser({ ...userUpdated });
  };

  const cancel = (e) => {
    setUser(initialUser);
  };

  const renderForm = () => {
    return (
      <div className="form">
        <div className="row">
          <div className="col-12 col-md-4">
            <div className="form-group">
              <label>Nome</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={user.name}
                onChange={(e) => updateInputField(e)}
                placeholder="Digite o nome..."
              />
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                className="form-control"
                name="email"
                value={user.email}
                onChange={(e) => updateInputField(e)}
                placeholder="Digite a email..."
              />
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="form-group">
              <label>Password</label>
              <input
                type="text"
                className="form-control"
                name="password"
                value={user.password}
                onChange={(e) => updateInputField(e)}
                placeholder="Digite a senha..."
              />
            </div>
          </div>

          <div className="col-12">
            <div className="col-12 d-flex justify-content-center ">
              <button className="btn btn-primary " onClick={(e) => OnSave(e)}>
                Salvar
              </button>

              <button
                className="btn btn-secondary ml-2"
                onClick={(e) => cancel(e)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderTable = () => {
    return (
      <table className="table mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Senha</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </table>
    );
  };

  const load = (user) => {
    setUser({ ...user });
  };

  const remove = (user) => {
    try {
      const response = api.delete('/users', { data: { id: user.id } });
      console.log(response.data);
      const newList = getUpdatedList(user, false);
      setUsersList(newList);
    } catch (e) {
      console.log(e);
    }
  };

  const renderRows = () => {
    return usersList.map((user) => {
      return (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.password}</td>
          <td>
            <button className="btn btn-warning" onClick={() => load(user)}>
              <i className="fa fa-pencil"></i>
            </button>
            <button
              className="btn btn-danger ml-2"
              onClick={() => remove(user)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <Main {...headerProps}>
      {renderForm()}
      {renderTable()}
    </Main>
  );
}

export default UserCrud;
