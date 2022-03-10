import React, { useCallback, useContext, useRef } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { app, auth } from "../firebase-config";
import { AuthContext, User } from "../AuthContext";
import { Redirect } from "react-router-dom";
import styled from "styled-components";

type StyledInputProps = {
    ref: React.ReactNode;
};

type ButtonProps = {
    onClick: (e: any) => Promise<void>;
};

const AdminPageWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`;

const StyledInput = styled.input<StyledInputProps>`
    border: 1px solid gray;
    width: 300px;
    height: 50px;
    border-radius: 8px;
`;

const Button = styled.div<ButtonProps>`
    text-decoration: none;
    width: 300px;
    height: 50px;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    border-radius: 5px;
    background-color: brown;
    font-weight: bold;
    cursor: pointer;
    color: white;
`;

const Login: React.FunctionComponent<RouteComponentProps> = () => {
    const currentUser = useContext(AuthContext);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const history = useHistory();

    const handleLogin = useCallback(
        async (event) => {
            event.preventDefault();
            try {
                if (emailRef.current && passwordRef.current) {
                    await auth.signInWithEmailAndPassword(
                        emailRef.current.value,
                        passwordRef.current.value
                    );
                    history.push("/admin");
                }
            } catch (error) {
                alert(error);
            }
        },
        [history]
    );

    if (currentUser) {
        return <Redirect to="/admin" />;
    }

    return (
        <>
            <AdminPageWrapper>
                <StyledInput type="email" ref={emailRef} required />
                <StyledInput type="password" ref={passwordRef} required />

                <Button onClick={handleLogin}>Send</Button>

                {/* <Container style={{ maxHeight: "100vh", maxWidth: "500px" }}>
          <div>
            <Card>
              <Card.Body>
                <h2 className="text-center mb-4">Log In</h2>
                <Form onSubmit={handleLogin}>
                  <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control size="sm" type="email" ref={emailRef} required />
                  </Form.Group>
                  <Form.Group id="password" className="w-100 mb-5">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} required />
                  </Form.Group>
                  <Button className="w-100 mt-6" type="submit">Login</Button>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </Container> */}
            </AdminPageWrapper>
        </>
    );
};

export default Login;
