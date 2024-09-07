
import React, { useState, useEffect,useRef } from 'react';
import { TouchableOpacity, StyleSheet, Text, Image, View, FlatList, Alert } from 'react-native';
import { Card, IconButton, List, Colors, Drawer, Button, Modal, Portal, TextInput } from 'react-native-paper'; // Import List and Colors from react-native-paper
import { windowWidth, windowHeight } from '../../hooks/useDimensions';
import TechRoleIcons from './TechRoleIcons';
import TechStageIcons from './TechStageIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useOnDeleteStore from '../../hooks/useOnDelete';
import { AntDesign, Entypo, FontAwesome, Ionicons, MaterialCommunityIcons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

const CompanyCard = ({ company, onSave, onPress, saved, isArchived, onDeleteArchived  }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedStage, setSelectedStage] = useState(null); // State to store selected stage
  const [showDrawer, setShowDrawer] = useState(false);
  const [active, setActive] = React.useState('');
  const [selectedRole, setSelectedRole] = useState(null); // State to store selected role
  const [showRoleOptions, setShowRoleOptions] = useState(false); // New state variable for role options
  const [showStageOptions, setShowStageOptions] = useState(false); // New state variable for stage options
  const [showCustomRoleModal, setShowCustomRoleModal] = useState(false);
  const [showCustomStageModal, setShowCustomStageModal] = useState(false);
  const [selectedStageThird, setSelectedStageThird] = useState(null);
  const [customRoleName, setCustomRoleName] = useState('');
  const [customRoleIcon, setCustomRoleIcon] = useState({icon: '', library: ''});
  const [customRoles, setCustomRoles] = useState([]);
  

  const hanldeRoleInputChange = (text) => {
    setCustomRoleName(text);
  };

  const onDelete = useOnDeleteStore((state) => state.onDelete);
  const openCustomRoleModal = () => setShowCustomRoleModal(true);
  const closeCustomRoleModal = () => setShowCustomRoleModal(false);
  
  const openCustomStageModal = () => setShowCustomStageModal(true);
  const closeCustomStageModal = () => setShowCustomStageModal(false);
    
  const toggleOptions = () => {
    setShowOptions(!showOptions);
    // if (selectedStage !== null) {
    //   setSelectedStage(null); // Deselect the stage when toggling options
    // }
  };

  const handleSave = () => {
    onSave(company);
    setShowOptions(false); // Hide options after saving
  };

  const toggleRoleOptions = () => {
    setShowRoleOptions(!showRoleOptions);
    if (!showRoleOptions && selectedStage !== null) {
      setSelectedStage(null); // Deselect the stage when toggling role options
    }
  };
  
  const toggleStageOptions = () => {
    setShowStageOptions(!showStageOptions);
    if (!showStageOptions && selectedRole !== null) {
      setSelectedRole(null); // Deselect the role when toggling stage options
    }
  };

 
  
  const CustomTextInput = ({ value, onChange }) => {
    const [currentValue, setCurrentValue] = useState('');
    
    return (
        <TextInput
        placeholder="Enter Custom Role"
          value={currentValue}
          onChangeText={v => setCurrentValue(v)}
          onEndEditing={() => onChange(currentValue)}
        />
    );
};
  
const handleSaveCustomRole = async () => {
  const customRole = { 
    name: customRoleName, 
    icon: customRoleIcon.icon,
    library: customRoleIcon.library
  }; // Use a generic key or a method to determine the icon based on the name

  // Save the custom role for this specific company in AsyncStorage
  const customRolesKey = `${company.name}_customRoles`;
  const existingCustomRolesJson = await AsyncStorage.getItem(customRolesKey);
  let existingCustomRoles = existingCustomRolesJson ? JSON.parse(existingCustomRolesJson) : [];
  existingCustomRoles.push(customRole);
  await AsyncStorage.setItem(customRolesKey, JSON.stringify(existingCustomRoles));
  //setCustomRoleName(currentValue)
  setCustomRoles(existingCustomRoles); // Update state to include the new custom role
  closeCustomRoleModal(); // Close the modal
};
  
  
  
  const handleSelectRole = async (roleName) => {
    setSelectedRole(roleName);
    setShowRoleOptions(true); // Close role options after selection
  
    try {
      await AsyncStorage.setItem(`${company.name}_selectedRole`, roleName);
    } catch (error) {
      console.error('Error saving selected role to AsyncStorage:', error);
    }
  };
  
  const handleSelectStage = async (stageName) => {
    setSelectedStage(stageName);
    setShowStageOptions(true); // Close stage options after selection
  
    try {
      await AsyncStorage.setItem(`${company.name}_selectedStage`, stageName);
    } catch (error) {
      console.error('Error saving selected stage to AsyncStorage:', error);
    }
  };
  
  const codedRoles = [
    { name: 'Software Engineer', icon: 'code-braces' },
    { name: 'Data Scientist', icon: 'chart-line' },
    { name: 'Product Manager', icon: 'clipboard-list' },
    { name: 'Cybersecurity Analyst', icon: 'shield-lock' },
    { name: 'DevOps Engineer', icon: 'server' },
];

const stages = [
    { name: 'Phone Interview', icon: 'phone' },
    { name: 'Technical Interview', icon: 'cogs' },
    { name: 'Behavioral Interview', icon: 'chat' },
    { name: 'Team Interview', icon: 'account-group' },
  ];

  const roles = [...codedRoles, ...customRoles];

  const renderSelectedStage = () => {
    if (isArchived && company.stage) {
        const stage = stages.find((s) => s.name === company.stage) || { icon: 'progress-check', name: company.stage };
        return (
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
            <List.Icon icon={stage.icon} color={'black'} />
            <Text style={{ marginLeft: 10 }}>{stage.name}</Text>
          </View>
          <View style={{ width: '50%', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
  <Button mode="contained" onPress={() => onDeleteArchived(company.name)}>Delete</Button>
</View>

          </View>
        );
      }
    if (!selectedStage) {
    return (
      <>
        {stages.map((stage) => (
         <TouchableOpacity key={stage.name} onPress={() => handleSelectStage(stage.name)}>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
              <List.Icon icon={stage.icon} color={'grey'} />
              <Text style={{ marginLeft: 10 }}>{stage.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={openCustomStageModal}>
          <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
            <List.Icon icon="pencil" color={'grey'} />
            <Text style={{ marginLeft: 10 }}>Custom Stage</Text>
          </View>
        </TouchableOpacity>
      </>
    );
  } else {
      const stage = stages.find((s) => s.name === selectedStage);
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
  <List.Icon icon={stage.icon} color={'black'} />
  <Text style={{ marginLeft: 10 }}>{stage.name}</Text>
  <View style={{ flex: 1, alignItems: 'flex-end' }}>
    <Button textColor='black' icon="pen" onPress={() => setSelectedStage(null)} />
  </View>
</View>
      );
    }
  };

  
  const renderSelectedRole = () => {
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
    if (isArchived && company.role) {
        const role = roles.find((r) => r.name === company.role) || { icon: 'code-braces', name: company.role };
        return (
          <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
            <List.Icon icon={role.icon} color={'black'} />
            <Text style={{ marginLeft: 10 }}>{role.name}</Text>
          </View>
        );
      }
    if (!selectedRole) {
      return (
        <>
          {roles.map((role) => (
            <TouchableOpacity key={role.name} onPress={() => handleSelectRole(role.name)}>
              <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                <List.Icon icon={role.icon} color={'grey'} />
                <Text style={{ marginLeft: 10 }}>{role.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
           {customRoles.map((role) => {
        const IconComponent = getIconComponent(role.library);
        return (
          <TouchableOpacity key={role.name} onPress={() => handleSelectRole(role.name)}>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
              <IconComponent name={role.icon} size={24} color="black" />
              <Text style={{ marginLeft: 10 }}>{role.name}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
          <TouchableOpacity onPress={openCustomRoleModal}>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
              <List.Icon icon="pencil" color={'grey'} />
              <Text style={{ marginLeft: 10 }}>Custom Role</Text>
            </View>
          </TouchableOpacity>
        </>
      );
    } else {
      const role = roles.find((r) => r.name === selectedRole);
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
          <List.Icon icon={role.icon} color={'black'} />
          <Text style={{ marginLeft: 10 }}>{role.name}</Text>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
    <Button textColor='black' icon="pen" onPress={() => setSelectedRole(null)} />
  </View>
        </View>
      );
    }
  };
  const inputRef = useRef(null);


  const CustomRoleModal = () => (
    <Modal visible={showCustomRoleModal} onDismiss={closeCustomRoleModal}>
      <View style={{ backgroundColor: 'white', padding: 20 }}>
<CustomTextInput/>
        <View style={{marginTop: windowHeight * 0.05}}/>
        <TechRoleIcons onSelectIcon={iconKey => setCustomRoleIcon(iconKey)} />
        <View style={{marginTop: windowHeight * 0.05}}/>
        <Button mode="contained" onPress={handleSaveCustomRole}>Save</Button>
      </View>
    </Modal>
  );
  
  const CustomStageModal = () => (
    <Modal visible={showCustomStageModal} onDismiss={closeCustomStageModal}>
      <View style={{ backgroundColor: 'white', padding: 20 }}>
        <TextInput label="Enter Custom Stage" />
        <View style={{marginTop: windowHeight * 0.05}}/>
        <TechStageIcons/>
        <View style={{marginTop: windowHeight * 0.05}}/>
        <Button mode="contained" onPress={closeCustomStageModal}>Save</Button>
      </View>
    </Modal>
  );

  const handleOnDelete = async () => {
    if (onDelete) {
      // Call the onDelete function passed as a prop or context
      onDelete(company.name);
  
      // Key pattern used to save the role
      const roleKey = `${company.name}_selectedRole`;
      const stageKey = `${company.name}_selectedStage`;
  
      try {
        // Remove the specific role associated with this company from AsyncStorage
        await AsyncStorage.removeItem(roleKey);
        await AsyncStorage.removeItem(stageKey);
        console.log(`Removed ${roleKey} from AsyncStorage.`);
      } catch (error) {
        // Log any errors encountered during the removal
        console.error('Error removing selected role from AsyncStorage:', error);
      }
    }
  };
  

  const handleArchiveCompany = async () => {
    Alert.alert(
      'Confirm Archive',
      `Are you sure you want to archive this ${selectedRole} role at ${company.name}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            await handleOnDelete(company.name); // Existing deletion logic
  
            // Retrieve role and stage
            const role = selectedRole;
            const stage = selectedStage;
  
            // Append role and stage to company data
            const companyToArchive = { ...company, role, stage };
  
            // Save to the archived list
            const archivedCompaniesString = await AsyncStorage.getItem('archivedCompanies');
            let archivedCompanies = archivedCompaniesString ? JSON.parse(archivedCompaniesString) : [];
            archivedCompanies.push(companyToArchive);
            await AsyncStorage.setItem('archivedCompanies', JSON.stringify(archivedCompanies));
          },
        },
      ],
      { cancelable: false }
    );
  };


  useEffect(() => {
    const loadSelectedRole = async () => {
      try {
        const savedRole = await AsyncStorage.getItem(`${company.name}_selectedRole`);
        if (savedRole !== null) {
          setSelectedRole(savedRole);
        }
      } catch (error) {
        console.error('Error loading selected role from AsyncStorage:', error);
      }
    };

    const loadSelectedStage = async () => {
          try {
            const savedStage = await AsyncStorage.getItem(`${company.name}_selectedStage`);
            if (savedStage !== null) {
              setSelectedStage(savedStage);
            }
          } catch (error) {
            console.error('Error loading selected stage from AsyncStorage:', error);
          }
        };

        const loadCustomRoles = async () => {
            const customRolesKey = `${company.name}_customRoles`;
            const existingCustomRolesJson = await AsyncStorage.getItem(customRolesKey);
            if (existingCustomRolesJson) {
              const existingCustomRoles = JSON.parse(existingCustomRolesJson);
              setCustomRoles(existingCustomRoles); // Set the custom roles into the state
            }
          };
  
    loadSelectedRole();
    loadSelectedStage()
    loadCustomRoles();
  }, [company]);
  



  if (saved) {
    return (
      <Card style={styles.card}>
        <View style={styles.cardContent}>
          <Image source={{ uri: company.logo }} style={styles.logo} />
          <Text style={styles.companyName}>{company.name}</Text>
          <IconButton
            icon={showOptions ? 'chevron-up' : 'chevron-down'}
            size={20}
            onPress={toggleOptions}
          />
        </View>
        {showOptions && (
          <View style={styles.options}>
            <Text style={{textAlign: 'center'}}> Role:</Text>
            {renderSelectedRole()}
            <Text style={{textAlign: 'center'}}> Stage:</Text>
            {renderSelectedStage()}
            {/* {renderSelectedRoleStage()} */}
            <CustomRoleModal
  setCustomRoleName={setCustomRoleName}
  setCustomRoleIcon={setCustomRoleIcon}
  onSaveCustomRole={handleSaveCustomRole}
/>
        <CustomStageModal />
        <View style={{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: windowHeight * 0.05
  }}>
      {selectedRole && selectedStage && (
  <View style={{
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  }}>
    <Button style={styles.row_button} mode="contained" onPress={() => console.log('Offer')}>
      Offer
    </Button>
    <Button
  style={styles.row_button}
  mode="contained"
  onPress={() => handleArchiveCompany(company)} 
>
  Archive
</Button>

  </View>
)}

    </View>
          </View>
        )}
      </Card>
    );
  } else {
    return (
      <TouchableOpacity style={{marginTop: windowHeight * 0.01}} onPress={() => onPress(company)}>
        <Card style={styles.card}>
          <View style={styles.cardContent}>
            <Image source={{ uri: company.logo }} style={styles.logo} />
            <Text style={styles.companyName}>{company.name}</Text>
          </View>
        </Card>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  card: {
    width: windowWidth * 0.95,
    marginBottom: 10,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  logo: {
    width: 60,
    height: 60,
    marginRight: 12,
    borderRadius: 5,
  },
  companyName: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
  },
  options: {
    padding: 10,
  },
  stageText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  row_button: {
    marginHorizontal: 5,
  },
});

export default CompanyCard;