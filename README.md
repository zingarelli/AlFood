# Alfood

[Click here to read the English version of this Readme](#credits)

Comunicando-se com uma API utilizando Axios.

| :placard: Vitrine.Dev |     |
| -------------  | --- |
| :sparkles: Nome        | **Alfood**
| :label: Tecnologias | React, TypeScript, Axios
| :rocket: URL         | 
| :fire: Curso     | https://www.alura.com.br/curso-online-react-integrando-projeto-react-apis

![](https://user-images.githubusercontent.com/19349339/231475191-15c6ab15-be74-46bc-8650-c76658de5af9.png#vitrinedev)

## Créditos

Este projeto foi desenvolvido no curso [React: integrando seu projeto React com APIs](https://www.alura.com.br/curso-online-react-integrando-projeto-react-apis) oferecido pela [Alura](https://www.alura.com.br).

Instrutor: **[Vinicios Neves](https://www.linkedin.com/in/vinny-neves/)**.

## Detalhes do projeto

O Alfood é um site que lista restaurantes e pratos do menu. Ele também possui uma área administrativa, em que é possível gerenciar restaurantes e pratos (adicionar novos, editar os existentes ou removê-los). 

A parte visual da área administrativa foi desenvolvida utilizando a Material UI (MUI). Você pode saber mais sobre ela na [seção sobre MUI](#mui-material-ui).

Todas as ações de exibir e gerenciar são feitas se comunicando com uma API, rodando localmente no Docker. As instruções para instalação e configuração da API se encontram na [seção sobre o Docker](#abrir-e-rodar-a-api-no-docker).

### Técnicas e tecnologias utilizadas 🛠️

- `React`;
- `React Hooks`;
- `TypeScript`;
- `axios`.

### Telas do projeto em execução

#### Visão da área pública

![gif exibindo a lista de restaurantes e seus pratos](https://user-images.githubusercontent.com/19349339/231487807-b1d55146-1f00-4816-be5d-41927424ed31.gif)

#### Visão da área administrativa

![gif mostrando as ações possíveis de serem feitas com os restaurantes e pratos: exibir, adicionar, editar e excluir](https://user-images.githubusercontent.com/19349339/231487801-770f0e7f-862f-4414-a6b1-3602cc3252ff.gif)

## Instalação e execução 

### Front End

Após clonar/baixar o projeto, abra um terminal, navegue até a pasta do projeto e rode o seguinte comando para instalar todas as dependências necessárias

    npm install

Após isso, você pode rodar a aplicação em modo de desenvolvimento com o seguinte comando:

    npm start

A aplicação irá rodar no endereço **http://localhost:3000**.

### Abrir e rodar a API no Docker

O Docker é um software que auxilia no deploy de uma aplicação, por meio do conceito de "contêineres". Um conteiner é meio que uma forma de "empacotar" um projeto e garantir que ele irá funcionar e se comportar da maneira esperada em qualquer máquina. 

O Docker roda por trás uma micro máquina virtual Linux. Quando você "sobe" um conteiner, ele irá rodar dentro desse ambiente virtual.

É necessário instalar: [download do Docker Desktop para Windows](https://www.docker.com/products/docker-desktop/).

- Após a instalação, caso o Docker exiba uma janela informando que é necessário uma atualização do WSL, siga as instruções do link informado na janela e baixe um arquivo de instalação (a janela dá outra opção, que é rodando o comando `wsl --update`, mas não deu certo dessa forma - após o comando, aguardei por mais de 1 hora e nada aconteceu).

Depois de instalado, para rodar a API é necessário abrir um terminal, ir até a pasta `api` deste projeto e rodar dois comandos. O primeiro irá instalar tudo que é necessário para rodar o back-end:

    docker-compose build

O segundo é o que utilizamos para colocar a API no ar:

    docker-compose up

A API será acessível no link **http://localhost:8000**. Nesta página podemos ver o chamado "Swagger", uma ferramenta que auxilia a desenvolver e documentar APIs. No caso do Alfood, ele irá mostrar os verbos e endpoints disponibilizados pela API, e também irá possibilitar testar chamadas e ver o resultado. Parece ser semelhante ao que o Postman faz.

## O que eu aprendi ✔️

### Axios

É uma biblioteca utilizada para fazer requisições a uma URL ou API. Semelhante à Fetch API.

[Link com a documentação do Axios](https://github.com/axios/axios).

Comando para instalação:

    npm i axios

A seguir, um pequeno resumo sobre requisições utilizando o Axios:

#### Requisição GET

Retorna uma **promise** com a resposta. A resposta é um objeto e o conteúdo da resposta fica na propriedade `data`. Diferente da Fetch API, aqui **não** é preciso converter a resposta para JSON antes de utilizá-la.

```ts
import axios from 'axios';

axios.get('http://localhost:8000/api/v1/restaurantes/')
    .then(response => {
        console.log(response.data)
    })
    .catch(error => {
        console.log(error)
    })
```

#### Requisições POST/PUT

Além do endpoint (a URL de acesso ao recurso da API), passamos no segundo argumento os dados a serem salvos. É necessário verificar na API o tipo e formato esperado desses dados.

No exemplo, a API espera receber um objeto com a propriedade `nome`, que é do tipo string:

```ts
nomeRestaurante = 'Alura Deli';

axios.post(
    'http://localhost:8000/api/v2/restaurantes/',
    {
        nome: nomeRestaurante
    }
)
    .then(() => console.log('Restaurante cadastrado'))
    .catch((err) => console.log(err))
}
```

#### Requisições DELETE

É enviada na URL a id do que deseja ser deletado. É necessário verificar na documentação da API se é assim que ela trabalha com este verbo.

```ts
axios.delete(`http://localhost:8000/api/v2/restaurantes/${restaurante.id}/`)
    .then(response => {
        console.log('Restaurante excluído');
    })
    .catch(err => console.log(err))
```

#### Enviando parâmetros 

Caso a API aceite parâmetros em suas requisições, este parâmetros podem ser enviados de duas formas. Uma forma é fazer o envio dos parâmetros pela URL, via query string:

```ts
axios.get<IPaginacao<IRestaurante>>('http://localhost:8000/api/v1/restaurantes/?ordering=nome&search=neo');
```

A outra forma é usando a propriedade `params`. Eu prefiro dessa forma:

```ts
axios.get<IPaginacao<IRestaurante>>('http://localhost:8000/api/v1/restaurantes/', {
    params: {
        ordering: 'nome',
        search: 'neo'
    }
});
```

É necessário verificar na documentação de cada API quais parâmetros são aceitos e seus tipos.

#### Criação de instância `axios` para reúso

No caso de trabalharmos com a mesma URL em diferentes partes do código, ao invés de ficar repetindo a URL, podemos criar uma instância do Axios com essa URL base. Assim, quando chamamos esta instância, passamos somente o restante do caminho para completar a URL.

```ts
// em um arquivo .ts separado
import axios from "axios";

const http = axios.create({
    // essa será a URL ao se utilizar a instância http criada
    baseURL: 'http://localhost:8000/api/v2/'
});

export default http;

// em algum outro arquivo

// usando a instância do axios, somente adiciono o restante do caminho necessário
http.get<IRestaurante[]>('restaurantes/')

http.delete(`restaurantes/${restaurante.id}/`)
```

### Envio de conteúdo binário usando `FormData`

Quando queremos enviar ao backend algum **conteúdo binário** (o upload de uma imagem, por exemplo), não é possível o envio de um JSON, que só trafega texto. 

Neste caso, uma solução (existem outras) é criar uma instância da classe `FormData`. Essa é uma classe nativa de JS para envio de dados de formulário, num padrão de chave/valor, enviando o conteúdo com o encoding correto.

Para adicionar dados à instância de `FormData`, é utilizado o método `append`, sendo o primeiro argumento o nome do que está sendo enviado, e o segundo argumento, o conteúdo.

```ts
const formData = new FormData();
// conteúdo de string
formData.append('nome', nomePrato);
formData.append('descricao', descricao);
formData.append('tag', tag);
formData.append('restaurante', restaurante);

// conteúdo binário
if(imagem) {
    formData.append('imagem', imagem);
}
```

Ao enviar esses dados ao back-end, é necessário informar no **cabeçalho da requisição** o tipo de conteúdo que está sendo enviado. Essa parte deve ser verificada com cada API. Um exemplo utilizando o método `request` do Axios:

```ts
http.request({
    url: 'pratos/',
    method: 'POST',
    // informando que o conteúdo não contém somente texto
    headers: {
        'Content-Type': 'multipart/form-data'
    },
    data: formData
})
```

Mais sobre FormData [neste artigo da MDN](https://developer.mozilla.org/en-US/docs/Web/API/FormData).

### MUI (Material UI)

É uma biblioteca React famosa, que possui diversos **componentes de UI prontos (e customizáveis)** para serem utilizados. 

Necessário instalar. A instalação padrão recomendada pelo MUI é o comando a seguir: 

    npm install @mui/material @emotion/react @emotion/styled

- A Emotion é outra biblioteca que permite escrever CSS com o JS. É instalada junto com a MUI por ser o mecanismo de estilização padrão da MUI.

É necessário também instalar ou adicionar ao head do `index.html` a fonte e família de ícones utilizados pela MUI:

```html
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>

<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
/>
```

[Link da MUI](https://mui.com)

[Link da Emotion](https://emotion.sh/docs/introduction)

---

## Credits

This project was developed in a course from [Alura](https://www.alura.com.br) called "React: integrating your React project with APIs" ([React: integrando seu projeto React com APIs](https://www.alura.com.br/curso-online-react-integrando-projeto-react-apis), in portuguese).

Instructor: **[Vinicios Neves](https://www.linkedin.com/in/vinny-neves/)**.

## Project details

Alfood is a website that lists food venues and their menus. It also has an admin section, in which it's possible to manage venues and food (add new items or edit/remove existing items).

The layout for the admin section was developed using the [Material UI (MUI)](https://mui.com).

Every action to display and manage items are done by communicating with an API running in Docker. You can check how to install and run the backend in the [Docker section](#running-the-api-on-docker).

### Technologies used 🛠️

- `React`;
- `React Hooks`;
- `TypeScript`;
- `axios`.

### See the project in action

Here are some gifs showing the project running locally. The website is in Portuguese.

#### Public section, listing food venues and some items

![gif displaying food venues and its menus](https://user-images.githubusercontent.com/19349339/231487807-b1d55146-1f00-4816-be5d-41927424ed31.gif)

#### Admin section, with options to create, list, update and delete items

![gif showing the available actions to manage food venues and items: list, add, edit and delete](https://user-images.githubusercontent.com/19349339/231487801-770f0e7f-862f-4414-a6b1-3602cc3252ff.gif)

## Installation

### Front End

After cloning or downloading this project, open a terminal, navigate to the `front-end` folder and run the following command in order to install all necessary dependencies:

    npm install

After that, you can run the app in the development mode with the following command:

    npm start

The app will run at **http://localhost:3000**.

### Running the API on Docker

You need to install Docker: here are the instructions to [download and install Docker Desktop on Windows](https://www.docker.com/products/docker-desktop/).

After having installed it, open a terminal, navigate to the folder `api` of this project and run the following commands to build and create the container for the API:

    docker-compose build

The next command will run the API:

    docker-compose up

You can see the Swagger for the API on this link: **http://localhost:8000**. The API documentation is in Portuguese.