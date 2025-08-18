import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, ActivityIndicator, Alert } from 'react-native';
import { db } from '../FirebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const EditItemScreen = ({ route, navigation }) => {
  const { itemId } = route.params;
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const carregarItem = async () => {
      try {
        const ref = doc(db, 'itens', itemId);
        const docSnap = await getDoc(ref);

        if (docSnap.exists()) {
          const item = docSnap.data();
          setNome(item.nome);
          setDescricao(item.descricao);
        } else {
          Alert.alert('Erro', 'Item não encontrado.');
          navigation.goBack();
        }
      } catch (error) {
        Alert.alert('Erro', 'Falha ao carregar item: ' + error.message);
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    };

    carregarItem();
  }, []);

  const handleAtualizar = async () => {
    if (!nome.trim() || !descricao.trim()) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      setSaving(true);
      const ref = doc(db, 'itens', itemId);
      await updateDoc(ref, { nome: nome.trim(), descricao: descricao.trim() });
      Alert.alert('Sucesso', 'Item atualizado com sucesso!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Falha ao atualizar item: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ padding: 20, marginTop: 40 }}>
      <TextInput
        placeholder="Nome"
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
        <Button title="Atualizar" onPress={handleAtualizar} />
      )}
    </View>
  );
};

export default EditItemScreen;
