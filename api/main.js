// importa os bibliotecas necessários
const serialport = require("serialport");
const express = require("express");
const mysql = require("mysql2");

// constantes para configurações
const SERIAL_BAUD_RATE = 9600;
const SERVIDOR_PORTA = 3300;

// habilita ou desabilita a inserção de dados no banco de dados
const HABILITAR_OPERACAO_INSERIR = true;

// função para comunicação serial
const serial = async (valoresSensorAnalogico) => {
  // conexão com o banco de dados MySQL
  let poolBancoDados = mysql
    .createPool({
      host: "localhost",
      user: "Inserir",
      password: "Inserir#DB2024",
      database: "Helpers",
      port: 3306,
    })
    .promise();

  // lista as portas seriais disponíveis e procura pelo Arduino
  const portas = await serialport.SerialPort.list();
  const portaArduino = portas.find(
    (porta) => porta.vendorId == 2341 && porta.productId == 43
  );
  if (!portaArduino) {
    throw new Error("O arduino não foi encontrado em nenhuma porta serial");
  }

  // configura a porta serial com o baud rate especificado
  const arduino = new serialport.SerialPort({
    path: portaArduino.path,
    baudRate: SERIAL_BAUD_RATE,
  });

  // evento quando a porta serial é aberta
  arduino.on("open", () => {
    console.log(
      `A leitura do arduino foi iniciada na porta ${portaArduino.path} utilizando Baud Rate de ${SERIAL_BAUD_RATE}`
    );
  });

  // processa os dados recebidos do Arduino
  arduino
    .pipe(new serialport.ReadlineParser({ delimiter: "\r\n" }))
    .on("data", async (data) => {
      console.log(data);
      const valores = data.split(";");
      const aleatorio = parseInt(Math.random() * 10 - 10);
      const aleatorio2 = parseInt(Math.random() * 10 - 10);
      const aleatorio3 = parseInt(Math.random() * 10 - 10);
      const aleatorio4 = parseInt(Math.random() * 10 - 20);
      const aleatorio5 = parseInt(Math.random() * 20 - 10);
      const aleatorio6 = parseInt(Math.random() * 15 - 10);
      const aleatorio7 = parseInt(Math.random() * 25 - 15);
      const aleatorio8 = parseInt(Math.random() * 20 - 15);
      const aleatorio9 = parseInt(Math.random() * 20 - 10);
      const aleatorio10 = parseInt(Math.random() * 10 - 5);
      const aleatorio11 = parseInt(Math.random() * 40 - 25);
      const aleatorio12 = parseInt(Math.random() * 30 - 20);
      const aleatorio13 = parseInt(Math.random() * 20 - 15);
      const aleatorio14 = parseInt(Math.random() * 25 - 10);

      const sensorAnalogico = parseFloat(valores[0]);
      const sensorAnalogico2 = sensorAnalogico + aleatorio;
      const sensorAnalogico3 = sensorAnalogico + aleatorio2;
      const sensorAnalogico4 = sensorAnalogico + aleatorio3;
      const sensorAnalogico5 = sensorAnalogico + aleatorio4;
      const sensorAnalogico6 = sensorAnalogico + aleatorio5;
      const sensorAnalogico7 = sensorAnalogico + aleatorio6;
      const sensorAnalogico8 = sensorAnalogico + aleatorio7;
      const sensorAnalogico9 = sensorAnalogico + aleatorio8;
      const sensorAnalogico10 = sensorAnalogico + aleatorio9;
      const sensorAnalogico11 = sensorAnalogico + aleatorio10;
      const sensorAnalogico12 = sensorAnalogico + aleatorio11;
      const sensorAnalogico13 = sensorAnalogico + aleatorio12;
      const sensorAnalogico14 = sensorAnalogico + aleatorio13;
      const sensorAnalogico15 = sensorAnalogico + aleatorio14;

      // armazena os valores dos sensores nos arrays correspondentes
      valoresSensorAnalogico.push(sensorAnalogico);

      // insere os dados no banco de dados (se habilitado)
      if (HABILITAR_OPERACAO_INSERIR) {
        // este insert irá inserir os dados na tabela "medida"
        await poolBancoDados.execute(
          "INSERT INTO Registro (temperatura, fkMaquina) VALUES (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?)",
          [
            sensorAnalogico,
            1,
            sensorAnalogico2,
            2,
            sensorAnalogico3,
            3,
            sensorAnalogico4,
            4,
            sensorAnalogico5,
            5,
            sensorAnalogico6,
            6,
            sensorAnalogico7,
            7,
            sensorAnalogico8,
            8,
            sensorAnalogico9,
            9,
            sensorAnalogico10,
            10,
            sensorAnalogico11,
            11,
            sensorAnalogico12,
            12,
            sensorAnalogico13,
            13,
            sensorAnalogico14,
            14,
            sensorAnalogico15,
            15,
          ]
        );

        console.log("sensorAnalogico: ", sensorAnalogico);
        console.log("sensorAnalogico2: ", sensorAnalogico2);
        console.log("sensorAnalogico3: ", sensorAnalogico3);
        console.log("sensorAnalogico4: ", sensorAnalogico4);
        console.log("sensorAnalogico5: ", sensorAnalogico5);
        console.log("sensorAnalogico6: ", sensorAnalogico6);
        console.log("sensorAnalogico7: ", sensorAnalogico7);
        console.log("sensorAnalogico8: ", sensorAnalogico8);
        console.log("sensorAnalogico9: ", sensorAnalogico9);
        console.log("sensorAnalogico10: ", sensorAnalogico10);
        console.log("sensorAnalogico11: ", sensorAnalogico11);
        console.log("sensorAnalogico12: ", sensorAnalogico12);
        console.log("sensorAnalogico13: ", sensorAnalogico13);
        console.log("sensorAnalogico14: ", sensorAnalogico14);
        console.log("sensorAnalogico15: ", sensorAnalogico15);
      }
    });

  // evento para lidar com erros na comunicação serial
  arduino.on("error", (mensagem) => {
    console.error(`Erro no arduino (Mensagem: ${mensagem}`);
  });
};

// função para criar e configurar o servidor web
const servidor = (valoresSensorAnalogico) => {
  const app = express();

  // configurações de requisição e resposta
  app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  // inicia o servidor na porta especificada
  app.listen(SERVIDOR_PORTA, () => {
    console.log(`API executada com sucesso na porta ${SERVIDOR_PORTA}`);
  });

  // define os endpoints da API para cada tipo de sensor
  app.get("/sensores/analogico", (_, response) => {
    return response.json(valoresSensorAnalogico);
  });
};

// função principal assíncrona para iniciar a comunicação serial e o servidor web
(async () => {
  // arrays para armazenar os valores dos sensores
  const valoresSensorAnalogico = [];

  // inicia a comunicação serial
  await serial(valoresSensorAnalogico);

  // inicia o servidor web
  servidor(valoresSensorAnalogico);
})();
