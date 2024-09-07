import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { AntDesign, Entypo, FontAwesome, Ionicons, MaterialCommunityIcons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

const TechStageIcons = () => {

    const icons = [
        { icon: <FontAwesome name="users" size={24} color="black" />, name: 'Team Interview' },
        { icon: <FontAwesome name="cogs" size={24} color="black" />, name: 'Technical Interview' },
        { icon: <FontAwesome name="phone" size={24} color="black" />, name: 'Phone Interview' },
        { icon: <FontAwesome name="check-circle" size={24} color="black" />, name: 'Offer Accepted' },
        { icon: <FontAwesome name="times-circle" size={24} color="black" />, name: 'Offer Declined' },
        { icon: <FontAwesome name="calendar" size={24} color="black" />, name: 'Schedule Interview' },
        { icon: <FontAwesome name="check" size={24} color="black" />, name: 'Completed' },
        { icon: <FontAwesome name="comment" size={24} color="black" />, name: 'Feedback' },
        { icon: <FontAwesome name="user-plus" size={24} color="black" />, name: 'Onboarding' },
        { icon: <MaterialIcons name="chat" size={24} color="black" />, name: 'chat' },
        { icon: <MaterialCommunityIcons  name="account-group" size={24} color="black" />, name: 'account-group' },
    ];

    const stages = [
        { name: 'Phone Interview', icon: 'phone' },
        { name: 'Technical Interview', icon: 'cogs' },
        { name: 'Behavioral Interview', icon: 'chat' },
        { name: 'Team Interview', icon: 'account-group' },
      ];
    


  const [selectedIcon, setSelectedIcon] = useState(null);
  const handleClick = (name) => {
    setSelectedIcon(name);
    console.log(name)
  };

  return (
    <View style={styles.container}>
      {icons.map(({ icon, name }) => (
        <TouchableOpacity key={name} onPress={() => handleClick(name)}>
          {name === selectedIcon ? React.cloneElement(icon, { color: 'grey' }) : icon}
        </TouchableOpacity>
      ))}
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

export default TechStageIcons;
