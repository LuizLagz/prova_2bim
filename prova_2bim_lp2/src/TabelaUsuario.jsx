import { Button, Container, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { buscarUsuarios } from "./redux/usuarioReducer";
import { useEffect } from 'react';

export default function TabelaUsuario(props) {

    const dispatch = useDispatch();
    const { estado, mensagem, listaUsuarios} = useSelector((state) => state.usuarioSlice);

    useEffect(() => {
        dispatch(buscarUsuarios());
    }, [dispatch]);

    return (
        <Container>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nick</th>
                        <th>URL Avatar</th>
                    </tr>
                </thead>
                <tbody>
                    {listaUsuarios && Array.isArray(listaUsuarios) && listaUsuarios.length > 0 ? (
                        listaUsuarios.map((usuario) => (
                            <tr key={usuario.id}>
                                <td>{usuario.nickname}</td>
                                <td>{usuario.urlAvatar}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2">Nenhum usuário encontrado</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Container>
    );
}