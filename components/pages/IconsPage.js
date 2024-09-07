import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the FontAwesome icon set

export default function IconsPage() {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => {}}>
        <Icon name="home" size={50} style={styles.icon} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {}}>
        <Icon name="user" size={50} style={styles.icon} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {}}>
        <Icon name="heart" size={50} style={styles.icon} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {}}>
        <Icon name="search" size={50} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  icon: {
    margin: 10,
  },
});
