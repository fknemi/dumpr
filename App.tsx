import "./global.css";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './src/screens/Home';
import CustomTabBar from "./src/components/CustomTabBar"
import About from './src/screens/About';
import Campaigns from './src/screens/Campaigns';
import Campaign from './src/screens/Campaign';
import Dashboard from './src/screens/Dashboard';
import Login from './src/screens/Login';
import ProfilePage from './src/screens/ProfilePage';
import RecyclingInformation from './src/screens/RecyclingInformation';
import Registration from './src/screens/Registration';
import Schedules from './src/screens/Schedules';
import Schedule from './src/screens/Schedule';
import Services from './src/screens/Services';
import Tickets from './src/screens/Tickets';
import Ticket from './src/screens/Ticket';
import WasteReport from './src/screens/WasteReport';


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
const icons: TabIcon[] = [{
    path: "Home",
    icon: "home"
},
{
    path: "Dashboard",
    icon: "shapes",
},
{
    path: "Schedules",
    icon: "calendar",
},
{
    path: "Profile",
    icon: "person",
},
]
// Main Tab Navigator
function MainTabs() {
    return (
        <Tab.Navigator
            tabBar={props => <CustomTabBar {...props} icons={icons} />}
            screenOptions={{
                headerShown: false,
            }}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: 'Home',
                    // Add icon here if using icon library
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
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Login"
                screenOptions={{
                    headerShown: false,
                }}
            >
                {/* Auth Screens (no tabs) */}
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Registration" component={Registration} />

                {/* Main App with Tabs */}
                <Stack.Screen name="MainTabs" component={MainTabs} />

                {/* Detail Screens (no tabs) */}
                <Stack.Screen name="Campaign" component={Campaign} />
                <Stack.Screen name="Schedule" component={Schedule} />
                <Stack.Screen name="Ticket" component={Ticket} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
