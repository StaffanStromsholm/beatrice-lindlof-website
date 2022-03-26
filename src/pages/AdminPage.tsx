import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase-config";

import styled from "styled-components";
import { Button } from "../components/Button";
import { Context } from "../Context";

const AdminPageWrapper = styled.div`
    width: fit-content;
    margin: 50px auto 0 auto;
`;

const AdminPageContent = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    padding-top: 30px;
`;

export default function AdminPage() {
    const context = useContext(Context);
    const history = useHistory();

    const onClickHandler = (path: string) => {
        history.push(path);
    };

    const handleLogout = () => {
        auth.signOut();
        history.push("/");
    };

    useEffect(() => {
        if (!context?.currentUser) {
            history.push("/login");
        }
    }, [auth]);

    return (
        <>
            <AdminPageWrapper>
                <AdminPageContent>
                    <Button onClick={() => onClickHandler("/editaboutme")}>
                        Redigera Om mig
                    </Button>
                    <Button onClick={() => onClickHandler("/addphoto")}>
                        Ladda upp gallerifoto
                    </Button>
                    <Button onClick={handleLogout}>
                        <i
                            style={{ position: "absolute", left: "0" }}
                            className="far fa-right-from-bracket"
                        ></i>
                        Sign out
                    </Button>
                </AdminPageContent>
            </AdminPageWrapper>
        </>
    );
}
