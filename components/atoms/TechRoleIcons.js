import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { AntDesign, Entypo, FontAwesome, Ionicons, MaterialCommunityIcons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

const TechRoleIcons = ({ onSelectIcon }) => {

  const icons = [
    { library: 'Entypo', name: 'database', iconName: 'Data Scientist' },
    { library: 'FontAwesome', name: 'bar-chart', iconName: 'Product Manager' },
    { library: 'Ionicons', name: 'shield', iconName: 'Cybersecurity Analyst' },
    { library: 'MaterialCommunityIcons', name: 'server', iconName: 'DevOps Engineer' },
    { library: 'MaterialCommunityIcons', name: 'language-python', iconName: 'Python Developer' },
    { library: 'MaterialCommunityIcons', name: 'android', iconName: 'Android Developer' },
    { library: 'FontAwesome', name: 'database', iconName: 'Database Administrator' },
    { library: 'MaterialCommunityIcons', name: 'cloud', iconName: 'Cloud Engineer' },
    { library: 'MaterialCommunityIcons', name: 'network', iconName: 'Network Engineer' },
    { library: 'MaterialCommunityIcons', name: 'source-branch', iconName: 'Git Developer' },
    { library: 'Ionicons', name: 'code-slash', iconName: 'Backend Developer' },
    { library: 'MaterialCommunityIcons', name: 'chart-line', iconName: 'Data Analyst' },
    { library: 'Ionicons', name: 'logo-angular', iconName: 'Angular Developer' },
    { library: 'FontAwesome', name: 'mobile', iconName: 'Mobile App Tester' },
    { library: 'FontAwesome', name: 'android', iconName: 'Android Tester' },
    { library: 'MaterialCommunityIcons', name: 'apple', iconName: 'iOS Tester' },
    { library: 'Ionicons', name: 'logo-javascript', iconName: 'React Developer' },
    { library: 'MaterialCommunityIcons', name: 'language-typescript', iconName: 'Docker Specialist' },
    { library: 'Entypo', name: 'tablet-mobile-combo', iconName: 'Mobile UI Designer' },
    { library: 'Ionicons', name: 'cog', iconName: 'Automation Engineer' },
    { library: 'MaterialCommunityIcons', name: 'file-document-outline', iconName: 'Technical Writer' },
    { library: 'MaterialCommunityIcons', name: 'microsoft-azure', iconName: 'Azure Cloud Engineer' },
    { library: 'FontAwesome5', name: 'robot', iconName: 'AI Engineer' },
    { library: 'MaterialIcons', name: 'developer-board', iconName: 'Embedded Systems Engineer' },
    { library: 'FontAwesome5', name: 'server', iconName: 'System Administrator' },
    { library: 'MaterialCommunityIcons', name: 'language-csharp', iconName: 'C# Developer' },
    { library: 'MaterialIcons', name: 'memory', iconName: 'Hardware Engineer' },
    { library: 'MaterialCommunityIcons', name: 'robot-industrial', iconName: 'Robotics Engineer' },
    { library: 'FontAwesome5', name: 'wifi', iconName: 'Wireless Network Engineer' },
    { library: 'MaterialCommunityIcons', name: 'language-java', iconName: 'Java Developer' },
    { library: 'FontAwesome5', name: 'fire-extinguisher', iconName: 'Disaster Recovery Specialist' },
    { library: 'MaterialCommunityIcons', name: 'language-go', iconName: 'Go Developer' },
    { library: 'MaterialCommunityIcons', name: 'cellphone-link', iconName: 'Telecommunications Engineer' },
    { library: 'FontAwesome5', name: 'solar-panel', iconName: 'Renewable Energy Engineer' },
    { library: 'MaterialCommunityIcons', name: 'language-ruby', iconName: 'Ruby Developer' },
    { library: 'MaterialCommunityIcons', name: 'dna', iconName: 'Biomedical Engineer' },
    { library: 'FontAwesome5', name: 'satellite', iconName: 'Space Systems Engineer' },
    { library: 'MaterialCommunityIcons', name: 'language-haskell', iconName: 'Haskell Developer' },
    { library: 'FontAwesome5', name: 'ethernet', iconName: 'Network Architect' },
    { library: 'MaterialCommunityIcons', name: 'language-php', iconName: 'PHP Developer' },
    { library: 'FontAwesome5', name: 'microscope', iconName: 'Biotechnologist' },
    { library: 'MaterialCommunityIcons', name: 'language-swift', iconName: 'Swift Developer' },
  ];
  


  const [selectedIcon, setSelectedIcon] = useState(null);
  const handleClick = (icon, library) => {
    setSelectedIcon({ icon, library });
    console.log(icon, library);
  };

  const getIconComponent = (library) => {
    switch (library) {
      case 'Entypo': return Entypo;
      case 'FontAwesome': return FontAwesome;
      case 'Ionicons': return Ionicons;
      case 'MaterialCommunityIcons': return MaterialCommunityIcons;
      // Add cases for other libraries as needed
      default: return MaterialCommunityIcons; // Default or fallback
    }
  };
  
  
  return (
    <View style={styles.container}>
      {icons.map(({ library, name, iconName }) => {
        const IconComponent = getIconComponent(library);
        return (
          <TouchableOpacity key={iconName} onPress={() => handleClick(name, library)}>
            <IconComponent name={name} size={24} color="black" />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TechRoleIcons;
