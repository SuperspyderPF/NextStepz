import React, { useEffect, useState } from 'react';
import { FlatList, Text, View,  TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CompanyCard from '../atoms/CompanyCard'; // Assuming this is the correct path
import { windowHeight } from '../../hooks/useDimensions';
import { Button } from 'react-native-paper';

const ArchivedCards = () => {
  const [archivedCompanies, setArchivedCompanies] = useState([]);

  const loadArchivedCompanies = async () => {
    const archivedCompaniesString = await AsyncStorage.getItem('archivedCompanies');
    const archivedCompanies = archivedCompaniesString ? JSON.parse(archivedCompaniesString) : [];
    setArchivedCompanies(archivedCompanies);
  };

  useEffect(() => {
    loadArchivedCompanies();
  }, [archivedCompanies]); // Fetch archived companies whenever archivedCompanies state changes

  const handleDelete = async (companyName) => {
    try {
      // Remove the deleted company from archived companies
      const updatedArchivedCompanies = archivedCompanies.filter(company => company.name !== companyName);
      setArchivedCompanies(updatedArchivedCompanies);

      // Update AsyncStorage to reflect the change
      await AsyncStorage.setItem('archivedCompanies', JSON.stringify(updatedArchivedCompanies));
    } catch (error) {
      console.error('Error deleting archived company:', error);
    }
  };

  return (
    <ScrollView>
      <View style={{ marginTop: windowHeight * 0.05 }}>
        <Button title="delete all" onPress={() => handleDelete()}>Delete all</Button>
      </View>
      <FlatList
        data={archivedCompanies}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
                <CompanyCard
              company={item}
              onPress={() => {}}
              saved={true}
              isArchived={true}
              onDeleteArchived={handleDelete}

            />
          )}
      />
    </ScrollView>
  );
};

export default ArchivedCards;
