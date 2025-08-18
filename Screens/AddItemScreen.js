import React, { useState } from 'react';
import { View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import { db } from '../FirebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const AddItemScreen = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSalvar = async () => {
    if (!nome.trim() || !descricao.trim()) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      setSaving(true);
      await addDoc(collection(db, 'itens'), {
        nome: nome.trim(),
        descricao: descricao.trim(),
      });
      Alert.alert('Sucesso', 'Item adicionado!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Falha ao salvar item: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={{ padding: 20, marginTop: 40 }}>
      <TextInput
        placeholder="Nome do item"
        value={nome}
        onChangeText={setNome}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      {saving ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : (
        <Button title="Salvar" onPress={handleSalvar} />
      )}
    </View>
  );
};

export default AddItemScreen;
