
 ## 🚀 Como executar o projeto

Este projeto é divido em duas partes:
1. Backend (pasta app/bakend) 
2. Frontend (pasta app/frontend)
<!-- 3. Mobile (pasta mobile) -->

💡Tanto o Frontend quanto precisam que o Backend junto ao um Db MyQSl esteja executado para funcionar.

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/), [Docker](https://www.docker.com/). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

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
        
  O servidor do frontend inciará na porta:3000 - acesse http://localhost:3000
  O servidor do back inciará na porta:3001 - acesse http://localhost:3001
    
    
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
