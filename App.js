import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import InProgress from './components/pages/InProgress';
import IconsPage from './components/pages/IconsPage';
import ArchivedCards from './components/pages/ArchivedCards';


const NotificationsRoute = () => <Text>Notifications</Text>;

const App = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'inProgress', title: 'In Progress', focusedIcon: 'file-document', unfocusedIcon: 'file-document'},
    { key: 'albums', title: 'Offer', focusedIcon: 'handshake' },
    { key: 'recents', title: 'Archived', focusedIcon: 'archive' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    inProgress: InProgress,
    albums: IconsPage,
    recents: ArchivedCards,
    notifications: NotificationsRoute,
  });

  return (
    <SafeAreaProvider>
      <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
    </SafeAreaProvider>
  );
};

export default App;