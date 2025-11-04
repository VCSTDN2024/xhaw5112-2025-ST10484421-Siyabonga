import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import LoginScreen from './LoginScreen';
import CourseListScreen from './CourseListScreen';
import QuoteBuilderScreen from './QuoteBuilderScreen';
import CourseDetailsScreen from './CourseDetailsScreen';
import UserRegistrationScreen from './UserRegistration';
import AboutUsScreen from './AboutUsScreen';
import ContactUsScreen from './ContactUsScreen';
import DashboardScreen from './DashboardScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const screenOptions = {
  headerStyle: {
    backgroundColor: '#1a365d',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: '700' as const,
  },
};

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={screenOptions}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Login' }}
        />
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{ 
            title: 'Dashboard',
            // Prevent going back to login screen
            headerLeft: () => null,
            headerBackVisible: false
          }}
        />
        <Stack.Screen
          name="Home"
          component={CourseListScreen}
          options={{ title: 'Empowering the Nation' }}
        />
        <Stack.Screen
          name="QuoteBuilder"
          component={QuoteBuilderScreen}
          options={{ title: 'Get a Quote' }}
        />
        <Stack.Screen
          name="CourseDetails"
          component={CourseDetailsScreen}
          options={{ title: 'Course Details' }}
        />
        <Stack.Screen
          name="Registration"
          component={UserRegistrationScreen}
          options={{ title: 'User Registration' }}
        />
        <Stack.Screen
          name="AboutUs"
          component={AboutUsScreen}
          options={{ title: 'About Us' }}
        />
        <Stack.Screen
          name="ContactUs"
          component={ContactUsScreen}
          options={{ title: 'Contact Us' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
