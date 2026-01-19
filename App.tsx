import './global.css';
import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '@/screens/Home';
import CustomTabBar from '@/components/CustomTabBar';
import About from '@/screens/About';
import Campaigns from '@/screens/Campaigns';
import Campaign from '@/screens/Campaign';
import Dashboard from '@/screens/Dashboard';
import Login from '@/screens/Login';
import ProfilePage from '@/screens/ProfilePage';
import RecyclingInformation from '@/screens/RecyclingInformation';
import Registration from '@/screens/Registration';
import Navbar from '@/components/Navbar';
import Schedules from '@/screens/Schedules';
import Schedule from '@/screens/Schedule';
import Services from '@/screens/Services';
import Tickets from '@/screens/Tickets';
import Ticket from '@/screens/Ticket';
import WasteReport from '@/screens/WasteReport';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useLocationStore from '@/stores/useLocationStore.tsx';
import { RootStackParamList, TabParamList } from '@/types/index';

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
          sceneStyle: { backgroundColor: 'white' },
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
  const city = useLocationStore(state => state.city);

  return (
    <>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="MainTabs"
              screenOptions={{
                headerShown: true,
                header: props => (
                  <Navbar
                    {...props}
                    name="Test"
                    location={city}
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
              <Stack.Screen name="Services" component={Services} />
            </Stack.Navigator>
          </NavigationContainer>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </>
  );
}
