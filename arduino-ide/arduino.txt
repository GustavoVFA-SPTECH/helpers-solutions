const int PINO_SENSOR_TEMPERATURA = A2; // PORTA DE ENTRADA ANALÓGICA DO ARDUINO (RECEBER OS DADOS DO SENSOR) 
const int TEMP_MAXIMA = 160;

float temperaturaAdaptada;
float temperaturaCelsius; // variavel que vai guardar a temperatura

void setup() { //  periodo que ele vai atualizar
Serial.begin(9600); // Configura a taxa de bits por segundo (comunicar o arduino com o programa, a cada 9600 bits entra um dado
}

void loop() {
// put your main code here, to run repeatedly:
int valorLeitura = analogRead (PINO_SENSOR_TEMPERATURA); // Coletar o valor da entrada analoga (A2) do arduino temperaturaCelsius
temperaturaCelsius = (valorLeitura * 5.0 / 1023.0) / 0.01; // Converter essa info na temperatura em graus Celsius  0.002
temperaturaAdaptada = (valorLeitura * 5.0 / 1023.0) / 0.0015; // Converter essa info na temperatura em graus Celsius  0.002

// Serial.print("A temperatura:");
Serial.print("Temperatura Maxima:"); // label
Serial.print(TEMP_MAXIMA);
Serial.println(" ");
Serial.print("Temperatura Real:"); // label
Serial.print(temperaturaCelsius);
Serial.println(" ");
Serial.print("Temperatura Adaptada:");
Serial.println(temperaturaAdaptada); // Print da temperatura na tela
// Serial.println("ºC");
delay(2000); // tempo até executar a função de loop novamente
}