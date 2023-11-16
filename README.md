## 💻 Sobre o projeto

O TFC é um site informativo sobre partidas e classificações de futebol! ⚽️

Fui responsavel por criar uma API (utilizando o método TDD) e também integrar -
através do docker-compose - as aplicações para que elas funcionem consumindo um
banco de dados. Construindo um back-end dockerizado utilizando modelagem de
dados através do Sequelize. Respeitando as regras de negócio providas no
projeto. Sendo esta API ultizada pelo Front.

---

<h2>Tenologias Ultilizadas</h2>
<h4>Front</h4>
 <div >
 <img aling="center" height="32px" src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
 <img aling="center" height="32px" src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
 <img aling="center" height="32px" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">
 <img aling="center" height="32" src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
 <img aling="center" height="32" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
 <img aling="center" height="32" src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white">
 </div>
<h4>Back</h4>
 <div >
 <img aling="center" height="32px" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">
 <img aling="center" height="32px" src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge">
 <img aling="center" height="32px" src="https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white">
 <img aling="center" height="32px" src="https://img.shields.io/badge/sequelize-323330?style=for-the-badge&logo=sequelize&logoColor=blue">

 <img aling="center" height="32px" src="">
 
 </div>
 <h4>Testes</h4>
 <div>
 <img aling="center" height="32px" src="https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white">
 <img aling="center" height="32px" src="	https://img.shields.io/badge/sinon.js-323330?style=for-the-badge&logo=sinon">
 <img aling="center" height="32px" src="https://img.shields.io/badge/chai.js-323330?style=for-the-badge&logo=chai&logoColor=red">
 <img aling="center" height="32px" src="https://img.shields.io/badge/mocha.js-323330?style=for-the-badge&logo=mocha&logoColor=Brown">

 </div>
<br>

<img src="./assets/front-example.png">

<h4>
	🚧 🚀 Em construção...  🚧
</h4>
<p>Ainda Busco fazer melhorias nesta aplicação e refatoraçoes, caso tenho algo que possa melhorar não deixe de comentar em que posso melhorar.</p>

## 🚀 Como executar o projeto

Este projeto é divido em duas partes:

1. Backend (pasta app/bakend)
2. Frontend (pasta app/frontend)

<!-- 3. Mobile (pasta mobile) -->

💡Tanto o Frontend quanto precisam que o Backend junto ao um Db MyQSl esteja
executado para funcionar.

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes
ferramentas: [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/),
[Docker](https://www.docker.com/). Além disto é bom ter um editor para trabalhar
com o código como [VSCode](https://code.visualstudio.com/)

<details>
  <summary>
    Iniciando a aplicaçao
  </summary>
  <br>

          # Clone este repositório
          $ git clone 
          
          # Acesse a pasta do projeto no terminal/cmd
          $ cd FutebolClub
          
          # Instale as dependências
          $ npm run install:apps
          
          
          # Execute a aplicação frontEnd em modo de desenvolvimento
          $ npm start:front

          # Execute a aplicação backend em modo de desenvolvimento
          $ npm start:back
          
          # O servidor do frontend inciará na porta:3000 - acesse http://localhost:3000
          # O servidor do back inciará na porta:3001 - acesse http://localhost:3001

<br>
  <details>
    <summary>
      🐳 Configuração Docker
    </summary>
    <br>

Clone este repositório

    $ git clone

Acesse a pasta do projeto no terminal/cmd

    $ cd FutebolClub

inicie o docker compose

    $ npm run compose:up

Para remover os conteiners

    $ npm run compose-down

User para verificar os conteiner

    $ npm run logs

O servidor do frontend inciará na porta:3000 - acesse http://localhost:3000 O
servidor do back inciará na porta:3001 - acesse http://localhost:3001

</details>
  <details>
    <summary>
      🎲 Rodando o Backend (servidor)
    </summary>
  <br>
   **Necessario ter um conteiner Docker do MySql para o back Funcionar corretamente.**

    # Caso não tenha um conteiner ativo use
    $ docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=suaSenha --name=mysql-db mysql:8.0.29
    # Clone este repositório
    $ git clone 

    # Acesse a pasta do projeto no terminal/cmd
    $ cd FutebolClub

    # Vá para a pasta backend
    $ cd app/backend

    # Instale as dependências
    $ npm install

    # Execute a aplicação em modo de desenvolvimento
    $ npm run dev

    # O servidor inciará na porta:3001 - acesse http://localhost:3001

</details>
   <details>
     <summary>
       🧭 Rodando a aplicação web (Frontend)
     </summary>

    # Clone este repositório
    $ git clone 

    # Acesse a pasta do projeto no seu terminal/cmd
    $ cd FutebolClub

    # Vá para a pasta da aplicação Front End
    $ cd app/frontend

    # Instale as dependências
    $ npm install

    # Execute a aplicação em modo de desenvolvimento
    $ npm run start

    # A aplicação será aberta na porta:3000 - acesse http://localhost:3000

</details>

</details>
