import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import IPrato from '../../../interfaces/IPrato';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import http from "../../../http";

/**
 * Obtém a lista de Pratos e possibilita efetuar tarefas administrativas:
 * - criar / remover / editar pratos
 * @returns Página administrativa com a lista de pratos
 */
const AdministracaoPratos = () => {
    const [pratos, setPratos] = useState<IPrato[]>([])

    useEffect(() => {
        // no lado da administração, o endpoint definido na api é pela v2
        http.get<IPrato[]>('pratos/')
            .then(response => {
                setPratos(response.data);
            })
            .catch(err => {
                console.log(err)
            });
    }, [])

    // remove o prato da base da API
    const excluir = (prato: IPrato) => {
        http.delete(`pratos/${prato.id}/`)
            .then(response => {
                console.log('Prato excluído');

                // filtra a lista sem precisar chamar novamente a API
                const listaAtualizada = pratos.filter(item => item.id !== prato.id);
                setPratos([...listaAtualizada]);
            })
            .catch(err => console.log(err))
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell>Tag</TableCell>
                        <TableCell>Imagem</TableCell>
                        <TableCell>Editar</TableCell>
                        <TableCell>Excluir</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pratos.map(prato => (
                        <TableRow key={prato.id}>
                            <TableCell>{prato.nome}</TableCell>
                            <TableCell>{prato.tag}</TableCell>
                            <TableCell>
                                <a href={prato.imagem} target="_blank" rel="noreferrer">
                                    [ ver imagem ]
                                </a>
                            </TableCell>
                            <TableCell>
                                <Link to={`/admin/pratos/${prato.id}`}>[ editar ]</Link>
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={() => excluir(prato)}
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

export default AdministracaoPratos;