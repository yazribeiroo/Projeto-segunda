import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet } from 'react-native';
import { auth } from '../FirebaseConfig';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from 'firebase/auth';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [modoCadastro, setModoCadastro] = useState(false); // false = login, true = cadastro
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !senha.trim()) {
      Alert.alert('Erro', 'Preencha email e senha');
      return;
    }
    setLoading(true);
    try {
      if (modoCadastro) {
        await createUserWithEmailAndPassword(auth, email.trim(), senha);
        Alert.alert('Sucesso', 'Usuário criado com sucesso!');
      } else {
        await signInWithEmailAndPassword(auth, email.trim(), senha);
      }
      // Se login/cadastro funcionar, vai navegar para Home
      navigation.replace('Home');
    } catch (error) {
      Alert.alert('Erro', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{modoCadastro ? 'Cadastro' : 'Login'}</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={styles.input}
      />
      <Button 
        title={modoCadastro ? 'Cadastrar' : 'Entrar'} 
        onPress={handleLogin} 
        disabled={loading}
      />
      <Text 
        style={styles.link} 
        onPress={() => setModoCadastro(!modoCadastro)}
      >
        {modoCadastro ? 'Já tem conta? Faça login' : 'Não tem conta? Cadastre-se'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    marginBottom: 20,
    textAlign:'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    height: 40,
  },
  link: {
    marginTop: 15,
    color: 'blue',
    textAlign: 'center',
    textDecorationLine: 'underline',
  }
});

export default LoginScreen;
