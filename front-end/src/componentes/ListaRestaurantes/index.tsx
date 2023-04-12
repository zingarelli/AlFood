import { useEffect, useState } from 'react';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import axios from 'axios';
import { IPaginacao } from '../../interfaces/IPaginacao';
import { Box, Button, InputLabel, MenuItem, Select, TextField } from '@mui/material';

const ListaRestaurantes = () => {

  // preenchimento dos dados  hardcoded
  // const restaurantes: IRestaurante[] = [
  //   {
  //     id: 1,
  //     nome: "Lyllys Cafe",
  //     pratos: [
  //       {
  //         id: 1,
  //         descricao: 'Lasanha à Bolonhesa',
  //         imagem: 'https://img.itdg.com.br/tdg/images/recipes/000/000/876/324587/324587_original.jpg',
  //         nome: 'Lasanha',
  //         restaurante: 1,
  //         tag: 'Italiana'
  //       },
  //       {
  //         id: 2,
  //         descricao: 'Strogonoff de Frango à brasileira',
  //         imagem: 'https://img.itdg.com.br/images/recipes/000/002/462/332854/332854_original.jpg',
  //         nome: 'Strogonoff',
  //         restaurante: 1,
  //         tag: 'Russa'
  //       },
  //       {
  //         id: 3,
  //         descricao: 'Empadão de Frango',
  //         imagem: 'https://img.itdg.com.br/tdg/images/recipes/000/008/054/38915/38915_original.jpg',
  //         nome: 'Empadão de Frango',
  //         restaurante: 1,
  //         tag: 'Portuguesa'
  //       }
  //     ]
  //   },
  //   {
  //     id: 2,
  //     nome: "Sugiro Sushi",
  //     pratos: [
  //       {
  //         id: 1,
  //         descricao: 'Combinado de 8 peças',
  //         imagem: 'https://www.sabornamesa.com.br/media/k2/items/cache/5031e263a4a258791d6306b2d3d9dbf6_XL.jpg',
  //         nome: 'Sushi',
  //         restaurante: 1,
  //         tag: 'Japonesa'
  //       },
  //       {
  //         id: 2,
  //         descricao: 'Sashimi de Salmão',
  //         imagem: 'https://www.comidaereceitas.com.br/img/sizeswp/1200x675/2009/04/sashimi_facil.jpg',
  //         nome: 'Sashimi',
  //         restaurante: 1,
  //         tag: 'Japonesa'
  //       }
  //     ]
  //   },
  //   {
  //     id: 3,
  //     nome: "Cantina da Escola",
  //     pratos: [
  //       {
  //         id: 1,
  //         descricao: 'Salgado de queijo com presunto',
  //         imagem: 'https://img.itdg.com.br/tdg/images/recipes/000/102/312/279767/279767_original.jpg',
  //         nome: 'Quejunto',
  //         restaurante: 1,
  //         tag: 'Lanche'
  //       },
  //       {
  //         id: 2,
  //         descricao: 'Coxinha de Frango',
  //         imagem: 'https://t1.rg.ltmcdn.com/pt/posts/1/9/1/coxinha_simples_191_600.jpg',
  //         nome: 'Coxinha',
  //         restaurante: 1,
  //         tag: 'Lanche'
  //       },
  //       {
  //         id: 3,
  //         descricao: 'Risole de Palmito',
  //         imagem: 'https://img.itdg.com.br/tdg/images/recipes/000/005/116/323871/323871_original.jpg',
  //         nome: 'Risole',
  //         restaurante: 1,
  //         tag: 'Lanche'
  //       }
  //     ]
  //   }
  // ]

  // utilizando os dados obtidos da API

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

  // para trabalhar com paginação do retorno da API
  const [proximaPagina, setProximaPagina] = useState('');
  const [paginaAnterior, setPaginaAnterior] = useState('');

  // para efetuar busca e ordenação dos resultados
  const [busca, setBusca] = useState('');
  const [ordena, setOrdena] = useState('');

  const endpoint = 'http://localhost:8000/api/v1/restaurantes/';

  // parâmetros da API
  interface IParams {
    ordering?: string;
    search?: string;
  }

  // carrega os dados da API, opcionalmente enviando parâmetros para busca
  const carregaDados = (url: string, options: IParams = {}) => {
    // tipando o retorno do get
    axios.get<IPaginacao<IRestaurante>>(url, { params: options })
      .then(response => {
        setRestaurantes(response.data.results);
        setProximaPagina(response.data.next);
        setPaginaAnterior(response.data.previous);
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    // 1ª versão, sem função que faz a requisição
    // axios.get<IPaginacao<IRestaurante>>('http://localhost:8000/api/v1/restaurantes/')
    //   .then(response => {
    //     setRestaurantes(response.data.results);
    //     setProximaPagina(response.data.next);
    //     setPaginaAnterior(response.data.previous);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   })

    carregaDados(endpoint);
  }, []);

  // obtém os restaurantes da próxima paginação da API
  // qdo não houver próxima página, a API retorna null em propriedade "next"
  // const verMais = () => {
  //   axios.get<IPaginacao<IRestaurante>>(proximaPagina)
  //     .then(response => {
  //       setRestaurantes(oldState => [...oldState, ...response.data.results]);
  //       setProximaPagina(response.data.next);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     })
  // }

  // obtém os restaurantes da API a partir de uma determinada paginação
  const carregarPaginacao = (pagina: string) => {
    // axios.get<IPaginacao<IRestaurante>>(pagina)
    //   .then(response => {
    //     // não serão inclusos os resultados anteriores
    //     setRestaurantes(response.data.results);
    //     setPaginaAnterior(response.data.previous);
    //     setProximaPagina(response.data.next)
    //   })
    //   .catch(error => console.log(error))
    carregaDados(pagina);
  }

  /*
    Obtém os restaurantes cujo nome corresponda ao filtro aplicado. 
    Essa foi a solução que criei, fazendo um get a cada mudança. A sugestão do instrutor seria criar um form mesmo, controlando o input em uma variável de estado e a busca na submissão do form. Para a busca (e também para a paginação), ele criou uma função carregarDados, que faz um get com a url passada no primeiro parâmetro e também com opções (por padrão um objeto vazio) no segundo parâmetro, que é do tipo IParametrosBusca. Esse opções é preenchido com o valor colocado no input.
  */
  // const efetuaBusca = () => {
  //   setBusca(nome);

  //   axios.get<IPaginacao<IRestaurante>>('http://localhost:8000/api/v1/restaurantes/', {
  //     params: {
  //       search: nome
  //     }
  //   })
  //     .then(response => {
  //       setRestaurantes(response.data.results);
  //       setProximaPagina(response.data.next);
  //       setPaginaAnterior(response.data.previous);
  //     })
  // }

  // const ordenaRestaurante = (e: SelectChangeEvent<string>) => {
  //   setOrdena(e.target.value);

  //   axios.get<IPaginacao<IRestaurante>>('http://localhost:8000/api/v1/restaurantes/', {
  //     params: {
  //       search: busca,
  //       ordering: e.target.value
  //     }
  //   })
  //     .then(response => {
  //       setRestaurantes(response.data.results);
  //       setProximaPagina(response.data.next);
  //       setPaginaAnterior(response.data.previous);
  //     })
  // }

  const efetuaBusca = (e: React.FormEvent<HTMLFormElement>) => {
    const options = {
      ordering: ordena,
      search: busca
    };

    e.preventDefault();
    carregaDados(endpoint, options);
  }

  return (
    <section className={style.ListaRestaurantes}>
      <h1>Os restaurantes mais <em>bacanas</em>!</h1>
      <Box component='form' onSubmit={efetuaBusca}>
        <TextField
          label='Buscar restaurante'
          placeholder='Digite um nome...'
          onChange={(e) => setBusca(e.target.value)}
          margin='normal'
          fullWidth
        />

        <InputLabel id='ordenar'>Ordenar por</InputLabel>
        <Select
          sx={{ minWidth: 200 }}
          margin='dense'
          labelId='ordenar'
          label='Ordenar por'
          value={ordena}
          onChange={e => setOrdena(e.target.value)}
        >
          <MenuItem value='id'>Id</MenuItem>
          <MenuItem value='nome'>Nome</MenuItem>
        </Select>

        <Button type='submit' variant='outlined' size='large' sx={{ marginLeft: 5 }}>Pesquisar</Button>
      </Box>
      {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
      {paginaAnterior && <button onClick={() => carregarPaginacao(paginaAnterior)}>
        &lt; Página Anterior
      </button>}
      {proximaPagina && <button onClick={() => carregarPaginacao(proximaPagina)}>
        Próxima página &gt;
      </button>}
    </section>)
}

export default ListaRestaurantes