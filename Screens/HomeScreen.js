import React, { useEffect, useState } from 'react';
import { View, FlatList, Button, Alert, ActivityIndicator } from 'react-native';
import ItemCard from '../components/ItemCard';
import { db, auth } from '../FirebaseConfig';
import { signOut } from 'firebase/auth';
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc
} from 'firebase/firestore';

const HomeScreen = ({ navigation }) => {
  const [itens, setItens] = useState([]);
  const [loading, setLoading] = useState(true);

  // Configura botão "Sair" no topo
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => {
            signOut(auth).catch((err) => {
              Alert.alert('Erro', 'Falha ao sair: ' + err.message);
            });
          }}
          title="Sair"
          color="#ff0000"
        />
      )
    });
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'itens'), (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setItens(lista);
      setLoading(false);
    }, (error) => {
      Alert.alert('Erro', 'Falha ao carregar itens: ' + error.message);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleExcluir = (id) => {
    Alert.alert(
      'Confirmar exclusão',
      'Deseja realmente excluir este item?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'itens', id));
            } catch (error) {
              Alert.alert('Erro', 'Falha ao excluir item: ' + error.message);
            }
          }
        }
      ]
    );
  };

  const handleEditar = (item) => {
    navigation.navigate('EditItem', { itemId: item.id });
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
      <Button title="Adicionar Item" onPress={() => navigation.navigate('AddItem')} />
      <FlatList
        data={itens}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ItemCard item={item} onEditar={handleEditar} onExcluir={handleExcluir} />
        )}
      />
    </View>
  );
};

export default HomeScreen;
