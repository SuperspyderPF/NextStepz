import React, { useState } from 'react';
import { View, TextInput, StyleSheet, FlatList } from 'react-native';
import CompanyCard from './components/atoms/CompanyCard';
import { BottomNavigation, Text } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [savedCompanies, setSavedCompanies] = useState([]);
  const [index, setIndex] = React.useState(0);

  const handleIndexChange = (index) => setIndex(index);

  const InProgressRoute = () => <Text>In Progress</Text>;
  const OfferRoute = () => <Text>Offer</Text>;
  const ArchivedRoute = () => <Text>Archived</Text>;



  const fetchCompanySuggestions = async (query) => {
    try {
      const response = await fetch(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${query}`);
      if (!response.ok) {
        throw new Error('Failed to fetch company suggestions');
      }
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error('Error fetching company suggestions:', error);
    }
  };

  const handleInputChange = (text) => {
    setSearchQuery(text);
    fetchCompanySuggestions(text);
  };

  const handleSaveCompany = (company) => {
    setSavedCompanies([...savedCompanies, company]);
    setSuggestions([]);
  };



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
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <CompanyCard company={item} onPress={() => handleSaveCompany(item)} />
            )}
          />
        )}
        <FlatList
          data={savedCompanies}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <CompanyCard company={item} onPress={() => handleSaveCompany(item)} />
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
    backgroundColor: '#fff',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 55,
  },
});

export default App;
