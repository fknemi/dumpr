import './global.css';
import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './src/screens/Home';
import CustomTabBar from './src/components/CustomTabBar';
import About from './src/screens/About';
import Campaigns from './src/screens/Campaigns';
import Campaign from './src/screens/Campaign';
import Dashboard from './src/screens/Dashboard';
import Login from './src/screens/Login';
import ProfilePage from './src/screens/ProfilePage';
import RecyclingInformation from './src/screens/RecyclingInformation';
import Registration from './src/screens/Registration';
import Navbar from './src/components/Navbar';
import Schedules from './src/screens/Schedules';
import Schedule from './src/screens/Schedule';
import Services from './src/screens/Services';
import Tickets from './src/screens/Tickets';
import Ticket from './src/screens/Ticket';
import WasteReport from './src/screens/WasteReport';
import { SafeAreaProvider } from 'react-native-safe-area-context';


export type RootStackParamList = {
  MainTabs: undefined;
  Login: undefined;
  Registration: undefined;
  Campaign: { id: string };
  Schedule: { id: string };
  Ticket: { id: string };
};

export type TabParamList = {
  Home: undefined;
  Dashboard: undefined;
  Services: undefined;
  Schedules: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();
const icons: TabIcon[] = [
  {
    path: 'Home',
    icon: 'home',
  },
  {
    path: 'Dashboard',
    icon: 'shapes',
  },
  {
    path: 'Schedules',
    icon: 'calendar',
  },
  {
    path: 'Profile',
    icon: 'person',
  },
];
function MainTabs() {
  return (
    <>
      <Tab.Navigator
        tabBar={props => <CustomTabBar {...props} icons={icons} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: 'Home',
          }}
        />
        <Tab.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            tabBarLabel: 'Dashboard',
          }}
        />
        <Tab.Screen
          name="Services"
          component={Services}
          options={{
            tabBarLabel: 'Services',
          }}
        />
        <Tab.Screen
          name="Schedules"
          component={Schedules}
          options={{
            tabBarLabel: 'Schedules',
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfilePage}
          options={{
            tabBarLabel: 'Profile',
          }}
        />
      </Tab.Navigator>
    </>
  );
}

export default function App() {
  return (
    <>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Login"
              screenOptions={{
                headerShown: true,
                header: props => (
                  <Navbar
                    {...props}
                    name="Test"
                    location="Location"
                    showBackButton={true}
                    showLocation={true}
                  />
                ),
                contentStyle: { backgroundColor: '#FFFFFF' },
              }}
            >
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Registration" component={Registration} />

              <Stack.Screen name="MainTabs" component={MainTabs} />

              <Stack.Screen name="Campaign" component={Campaign} />
              <Stack.Screen name="Schedule" component={Schedule} />
              <Stack.Screen name="Ticket" component={Ticket} />
            </Stack.Navigator>
          </NavigationContainer>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </>
  );
}
