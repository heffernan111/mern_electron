import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAuth, signout } from "../action/authAcation";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { withRouter } from "react-router-dom";

const Header = ({ history }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar color="light" light expand="md">
                <Link to="/">
                    <NavbarBrand style={{ cursor: "pointer" }} className="font-weight-bold">
                        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="-11.5 -10.23174 23 20.46348">
                            <title>React Logo</title>
                            <circle cx="0" cy="0" r="2.05" fill="#61dafb"/>
                            <g stroke="#61dafb" stroke-width="1" fill="none">
                                <ellipse rx="11" ry="4.2"/>
                                <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
                                <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
                            </g>
                        </svg>
                    </NavbarBrand>
                </Link>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto position-absolute top-0 end-0" navbar>
                        {!isAuth() && (
                            <React.Fragment>
                                <NavItem>
                                    <Link to="/register">
                                        <NavLink style={{ cursor: "pointer" }}>Register</NavLink>
                                    </Link>
                                </NavItem>
                                <NavItem>
                                    <Link to="/login">
                                        <NavLink style={{ cursor: "pointer" }}>Login</NavLink>
                                    </Link>
                                </NavItem>
                            </React.Fragment>
                        )}

                        {isAuth() && isAuth().role === 0 && (
                            <NavItem>
                                <Link to="/user">
                                    <NavLink style={{ cursor: "pointer" }}>{`${ isAuth().name}'s Dashboard`}</NavLink>
                                </Link>
                            </NavItem>
                        )}

                        {isAuth() && isAuth().role === 1 && (
                            <NavItem>
                                <Link to="/admin">
                                    <NavLink style={{ cursor: "pointer" }}>{`${ isAuth().name }'s Dashboard`}</NavLink>
                                </Link>
                            </NavItem>
                        )}

                        {isAuth() && (
                            <NavItem>
                                <NavLink style={{ cursor: "pointer" }} onClick={() => signout(() => history.push("/login"))} >
                                    SignOut
                                </NavLink>
                            </NavItem>
                        )}
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
};

export default withRouter(Header);
