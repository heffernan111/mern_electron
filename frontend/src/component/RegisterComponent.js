import React, { useEffect, useState } from "react";
import { isAuth, register } from "../action/authAcation";
import { withRouter } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Container
} from "reactstrap";

const RegisterComponent = ({ history }) => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        loading: false,
        message: "",
        showForm: true,
    });

    const { name, email, password, error, loading, message, showForm } = values;
    useEffect(() => {
        isAuth() && history.push("/");
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.table({ name, email, password, error, loading, message, showForm });

        setValues({ ...values, loading: true, error: false });
        const user = { name, email, password };

        try {
            register(user).then((data) => {
        try {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
                console.log("server error");
            } else {
                setValues({
                  ...values,
                  name: "",
                  email: "",
                  password: "",
                  error: "",
                  loading: false,
                  message: data.message,
                  showForm: false,
                });
            }
        } catch (err) {
            console.log(err);
        }
        });
        } catch (error) {
            console.log("error something");
        }
    };

    const handleChange = (name) => (e) => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const showLaoding = () => loading ? <div className="alert alert-info">Loading...</div> : "";
    const showError = () => error ? <div className="alert alert-danger">{error}</div> : "";
    const showMessage = () => message ? <div className="alert alert-info">{message}</div> : "";

    const registerForm = () => {
        return (
            <>
            <Container className="d-flex mt-5">
                <Row className="m-auto col-md-6">
                    <Col>
                        <div className="card">
                            <div className="card-header d-flex justify-content-between align-items-center">
                            Register
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <input
                                            value={name}
                                            onChange={handleChange("name")}
                                            type="text"
                                            className="form-control"
                                            placeholder="Name..."
                                        />
                                        <br />

                                        <input
                                            value={email}
                                            onChange={handleChange("email")}
                                            type="email"
                                            className="form-control"
                                            placeholder="Email..."
                                        />
                                        <br />

                                        <input
                                            value={password}
                                            onChange={handleChange("password")}
                                            type="password"
                                            className="form-control"
                                            placeholder="Password..."
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary mt-3"> Register </button>
                                </form>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            </>
        );
    };

  return (
      <div className="container">
        {showLaoding()}
        {showError()}
        {showMessage()}
        {showForm && registerForm()}
        </div>
    );
};

export default withRouter(RegisterComponent);
