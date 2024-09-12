const int PINO_SENSOR_TEMPERATURA = A2; // PORTA DE ENTRADA ANALÓGICA DO ARDUINO (RECEBER OS DADOS DO SENSOR) 
const int TEMP_MAXIMA = 160; // constante para guardar o max temperatura ideal

float temperaturaAdaptada; // variavel que vai guardar a temperatura adaptada para testes
float temperaturaCelsius; // variavel que vai guardar a temperatura real que virá do sensor

void setup() { //  periodo que ele vai atualizar
  Serial.begin(9600); // Configura a taxa de bits por segundo (comunicar o arduino com o programa, a cada 9600 bits entra um dado
}

void loop(){
  int valorLeitura = analogRead (PINO_SENSOR_TEMPERATURA); // Coletar o valor da entrada analoga (A2) do arduino temperaturaCelsius
  temperaturaCelsius = (valorLeitura * 5.0 / 1023.0) / 0.01; // Converter essa info na temperatura em graus Celsius  0.002
  temperaturaAdaptada = (valorLeitura * 5.0 / 1023.0) / 0.0015; // Converter essa info na temperatura em graus Celsius  0.002
  
  Serial.print("Temperatura Maxima:"); // label
  Serial.print(TEMP_MAXIMA);// Print da temperatura na tela
  Serial.println(" ");// separação da label
  Serial.print("Temperatura Real:"); // label
  Serial.print(temperaturaCelsius);// Print da temperatura na tela
  Serial.println(" ");// separação da label
  Serial.print("Temperatura Adaptada:");
  Serial.println(temperaturaAdaptada); // Print da temperatura na tela
  
  delay(2000); // tempo até executar a função de loop novamente
}
