// App.js
import React, { Component } from 'react';
import axios from 'axios';
import { Container } from 'reactstrap';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

class App extends Component {
  state = {
    users: [],
    form: { id: '', firstName: '', lastName: '', email: '', department: '' },
    error: null,
    currentPage: 1,
    usersPerPage: 5,
  };

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = () => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        const users = response.data.map(user => ({
          id: user.id,
          firstName: user.name.split(' ')[0],
          lastName: user.name.split(' ')[1] || '',
          email: user.email,
          department: 'IT'
        }));
        this.setState({ users, error: null });
      })
      .catch(() => this.setState({ error: 'Error fetching users' }));
  };

  handleInputChange = (e) => {
    this.setState({ form: { ...this.state.form, [e.target.name]: e.target.value } });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { id, ...user } = this.state.form;
    const newId = this.state.users.length > 0 ? Math.max(...this.state.users.map(u => u.id)) + 1 : 1;

    if (id) {
      axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, user)
        .then(() => {
          this.setState({
            users: this.state.users.map((u) => (u.id === id ? { ...user, id } : u)),
            form: { id: '', firstName: '', lastName: '', email: '', department: '' },
          });
        })
        .catch(() => this.setState({ error: 'Error updating user' }));
    } else {
      axios.post('https://jsonplaceholder.typicode.com/users', user)
        .then((response) => {
          this.setState({
            users: [...this.state.users, { ...response.data, id: newId }],
            form: { id: '', firstName: '', lastName: '', email: '', department: '' },
          });
        })
        .catch(() => this.setState({ error: 'Error adding user' }));
    }
  };

  handleEdit = (user) => {
    this.setState({ form: { ...user, id: user.id } });
  };

  handleDelete = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => {
        this.setState({ users: this.state.users.filter((user) => user.id !== id) });
        alert('User deleted successfully');
      })
      .catch(() => this.setState({ error: 'Error deleting user' }));
  };

  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  render() {
    const { currentPage, usersPerPage, users, form, error } = this.state;

    return (
      <Container className="mt-5">
        <h1 className="text-center text-primary mb-4 ">User Management System</h1>
        <UserForm form={form} handleInputChange={this.handleInputChange} handleSubmit={this.handleSubmit} />
        {error && <p className="text-danger text-center">{error}</p>}
        <UserList
          users={users}
          currentPage={currentPage}
          usersPerPage={usersPerPage}
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
          handlePageChange={this.handlePageChange} 
        /> 
      </Container>
    );
  }
}

export default App;
