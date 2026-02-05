import './global.css';

// React Imports
import { useEffect } from 'react';

// React Native Imports
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Navigation Imports
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screen Components
import Home from '@/screens/Home';
import About from '@/screens/About';
import Campaigns from '@/screens/Campaigns';
import Campaign from '@/screens/Campaign';
import Dashboard from '@/screens/Dashboard';
import Login from '@/screens/Login';
import ProfilePage from '@/screens/ProfilePage';
import RecyclingInformation from '@/screens/RecyclingInformation';
import Registration from '@/screens/Registration';
import Schedules from '@/screens/Schedules';
import Schedule from '@/screens/Schedule';
import Services from '@/screens/Services';
import Tickets from '@/screens/Tickets';
import Ticket from '@/screens/Ticket';
import WasteReport from '@/screens/WasteReport';

// Custom Components
import Navbar from '@/components/Navbar';
import CustomTabBar from '@/components/CustomTabBar';

// Store Imports
import useLocationStore from '@/stores/useLocationStore.tsx';
import useAuthStore from '@/stores/useAuthStore';
import useUserStore from '@/stores/useUserStore';

// Type Imports
import { RootStackParamList, TabParamList } from '@/types/index';

// Navigator Initialization
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

// Tab Icons Configuration
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

// Protected Routes (Tab Navigator)
function MainTabs() {
  const city = useLocationStore(state => state.city);
  const username = useUserStore(state => state.username);

  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} icons={icons} />}
      screenOptions={{
        headerShown: true,
        header: props => (
          <Navbar
            {...props}
            name={username || ''}
            location={city}
            showBackButton={false}
            showLocation={true}
          />
        ),
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
  );
}

// Main Application Component
export default function App() {
  const city = useLocationStore(state => state.city);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const username = useUserStore(state => state.username);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={isAuthenticated ? 'MainTabs' : 'Login'}
            screenOptions={{
              contentStyle: { backgroundColor: '#FFFFFF' },
            }}
          >
            {/* Auth Screens - Always Available */}
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false,
                animationTypeForReplace: 'push',
              }}
            />
            <Stack.Screen
              name="Registration"
              component={Registration}
              options={{
                headerShown: false,
                animationTypeForReplace: 'push',
              }}
            />

            {/* Main Tabs - Always Available (handles auth check internally in ProfilePage) */}
            <Stack.Screen
              name="MainTabs"
              component={MainTabs}
              options={{
                headerShown: false,
              }}
            />

            {/* Protected Routes - Only Available When Authenticated */}
            {isAuthenticated && (
              <>
                <Stack.Screen
                  name="Campaign"
                  component={Campaign}
                  options={{
                    headerShown: true,
                    header: props => (
                      <Navbar
                        {...props}
                        name="Campaign"
                        location={city}
                        showBackButton={true}
                        showLocation={true}
                      />
                    ),
                  }}
                />
                <Stack.Screen
                  name="Schedule"
                  component={Schedule}
                  options={{
                    headerShown: true,
                    header: props => (
                      <Navbar
                        {...props}
                        name="Schedule"
                        location={city}
                        showBackButton={true}
                        showLocation={true}
                      />
                    ),
                  }}
                />
                <Stack.Screen
                  name="Ticket"
                  component={Ticket}
                  options={{
                    headerShown: true,
                    header: props => (
                      <Navbar
                        {...props}
                        name="Ticket"
                        location={city}
                        showBackButton={true}
                        showLocation={true}
                      />
                    ),
                  }}
                />
                <Stack.Screen
                  name="Services"
                  component={Services}
                  options={{
                    headerShown: true,
                    header: props => (
                      <Navbar
                        {...props}
                        name={username || ''}
                        location={city}
                        showBackButton={true}
                        showLocation={false}
                      />
                    ),
                  }}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
