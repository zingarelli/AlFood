import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import IRestaurante from '../../../interfaces/IRestaurante';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import http from "../../../http";

/**
 * Obtém a lista de restaurantes e possibilita efetuar tarefas administrativas:
 * - criar / remover / editar restaurantes
 * @returns Página administrativa com a lista de restaurantes
 */
const AdministracaoRestaurantes = () => {
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

    useEffect(() => {
        // no lado da administração, o endpoint definido na api é pela v2
        http.get<IRestaurante[]>('restaurantes/')
            .then(response => {
                setRestaurantes(response.data);
            })
            .catch(err => {
                console.log(err)
            });
    }, [])

    // remove o restaurante da base da API
    const excluir = (restaurante: IRestaurante) => {
        http.delete(`restaurantes/${restaurante.id}/`)
            .then(response => {
                console.log('Restaurante excluído');

                // atualiza a lista filtrando pelo id do restaurante removido
                // evita precisar chamar novamente a API
                const listaAtualizada = restaurantes.filter(item => item.id !== restaurante.id);
                setRestaurantes([...listaAtualizada]);
            })
            .catch(err => console.log(err))
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell>Editar</TableCell>
                        <TableCell>Excluir</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurantes.map(restaurante => (
                        <TableRow key={restaurante.id}>
                            <TableCell>{restaurante.nome}</TableCell>
                            <TableCell>
                                <Link to={`/admin/restaurantes/${restaurante.id}`}>[ editar ]</Link>
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={() => excluir(restaurante)}
                                >
                                    Excluir
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AdministracaoRestaurantes;