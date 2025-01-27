import React from 'react';
import { Form, FormGroup, Label, Input, Button, Col, Row } from 'reactstrap';

const UserForm = ({ form, handleInputChange, handleSubmit }) => {
  return (
    <Form onSubmit={handleSubmit} className="mb-4 form-container">
      <Row form>
        <Col md={6} sm={12}>
          <FormGroup>
            <Label for="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              value={form.firstName}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </FormGroup>
        </Col>
        <Col md={6} sm={12}>
          <FormGroup>
            <Label for="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              value={form.lastName}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </FormGroup>
        </Col>
      </Row>
      <Row form>
        <Col md={6} sm={12}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </FormGroup>
        </Col>
        <Col md={6} sm={12}>
          <FormGroup>
            <Label for="department">Department</Label>
            <Input
              id="department"
              name="department"
              value={form.department}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </FormGroup>
        </Col>
      </Row>
      <Button color="primary" type="submit" className="form-submit-btn w-100">
        {form.id ? 'Update' : 'Add'} User
      </Button>
    </Form>
  );
};

export default UserForm;
