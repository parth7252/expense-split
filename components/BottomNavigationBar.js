import * as React from 'react';
import { BackHandler } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RFValue } from "react-native-responsive-fontsize";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Groups from "../screens/Groups";
import CreateGroup from '../screens/CreateGroup';
import GroupTabs from './GroupTabs';
import AddExpense from '../screens/AddExpense';
import ExpenseDetails from '../screens/ExpenseDetails';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function handleBackButton  ()  {
  BackHandler.exitApp();
  return true;
}

function GroupsStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
    >
      <Stack.Screen
        name="Groups"
        component={Groups}
        options={{ title: 'Groups Page' }}
        listeners={{ 
          focus: () => BackHandler.addEventListener('hardwareBackPress',handleBackButton),
          blur: () => BackHandler.removeEventListener('hardwareBackPress',handleBackButton)
        }}
      />
      <Stack.Screen
        name="GroupTabs"
        component={GroupTabs}
      />
      <Stack.Screen
        name="AddExpense"
        component={AddExpense}
      />
      <Stack.Screen
        name="ExpenseDetails"
        component={ExpenseDetails}
      />
    </Stack.Navigator>
  );
}

function CreateGroupStack() {
  return (
    <Stack.Navigator
      initialRouteName="CreateGroup"
      screenOptions={{headerShown: false}}
    >
      <Stack.Screen
        name="CreateGroup"
        component={CreateGroup}
      />
    </Stack.Navigator>
  );
}

function BottomNavigationBar() {
  const insets = useSafeAreaInsets();
  return (
      <Tab.Navigator
        initialRouteName="Feed"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#DCDCDC',
          tabBarInactiveTintColor: '#000000',
          tabBarActiveBackgroundColor: '#332940',
          tabBarInactiveBackgroundColor: '#332940',
          tabBarHideOnKeyboard: true,
          tabBarStyle: {height: insets.bottom + '7.5%', borderTopWidth: 0},
        }}
        
      >
        <Tab.Screen
          name="GroupsStack"          
          component={GroupsStack}
          options={{
            tabBarLabel: 'Groups',
            tabBarLabelPosition: 'below-icon',
            tabBarLabelStyle: {fontFamily: 'Montserrat-Medium', fontSize: RFValue(9.5), marginBottom: 10},
            tabBarIconStyle: {marginTop: 10},
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="layer-group" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="CreateGroupStack"
          component={CreateGroupStack}
          options={{
            tabBarLabel: 'Create Group',
            tabBarLabelPosition: 'below-icon',
            tabBarLabelStyle: {fontFamily: 'Montserrat-Medium', fontSize: RFValue(9.5), marginBottom: 10},
            tabBarIconStyle: {marginTop: 10},
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="plus-circle" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>    
  );
}

export default BottomNavigationBar;