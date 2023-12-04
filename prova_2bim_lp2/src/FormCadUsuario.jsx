import { useState } from "react";
import { Button, Container, Form, Row, Col, FloatingLabel } from "react-bootstrap";
import { useSelector, useDispatch} from 'react-redux';
import { adicionarUsuario} from './redux/usuarioReducer';

export default function FormCadUsuario(props) {
    const usuVazio = {
        nome:'',
        avatar:'',
    }
    const [usuario, setUsuario] = useState(usuVazio);
    const [formValidado, setFormValidado] = useState(false);
    //const {status,mensagem,listaUsu} = useSelector((state)=>state.usuario);
    const dispatch = useDispatch();

    function manipularMudancas(e){
        const componente = e.currentTarget;
        console.log(componente.value)
        setUsuario({...usuario,[componente.name]:componente.value});
    }

    function manipularSubmissao(e){
        const form = e.currentTarget; 
        if (form.checkValidity()){
            dispatch(adicionarUsuario(usuario));
            setUsuario(usuVazio);
            setFormValidado(false);
        }
        else{
            setFormValidado(true);
        }

        e.stopPropagation();
        e.preventDefault();
    }

    return (
        <Container>
            <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                <Row>
                    <Col>
                        <Form.Group>
                            <FloatingLabel
                                label="Nome/Nick:"
                                className="mb-3"
                            >
                                <Form.Control 
                                    type="text" 
                                    placeholder="Nome/Nick" 
                                    id="nome" 
                                    name="nome" 
                                    value={usuario.nome}
                                    onChange={manipularMudancas}
                                    required />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Informe o nick!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Form.Group>
                            <FloatingLabel
                                label="URL Avatar:"
                                className="mb-3"
                            >
                                <Form.Control 
                                    type="text" 
                                    placeholder="" 
                                    id="avatar" 
                                    name="avatar"
                                    onChange={manipularMudancas}
                                    value={usuario.avatar}
                                    required
                                    />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">URL da Imagem</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} offset={5} className="d-flex justify-content-end">
                        <Button type="submit" variant={"primary"}>{"Cadastrar"}</Button>
                    </Col>
                    <Col md={6} offset={5}>
                        <Button type="button" variant={"secondary"} onClick={() => {
                                
                            }
                        }>Voltar</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}