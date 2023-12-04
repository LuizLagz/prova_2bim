import { Container, Tab } from "react-bootstrap";
import Main from "./template/Main";
import FormCadUsuario from "./FormCadUsuario";
import { useState } from "react";
import TabelaUsuario from "./TabelaUsuario";

export default function TelaCadastroUsuario(props) { 
    return (
        <Container>
                <FormCadUsuario/>
                <TabelaUsuario/>
        </Container>
    )
}