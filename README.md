# Helpers Solution

<p align="center">
  <img src="assets/logo.png" alt="Descrição da imagem" width="60%"/>
</p>

### PMS (Predictive Maintenance System)

## Contextualização

A **Internet das Coisas (IoT)** revolucionou a forma como objetos do cotidiano, como eletrodomésticos e máquinas industriais, interagem e trocam dados. Com mais de 17 bilhões de dispositivos IoT conectados no mundo, espera-se que esse número cresça para 22 bilhões até 2025.

No contexto industrial, a digitalização e a automação são fundamentais para aumentar a eficiência. No entanto, muitas indústrias ainda realizam a coleta de dados manualmente, o que reduz a precisão e a rapidez nas decisões. A modernização da **indústria química**, que representa 11% do PIB industrial no Brasil, é uma oportunidade importante para adoção de tecnologias IoT, como sensores de temperatura, para monitorar o desempenho das máquinas.

### Desafios

Equipamentos como **bombas centrífugas**, essenciais no setor petroquímico, são propensos a falhas, como corrosão e superaquecimento, que podem causar interrupções na produção e danos permanentes às máquinas. A falta de um sistema automatizado de monitoramento da temperatura aumenta os custos e as paradas inesperadas, dificultando a manutenção preditiva.


## Objetivo

Desenvolver uma solução IoT completa chamada **PMS (Predictive Maintenance System)**, com sensores de temperatura LM35 instalados em máquinas industriais para coletar e armazenar dados automaticamente na nuvem. A solução também inclui uma dashboard em tempo real acessível por um site institucional, permitindo o monitoramento contínuo dos equipamentos e fornecendo insights sobre a operação.

## Escopo do Projeto

### Descrição

O projeto será composto por um **site institucional** desenvolvido para atender indústrias petroquímicas que ainda não digitalizaram seus processos. O site permitirá que os clientes façam login e acessem uma página exclusiva com uma **dashboard** em tempo real, onde será possível visualizar as temperaturas coletadas pelos sensores instalados nas máquinas.

Os dados serão analisados em busca de variações de temperatura fora dos limites estabelecidos, gerando alertas quando necessário e permitindo uma **manutenção preditiva** eficiente, prolongando a vida útil dos equipamentos.

### Produto Entregável

- **Site institucional** intuitivo e responsivo, desenvolvido em **HTML, CSS, JavaScript** e **Node.JS**.
- Páginas de login e cadastro para clientes.
- **Dashboard** visual com gráficos exibindo os dados coletados pelos sensores de temperatura.
- **Simulador financeiro** para mostrar os ganhos esperados com a adoção da solução.
- **Formulário de contato** para facilitar a comunicação com a equipe.

### Funcionalidades

- Coleta de dados de temperatura com o sensor **LM35** conectado a um **Arduino UNO R3**.
- Armazenamento dos dados na nuvem e análise automatizada para identificar oscilações fora dos padrões.
- Visualização gráfica dos dados em uma dashboard, utilizando **Chart.js**.
- Alertas automáticos para temperaturas fora do padrão.

### Limitações e Exclusões

- O site não será **responsivo**.
- A aplicação web não terá suporte **mobile**.
- Não será realizada a **instalação dos sensores** nas máquinas.
- Não será oferecido suporte para **manutenção dos sensores**.

## Tecnologias Utilizadas

- **HTML, CSS, JavaScript, Node.JS**
- **Arduino UNO R3** com **sensor LM35**
- **MySQL** para banco de dados
- **Chart.js** para visualização de gráficos
- **AWS S3** para armazenamento em nuvem
- **Trello** para gerenciamento de tarefas
- **Figma** para design
- **GitHub** para controle de versão

## Recursos Necessários

- **Notebook ou Computador** com capacidade suficiente.
- **Sensor LM35**
- **Arduino UNO R3**
- **Mini Protoboard**
- **Jumpers**
- **VS Code**
- **Arduino IDE**
- **MySQL Server** e **Workbench**
- **Virtual Box** com Lubuntu
- **Pacote Office**

## Justificativa

A solução PMS busca **melhorar a produtividade** das indústrias petroquímicas em pelo menos 30% através da digitalização dos processos de monitoramento de equipamentos, proporcionando maior eficiência, redução de paradas inesperadas e aumento da vida útil das máquinas.

## Licença

Este projeto está sob a licença MIT.
