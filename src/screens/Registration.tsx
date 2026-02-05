import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Pressable,
  Alert,
  ScrollView,
} from 'react-native';
import type {
  NativeStackNavigationProp,
  RouteProp,
} from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/types/index';
import OTPModal from '@/components/OTPModal';
import { useState, useEffect } from 'react';
import Ionicons from '@react-native-vector-icons/ionicons';
import { PressableScale } from 'pressto';

import CountryPicker, {
  Country,
  CountryCode,
} from 'react-native-country-picker-modal';
import useAuthStore from '@/stores/useAuthStore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

type RegistrationNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Registration'
>;
interface RegistrationScreenProps {
  navigation: RegistrationNavigationProp;
  route: RouteProp<RootStackParamList, 'Registration'>;
}

function Registration({ navigation }: RegistrationScreenProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [countryCode, setCountryCode] = useState<CountryCode>('IN');
  const [callingCode, setCallingCode] = useState('91');
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);

  const setAuthStatus = useAuthStore(state => state.setAuthStatus);

  const validateInputs = () => {
    if (!fullName.trim()) {
      Alert.alert('Error', 'Please enter your full name');
      return false;
    }
    if (!email.trim() || !email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }
    if (phoneNumber.length < 10) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return false;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }
    return true;
  };

  const handleRegister = () => {
    if (validateInputs()) {
      setShowOTPModal(true);
    }
  };

  const onSelectCountry = (country: Country) => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode[0]);
    setShowCountryPicker(false);
  };

  const handleOTPVerify = (userCredential: any) => {
    setAuthStatus(true);
    navigation.navigate('MainTabs');
  };

  const handleGoogleSignup = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info:', userInfo);
      setAuthStatus(true);
      navigation.navigate('MainTabs');
    } catch (error: any) {
      console.error('Google Sign-In Error:', error);
      Alert.alert(
        'Error',
        `${error?.code || 'Unknown'}: ${error?.message || 'Failed to sign in with Google'}`,
      );
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '119264150641-2cs6kplfba1ag8d0vsdefp6g4s37s2la.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    });
  }, []);

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 justify-center items-center px-6 py-8">
          <View className="mb-8">
            <Text className="text-4xl text-black font-bold">Register</Text>
            <Text className="text-base text-gray-600 mt-2">
              Create your account
            </Text>
          </View>

          <View className="gap-4 flex flex-col items-center justify-center w-full">
            {/* Full Name Input */}
            <TextInput
              className="flex flex-row items-center py-2 pl-3 pr-14 w-[313px] h-[45.36px] bg-white border border-slate-300 rounded-md"
              onChangeText={setFullName}
              value={fullName}
              placeholder="Full Name"
              autoCapitalize="words"
              autoCorrect={false}
            />

            {/* Email Input */}
            <TextInput
              className="flex flex-row items-center py-2 pl-3 pr-14 w-[313px] h-[45.36px] bg-white border border-slate-300 rounded-md"
              onChangeText={setEmail}
              value={email}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            {/* Phone Number Input */}
            <View className="flex flex-row items-center w-[313px] h-[45.36px] bg-white border border-slate-300 rounded-md">
              <TouchableOpacity
                onPress={() => setShowCountryPicker(true)}
                className="flex flex-row items-center px-3 border-r border-slate-300"
              >
                <CountryPicker
                  countryCode={countryCode}
                  withFilter
                  withFlag
                  withCallingCode
                  onSelect={onSelectCountry}
                  visible={showCountryPicker}
                  onClose={() => setShowCountryPicker(false)}
                />
                <Text className="text-sm font-medium ml-1">+{callingCode}</Text>
                <Ionicons
                  name="chevron-down"
                  size={14}
                  color="#64748B"
                  className="ml-1"
                />
              </TouchableOpacity>
              <TextInput
                className="flex-1 px-3 py-2"
                onChangeText={setPhoneNumber}
                value={phoneNumber}
                placeholder="Phone Number"
                keyboardType="phone-pad"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Password Input */}
            <View className="relative">
              <TextInput
                className="flex flex-row items-center py-2 pl-3 pr-14 w-[313px] h-[45.36px] bg-white border border-slate-300 rounded-md"
                onChangeText={setPassword}
                value={password}
                placeholder="Password"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2"
              >
                <Ionicons
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={24}
                  color="#94A3B8"
                />
              </TouchableOpacity>
            </View>

            {/* Confirm Password Input */}
            <View className="relative">
              <TextInput
                className="flex flex-row items-center py-2 pl-3 pr-14 w-[313px] h-[45.36px] bg-white border border-slate-300 rounded-md"
                onChangeText={setConfirmPassword}
                value={confirmPassword}
                placeholder="Confirm Password"
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-2"
              >
                <Ionicons
                  name={showConfirmPassword ? 'eye-off' : 'eye'}
                  size={24}
                  color="#94A3B8"
                />
              </TouchableOpacity>
            </View>

            {/* Google Sign Up Option */}
            <View className="flex flex-row items-center gap-4 my-4">
              <View className="flex-1 h-px bg-gray-300" />
              <Text className="text-gray-500 text-sm">or</Text>
              <View className="flex-1 h-px bg-gray-300" />
            </View>

            <Pressable
              onPress={handleGoogleSignup}
              android_ripple={null}
              className="mb-4"
            >
              <View className="flex flex-row items-center justify-center gap-2 w-[313px] h-[45.36px] bg-white border border-slate-300 rounded-md">
                <Ionicons name="logo-google" size={20} color="#5F3FFD" />
                <Text className="color-[#5F3FFD] text-base font-semibold">
                  Sign up with Google
                </Text>
              </View>
            </Pressable>

            {/* Register Button */}
            <PressableScale onPress={handleRegister}>
              <View className="w-[60vw] h-12 bg-blue-500 rounded-md justify-center items-center">
                <Text className="text-white font-semibold text-base">
                  Register
                </Text>
              </View>
            </PressableScale>

            {/* Already have account link */}
            <Pressable
              className="mt-6"
              onPress={() => navigation.navigate('Login')}
              android_ripple={null}
            >
              <Text className="text-gray-600 text-base">
                Already have an account?{' '}
                <Text className="color-[#5F3FFD] font-semibold">Login</Text>
              </Text>
            </Pressable>
          </View>

          {/* Skip Button */}
          <Pressable
            className="flex absolute bottom-8"
            onPress={() => setAuthStatus(true)}
            android_ripple={null}
          >
            <Text className="color-[#111] text-xl font-semibold">skip</Text>
          </Pressable>
        </View>
      </ScrollView>

      {showOTPModal && (
        <OTPModal
          visible={showOTPModal}
          onClose={() => setShowOTPModal(false)}
          phoneNumber={phoneNumber}
          callingCode={callingCode}
          onVerify={handleOTPVerify}
        />
      )}
    </KeyboardAvoidingView>
  );
}

export default Registration;
