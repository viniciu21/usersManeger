import React, { useState, useEffect } from 'react';
import api from '../../Services/api';
import Main from '../Main/Main';

import { toast } from 'react-toastify';

/**
 * All of the app's rules are condensated in this file.
 * There's the @function getUsers to get data from the backend user,
 * the @function onSave to save or update data from a new database user,
 * the @function getUpdatedList to update deleted, added or simply updated users,
 * the @function renderForm to generate our input HTML and
 * @function renderTable to generate our table with users' data.
 */

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
    try {
      const response = await api.get('/users');
      setUsersList(response.data);
    } catch (e) {
      toast.error(e.response.data);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const onSave = async () => {
    const userUpdated = { ...user };
    const method = user.id ? 'put' : 'post';
    try {
      const response = await api[method]('/users', userUpdated);
      const newList = getUpdatedList(response.data);
      setUser(initialUser);
      setUsersList(newList);
      toast.success(`Novo usuário ${method} com sucesso`);
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

  const cancel = () => {
    setUser(initialUser);
  };

  const load = (user) => {
    setUser({ ...user });
  };

  const remove = async (user) => {
    try {
      await api.delete('/users', { data: { id: user.id } });
      const newList = getUpdatedList(user, false);
      setUsersList(newList);
      toast.success('Usuário deletado', { autoClose: 1000 });
    } catch (e) {
      toast.error(e.response.data);
    }
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
              <label>Senha</label>
              <input
                type="password"
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
              <button className="btn btn-primary " onClick={(e) => onSave(e)}>
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

  return (
    <Main {...headerProps}>
      <h1 className="text-center p-2">Complete os dados e salve seu usuário</h1>
      <div>
        {renderForm()}
        <h3 className="text-center p-4">Todos os usuários</h3>
        {renderTable()}
      </div>
    </Main>
  );
}

export default UserCrud;
