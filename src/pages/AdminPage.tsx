import React from "react";
import { Link, useHistory } from "react-router-dom";
import { app } from "../firebase-config";

import styled from "styled-components";
import { Button } from "../components/Button";


const AdminPageWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`;

const AdminPageContent = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    padding-top: 30px;
`;

export default function AdminPage() {
    const history = useHistory();

    const onClickHandler = (path: string) => {
        history.push(path);
    };

    return (
        <>
            <AdminPageWrapper>
                <AdminPageContent>
                    <Button onClick={() => onClickHandler("/edit")}>
                        <i className="far fa-file-image"></i> Redigera texter
                    </Button>
                    <Button onClick={() => onClickHandler("/addphoto")}>
                        <i className="far fa-file-image"></i> Ladda upp
                        gallerifoto
                    </Button>
                </AdminPageContent>
            </AdminPageWrapper>
            {/* <div className="admin">
        <Container style={{maxWidth: "500px"}} >
            <Card style={{border: "none"}}>
                <Card.Body style={{ margin: "auto 0", border: "none" }} className="d-flex flex-column align-items-center justify-content-center">
                    <Link className="mb-3" to="/addpost"><Button style={{width: "320px", height: "100px", fontSize:"1.5rem", backgroundColor:"black", border: "none"}}><i className="fas fa-calendar-alt"></i> Skapa nytt evenemang</Button></Link>
                    <Link className="mb-3" to="/createnewadmin"><Button style={{width: "320px", height: "100px", fontSize:"1.5rem", backgroundColor:"black", border: "none"}}><i className="fas fa-user-plus"></i> Skapa ny Admin</Button></Link>
                    <Link className="mb-3" to="/addphoto"><Button style={{width: "320px", height: "100px", fontSize:"1.5rem", backgroundColor:"black", border: "none"}}><i className="far fa-file-image"></i> Ladda upp gallerifoto</Button></Link>
                    <Link to="/editcontent"><Button style={{width: "320px", height: "100px", fontSize:"1.5rem", backgroundColor:"black", border: "none"}}><i className="fa-solid fa-paragraph"></i> Redigera texter</Button></Link>
                    <Button style={{width: "320px", height: "100px", fontSize:"1.5rem"}} variant="warning" className="mt-3" onClick={() => app.auth().signOut()}><i class="fas fa-sign-out-alt"></i> Sign out</Button>
                </Card.Body>
            </Card>

        </Container> 
        </div>*/}
        </>
    );
}
