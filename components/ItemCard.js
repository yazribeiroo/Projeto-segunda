// components/ItemCard.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ItemCard = ({ item, onEditar, onExcluir }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.titulo}>{item.nome}</Text>
      <Text>{item.descricao}</Text>
      <View style={styles.botoes}>
        <Button title="Editar" onPress={() => onEditar(item)} />
        <Button title="Excluir" onPress={() => onExcluir(item.id)} color="red" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default ItemCard;
