
import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import CompanyCard from '../atoms/CompanyCard';
import {  Text } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { windowHeight } from '../../hooks/useDimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useOnDeleteStore from '../../hooks/useOnDelete';

const InProgress = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [savedCompanies, setSavedCompanies] = useState([]);
  const [index, setIndex] = React.useState(0);

  const handleIndexChange = (index) => setIndex(index);

  const InProgressRoute = () => <Text>In Progress</Text>;
  const OfferRoute = () => <Text>Offer</Text>;
  const ArchivedRoute = () => <Text>Archived</Text>;

  const routes = [
    { key: 'inProgress', title: 'In Progress', icon: 'progress-check' },
    { key: 'offer', title: 'Offer', icon: 'tag' },
    { key: 'archived', title: 'Archived', icon: 'archive' },
  ];

  const fetchCompanySuggestions = async (query) => {
    try {
      const response = await fetch(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${query}`);
      if (!response.ok) {
        throw new Error('Failed to fetch company suggestions');
      }
      const data = await response.json();
      // Filter out saved companies from suggestions
      const filteredSuggestions = data.filter(company => !savedCompanies.find(saved => saved.name === company.name));
      setSuggestions(filteredSuggestions);
    } catch (error) {
      console.error('Error fetching company suggestions:', error);
    }
  };

  const handleInputChange = (text) => {
    setSearchQuery(text);
    fetchCompanySuggestions(text);
  };

  const handleSaveCompany = async (company) => {
    try {
      // Fetch existing saved companies from AsyncStorage
      const existingCompanies = await AsyncStorage.getItem('savedCompanies');
      let companies = [];
      if (existingCompanies) {
        companies = JSON.parse(existingCompanies);
      }
      // Add the new company to the existing list
      companies.push(company);
      // Save the updated list back to AsyncStorage
      await AsyncStorage.setItem('savedCompanies', JSON.stringify(companies));
      // Update state to reflect the change
      setSavedCompanies(companies);
      setSuggestions([]);
    } catch (error) {
      console.error('Error saving company:', error);
    }
  };
  
  const handleDeleteCompany = async (companyName) => {
    try {
      const updatedCompanies = savedCompanies.filter(company => company.name !== companyName);
  
      await AsyncStorage.setItem('savedCompanies', JSON.stringify(updatedCompanies));
      // Update state
      setSavedCompanies(updatedCompanies);
    } catch (error) {
      console.error('Error deleting company:', error);
    }
  };
  

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'inProgress':
        return <InProgressRoute />;
      case 'offer':
        return <OfferRoute />;
      case 'archived':
        return <ArchivedRoute />;
      default:
        return null;
    }
  };

 
  const setOnDelete = useOnDeleteStore((state) => state.setOnDelete);

  useEffect(() => {
    const loadSavedCompanies = async () => {
      try {
        const savedCompanies = await AsyncStorage.getItem('savedCompanies');
        if (savedCompanies) {
          setSavedCompanies(JSON.parse(savedCompanies));
        }
      } catch (error) {
        console.error('Error loading saved companies:', error);
      }
    };
    loadSavedCompanies();
    setOnDelete(handleDeleteCompany);
  }, []);
  
  
useEffect(() => {
    setOnDelete((companyName) => handleDeleteCompany(companyName));
  }, [setOnDelete, handleDeleteCompany]);

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Enter company name"
          placeholderTextColor="#888"
          onChangeText={handleInputChange}
          value={searchQuery}
        />
        {suggestions.length > 0 && (
            <SafeAreaView >
                <FlatList
              data={suggestions}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <CompanyCard
                  company={item} 
                  onDelete={() => handleDeleteCompany(item.name)}
                  onPress={() => handleSaveCompany(item)}
                  setSavedCompanies={setSavedCompanies}
                />
              )}
            />
            </SafeAreaView>
        )}
       <FlatList
  data={savedCompanies}
  keyExtractor={(item) => item.name}
  renderItem={({ item }) => (
    <CompanyCard company={item} onPress={() => handleSaveCompany(item)} saved={true} />
  )}
/>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: windowHeight * 0.07
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 55,
    marginBottom: windowHeight * 0.02
  },
});

export default InProgress;