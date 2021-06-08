# NodeBlogger
Plataforma para criação de Blogs feita em Node.js/Express

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/kortkamp/nodeblogger/fork)
![Lines of code](https://img.shields.io/tokei/lines/github/kortkamp/nodeblogger)

# Funcionalidades
- Múltiplas páginas armazenadas em tabela do BD
- Área de comentários
- Formulário de contato
- Editor de postagens
- Renderizador de Markdown para o conteúdo das postagens.
- Carregamento rápido com conteúdo dos artigos cacheados em Memória.
- Renderizador PUG backend.
- API RESTful para acesso aos dados.
- Multiusuários, com sistema de autenticação via login e autorização via JWT.


# TODO
- [ ] Create a publish article function.
- [ ] Add tools for markdown editing in Articles Editor.
- [ ] Add image uploader in Articles Editor. 
- [ ] Add Share (on social media) buttons.
- [ ] Add like Buttons.
- [ ] Count views on articles.
- [ ] Add subcribing functionality and notify then about new articles posted
- [ ] Overtake Wordpress as default Blog platform :joy:

 
# Desenvolvimento
A ideia inicial do projeto foi a migração de um blog Wordpress para a Node/Express. Inicialmente o objetivo era construir um site com apenas uma página estática com a apresentação e uma página com a árvore genealógica. À medida que fui implementando a idéia inicial percebi que o **Express.js** facilitava muito a construção de aplicações maiores e que com o uso de **routes** e de uma **View Engine** eu poderia construir a página no formato de Blog, armazenando apenas as informações essenciais de cada post e renderizando as páginas direto pelo Node.js. 

## Banco de Dados
O Banco de Dados escolhido foi o Mysql devido aos dados da árvore genealógica já estarem nesse formato. 
À medida que implementei o formato blog com diferentes páginas de conteúdos, decidi aproveitar o Banco de Dados que já estaria rodando no servidor e adicionei uma área de comentários para cada página de artigo com uma API simples para receber ou postar os comentários. 
À medida que o projeto passou a fazer mais uso do Banco de Dados decidi passar a usar o ORM **Sequelize** para gerenciar o mysql o que proporcional um aprendizado valioso sobre essa tecnologia, já que antes esse trabalho era feito via lib mysql escrevendo diretamente as queries em SQL.
Após essa mudança foi muito simples mudar a localização dos artigos da página para do diretório /blog para uma tabela no banco de dabos.

## Notificação por e-mail
O método mais simples para implementar notificações por e-mail é configurar uma conta grátis no [Sendgrid](https://sendgrid.com/) e integrar os a API key ao arquivo de configuração do serviço e-mail do projeto.

## Editor de Recursos
A ideia inicial era que as atualizações dos conteúdos fessem feitas pela adição de arquivos no respostório do Github, porém essa ideia se mostrou ineficiente, pois caso o projeto fosse usado em uma realidade onde a postagem de novos artigos fosse constante, o processo de edição via Github, pushes e deploys do novo projeto seria desnecessariamente trabalhoso. A fim de contornar essa dificuldade adicionei um editor simples para se criar novas postagens, porém devido à estrutura final da Tabela de Artigos não estar totalmente fechada, decidi fazer um editor dinâmico que permitisse fazer o ***CRUD*** numa tabela do BD independente da estrutura dessa, bastando apenas que se forneça o tipo de dado de cada coluna para se gerar o data input correspondente no Editor. Mais tarde, percebi a necessidade de um gerenciador de usuários e como o editor de artigos era genérico o suficiente acabei adaptando o mesmo para o gerenciamento tanto de usuários como de comentários obedecendo a metodolodia ***DRY***.

## Segurança
Com o editor funcionando se fez necessário um sistema de autenticação para que o administrador pudesse acessar a ferramenta. Desse modo implementei um sistema de login e senha com troca dessas credenciais por um token JWT com validade de 15 minutos e armazenado em cookie que permite o acesso às ferramentas administrativas. Para o editor, implementei uma função temporizada que renova o token antes que o mesmo expire permitindo assim o uso ininterrupto do ambiente de edição sem a necessidade novo login enquanto o editor estiver aberto.


# Aspectos Técnicos

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
- [Git](https://git-scm.com), 
- [Node.js](https://nodejs.org/en/), 
- [MySQL Server](https://www.mysql.com/)

### 🎲 Rodando o Back End (servidor)

```bash
# Clone este repositório
$ git clone https://github.com/kortkamp/kortkamp.org

# Acesse a pasta do projeto no terminal/cmd
$ cd nodeblogger

# Instale as dependências
$ npm install

# Configure o db_info.json para o seu Banco de Dados
{   
    "host":"localhost",
    "user":"user",
    "password":"password",
    "database": "nodeblogger",
    "port": 3306
}

# Execute a aplicação em modo de desenvolvimento
$ npm run dev:server

# O servidor inciará na porta:3000 - acesse http://localhost:3000 
```


### 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- Backend
    - [Node.js](https://nodejs.org/en/)
    - [Express.js](https://expressjs.com/)
- Database
    - [MySQL](https://www.mysql.com/)
    - [Sequelize](https://sequelize.org/)
- Render
    - [Pug](https://pugjs.org/)
- Fontend
    - [jQuery/Ajax](https://jquery.com/)
    - Plain CSS / JS


# Autor
[Marcelo Kortkamp](https://github.com/kortkamp)