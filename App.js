import useCachedResources from './hooks/UseCachedResources';

import BottomNavigationBar from './components/BottomNavigationBar';
import GroupTabs from './components/GroupTabs';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider, initialWindowMetrics  } from 'react-native-safe-area-context';

const Stack = createStackNavigator();

function App() {
  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}} >

        <Stack.Screen name="BottomNavigationBar" component={BottomNavigationBar} />
        <Stack.Screen name="GroupTabs" component={GroupTabs} />
        
      </Stack.Navigator>
    );
  }
}

export default () => {
  return (   
     <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <NavigationContainer theme={{ colors: { background: '#000000' } }}>
        <App />
      </NavigationContainer>
     </SafeAreaProvider>     
  )
}