import { Box, Button, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";
import http from "../../../http";

const FormularioRestaurante = () => {
    // parâmetros da URL para edição/remoção
    const params = useParams();

    const [nomeRestaurante, setNomeRestaurante] = useState('');

    const submeterForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (params.id) { // atualiza o restaurante
            http.put(
                `restaurantes/${params.id}/`,
                {
                    nome: nomeRestaurante
                }
            )
                .then(() => console.log('Restaurante atualizado'))
                .catch(err => console.log(err))
        }
        else { // adiciona restaurante
            http.post(
                'restaurantes/',
                {
                    nome: nomeRestaurante
                }
            )
                .then(() => console.log('Restaurante cadastrado'))
                .catch((err) => console.log(err));

            // limpa o campo de input
            setNomeRestaurante('');
        }
    }

    // carrrega os dados do restaurante, caso seja passado na URL
    useEffect(() => {
        if (params.id) {
            http.get<IRestaurante>(`restaurantes/${params.id}/`)
                .then(response => setNomeRestaurante(response.data.nome))
                .catch(err => console.log(err))
        }
    }, [params])

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <Typography component="h1" variant="h6">Cadastro de Restaurante</Typography>
            <Box component="form" onSubmit={submeterForm} sx={{ width: '100%' }}>
                <TextField
                    label="Nome do restaurante"
                    variant="standard"
                    value={nomeRestaurante}
                    onChange={e => setNomeRestaurante(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />
                <Button type="submit" variant="outlined" fullWidth>Salvar</Button>
            </Box>
        </Box>
    )
}

export default FormularioRestaurante