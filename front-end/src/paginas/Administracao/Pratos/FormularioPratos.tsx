import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useState, useEffect, useRef } from "react"
import http from "../../../http";
import ITag from "../../../interfaces/ITag";
import IRestaurante from "../../../interfaces/IRestaurante";
import { useParams } from "react-router-dom";
import IPrato from "../../../interfaces/IPrato";

const FormularioPratos = () => {
    const params = useParams();

    const [nomePrato, setNomePrato] = useState('');
    const [descricao, setDescricao] = useState('');
    const [tag, setTag] = useState('');
    const [restaurante, setRestaurante] = useState('');
    const [imagem, setImagem] = useState<File | null>(null);
    const imagemInput = useRef<HTMLInputElement>(null);

    const [listaTags, setListaTags] = useState<ITag[]>([]);
    const [listaRestaurantes, setListaRestaurantes] = useState<IRestaurante[]>([]);

    // url e method serão alterados de acordo com a ação a ser feita (edição ou adição)
    const url = params.id ? `pratos/${params.id}/` : 'pratos/';
    const method = params.id ? 'PUT' : 'POST';

    // carrega os dados de tag e restaurantes
    useEffect(() => {
        // a API retorna um objeto que possui uma propriedade tag, que é um array
        http.get<{ tags: ITag[] }>('tags/')
            .then(response => setListaTags(response.data.tags))
            .catch(err => console.log(err));

        http.get<IRestaurante[]>('restaurantes/')
            .then(response => setListaRestaurantes(response.data))
            .catch(err => console.log(err));
    }, []);

    // se for uma ação de edição, carrega os dados do prato
    useEffect(() => {
        if (params.id) {
            http.get<IPrato>(`pratos/${params.id}/`)
                .then(response => {
                    setNomePrato(response.data.nome);
                    setDescricao(response.data.descricao);
                    setTag(response.data.tag);
                    setRestaurante(response.data.restaurante.toString());
                })
        }
    }, [params])

    const submeterForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // uso de FormData para pode enviar também o conteúdo binário da imagem
        const formData = new FormData();
        formData.append('nome', nomePrato);
        formData.append('descricao', descricao);
        formData.append('tag', tag);
        formData.append('restaurante', restaurante);

        // API não altera a imagem no caso de PUT
        if (!params.id && imagem) {
            formData.append('imagem', imagem);
        }

        http.request({
            url: url,
            method: method,
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formData
        })
            .then(() => {
                if (params.id) {
                    console.log('Prato atualizado');
                } else {
                    console.log('Prato adicionado');
                    setNomePrato('');
                    setDescricao('');
                    setTag('');
                    setRestaurante('');
                    setImagem(null);
                    if (imagemInput.current) {
                        imagemInput.current.value = '';
                    }
                }
            })
            .catch(err => console.log(err))
    }

    const selecionaArquivo = (e: React.ChangeEvent<HTMLInputElement>) => {
        // verifica se há pelo menos um arquivo na lista de arquivos
        if (e.target.files?.length) {
            setImagem(e.target.files[0]);
        }
        else {
            setImagem(null);
        }
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <Typography component="h1" variant="h6">Cadastro de Prato</Typography>
            <Box component="form" onSubmit={submeterForm} sx={{ width: '100%' }}>
                <TextField
                    label="Nome do Prato"
                    variant="standard"
                    value={nomePrato}
                    onChange={e => setNomePrato(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Descrição do Prato"
                    variant="standard"
                    value={descricao}
                    onChange={e => setDescricao(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />
                {/* necessário englobar o select e sua tag dentro de um FormControl */}
                <FormControl margin="normal" fullWidth>
                    <InputLabel id="select-tag">Tag</InputLabel>
                    <Select
                        labelId="select-tag"
                        label="Tag"
                        value={tag}
                        onChange={e => setTag(e.target.value)}
                    >
                        {listaTags.map(item => (
                            <MenuItem key={item.id} value={item.value}>
                                {item.value}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl margin="normal" fullWidth>
                    <InputLabel id="select-restaurante">Restaurantes</InputLabel>
                    <Select
                        labelId="select-restaurante"
                        label="Restaurantes"
                        value={restaurante}
                        onChange={e => setRestaurante(e.target.value)}
                    >
                        {listaRestaurantes.map(item => (
                            <MenuItem key={item.id} value={item.id}>
                                {item.nome}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <input type="file" onChange={selecionaArquivo} ref={imagemInput} />
                <Button type="submit" variant="outlined" fullWidth>Salvar</Button>
            </Box>
        </Box>
    )
}

export default FormularioPratos;