import React from 'react';
import { Table, Button, Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const UserList = ({ users, currentPage, usersPerPage, handleEdit, handleDelete, handlePageChange }) => {
  const totalPages = Math.ceil(users.length / usersPerPage);
  const currentUsers = users.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

  return (
    <>
      <Table striped responsive className="user-table table-bordered table-hover">
        <thead>
          <tr className="bg-info text-white">
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.department}</td>
              <td>
                <Button color="warning" size="sm" onClick={() => handleEdit(user)} className="action-btn me-2">
                  Edit
                </Button>
                <Button color="danger" size="sm" onClick={() => handleDelete(user.id)} className="action-btn">
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination className="pagination-container" aria-label="Page navigation">
        <PaginationItem disabled={currentPage === 1}>
          <PaginationLink first onClick={() => handlePageChange(1)} />
        </PaginationItem>
        <PaginationItem disabled={currentPage === 1}>
          <PaginationLink previous onClick={() => handlePageChange(currentPage - 1)} />
        </PaginationItem>
        {[...Array(totalPages)].map((_, index) => (
          <PaginationItem key={index + 1} active={currentPage === index + 1}>
            <PaginationLink onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem disabled={currentPage === totalPages}>
          <PaginationLink next onClick={() => handlePageChange(currentPage + 1)} />
        </PaginationItem>
        <PaginationItem disabled={currentPage === totalPages}>
          <PaginationLink last onClick={() => handlePageChange(totalPages)} />
        </PaginationItem>
      </Pagination>
    </>
  );
};

export default UserList;
