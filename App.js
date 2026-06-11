import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, ScrollView } from 'react-native';

function numberToWords(num) {
  num = parseInt(num, 10);
  if (isNaN(num)) return '';
  if (num < 1 || num > 1000) return 'Número fuera de rango (1-1000)';
  if (num === 1000) return 'mil';

  const units = ['', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
  const teens = ['diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'];
  const tens = ['', 'diez', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
  const hundreds = ['', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];

  let words = '';

  if (num >= 100) {
      if (num === 100) {
          words += 'cien';
          num = 0;
      } else {
          words += hundreds[Math.floor(num / 100)];
          num %= 100;
          if (num > 0) words += ' ';
      }
  }

  if (num >= 10 && num <= 19) {
      words += teens[num - 10];
      num = 0;
  } else if (num >= 20) {
      if (num === 20) {
          words += 'veinte';
          num = 0;
      } else if (num < 30) {
          const twenties = ['', 'veintiuno', 'veintidós', 'veintitrés', 'veinticuatro', 'veinticinco', 'veintiséis', 'veintisiete', 'veintiocho', 'veintinueve'];
          words += twenties[num - 20];
          num = 0;
      } else {
          words += tens[Math.floor(num / 10)];
          num %= 10;
          if (num > 0) words += ' y ';
      }
  }

  if (num > 0) {
      words += units[num];
  }

  return words.charAt(0).toUpperCase() + words.slice(1);
}

export default function App() {
  // Estados Sumadora
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [sumResult, setSumResult] = useState('');

  // Estados Traductor
  const [numLetras, setNumLetras] = useState('');
  const [letrasResult, setLetrasResult] = useState('');

  // Estados Tabla
  const [numTabla, setNumTabla] = useState('');
  const [tablaResult, setTablaResult] = useState([]);

  const handleSuma = () => {
    const res = parseFloat(num1) + parseFloat(num2);
    setSumResult(isNaN(res) ? 'Error' : res.toString());
  };

  const handleLetras = () => {
    setLetrasResult(numberToWords(numLetras));
  };

  const handleTabla = () => {
    const n = parseInt(numTabla, 10);
    if (isNaN(n)) return;
    const table = [];
    for (let i = 1; i <= 13; i++) {
      table.push(`${n} x ${i} = ${n * i}`);
    }
    setTablaResult(table);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Mis Datos</Text>
      <Image source={require('./assets/foto.jpeg')} style={{width: 100, height: 100}} />
      <Text>Nombre: Brian Alexander</Text>
      <Text>Apellido: Tavarez Duarte</Text>
      <Text>Correo: briam1952@gmail.com</Text>

      <Text style={styles.title}>Sumadora</Text>
      <TextInput style={styles.input} placeholder="Nº 1" keyboardType="numeric" onChangeText={setNum1} />
      <TextInput style={styles.input} placeholder="Nº 2" keyboardType="numeric" onChangeText={setNum2} />
      <Button title="Sumar" onPress={handleSuma} />
      <Text>Resultado: {sumResult}</Text>

      <Text style={styles.title}>Traductor</Text>
      <TextInput style={styles.input} placeholder="Nº (1-1000)" keyboardType="numeric" onChangeText={setNumLetras} />
      <Button title="Traducir" onPress={handleLetras} />
      <Text>{letrasResult}</Text>

      <Text style={styles.title}>Tabla</Text>
      <TextInput style={styles.input} placeholder="Nº" keyboardType="numeric" onChangeText={setNumTabla} />
      <Button title="Generar" onPress={handleTabla} />
      {tablaResult.map((val, i) => <Text key={i}>{val}</Text>)}
      
      <View style={{height: 50}} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 30
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5,
    backgroundColor: '#eee',
    padding: 5
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    marginBottom: 10,
    padding: 5
  }
});
