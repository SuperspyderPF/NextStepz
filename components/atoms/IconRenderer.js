import { AntDesign, Entypo, FontAwesome, Ionicons, MaterialCommunityIcons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

const IconRenderer = ({ icon, iconSet }) => {
  const iconProps = {
    name: icon,
    size: 24,
    color: 'black',
  };

  switch (iconSet) {
    case 'AntDesign':
      return <AntDesign {...iconProps} />;
    case 'Entypo':
      return <Entypo {...iconProps} />;
    case 'FontAwesome':
      return <FontAwesome {...iconProps} />;
    case 'Ionicons':
      return <Ionicons {...iconProps} />;
    case 'MaterialCommunityIcons':
      return <MaterialCommunityIcons {...iconProps} />;
    case 'FontAwesome5':
      return <FontAwesome5 {...iconProps} />;
    case 'MaterialIcons':
      return <MaterialIcons {...iconProps} />;
    default:
      return null; 
  }
};

export default IconRenderer