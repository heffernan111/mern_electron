import { login, autheticate, isAuth } from "../action/authAcation";
import React, { useState, useEffect } from "react";
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

const LoginComponent = ({ history }) => {
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        message: "",
        showForm: true,
    });

    const { email, password, error, loading, message, showForm } = values;

    useEffect(() => {
        isAuth() && history.push("/");
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.table({ name, email, password, error, loading, message, showForm });

        setValues({ ...values, loading: true, error: false });
        const user = { email, password };

        login(user).then((data) => {
            try {
                if (data.error) {
                    setValues({ ...values, error: data.error, loading: false });
                } else {
                    //save user token to cookie
                    //save user info to localStroage
                    //authenticate user
                    autheticate(data, () => {
                        if (isAuth() && isAuth().role === 1) {
                            history.push("/admin");
                        } else {
                            history.push("/user");
                        }
                    });
                }
            } catch (err) {
                console.log(err);
            }
        });
    };

    const handleChange = (name) => (e) => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const showLaoding = () => loading ? <div className="alert alert-info">Loading...</div> : "";
    const showError = () => error ? <div className="alert alert-danger">{error}</div> : "";
    const showMessage = () => message ? <div className="alert alert-info">{message}</div> : "";

    const loginForm = () => {
        return (
            <>
            <Container className="d-flex mt-5">
                <Row className="m-auto col-md-6">
                    <Col>
                        <div className="card">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                Login
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
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
                                    <button className="btn btn-primary mt-3">Login</button>
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
            {showForm && loginForm()}
        </div>
    );
};

export default withRouter(LoginComponent);
