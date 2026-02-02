import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Pressable,
  Modal,
  Alert,
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
type LoginNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

interface LoginScreenProps {
  navigation: LoginNavigationProp;
  route: RouteProp<RootStackParamList, 'Login'>;
}
function Login({ navigation }: LoginScreenProps) {
  const [inputValue, setInputValue] = useState('');
  const [password, setPassword] = useState('');
  const [isPhoneMode, setIsPhoneMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [countryCode, setCountryCode] = useState<CountryCode>('IN');
  const [callingCode, setCallingCode] = useState('91');
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);

  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const setAuthStatus = useAuthStore(state => state.setAuthStatus);

  const handleNext = () => {
    if (isPhoneMode) {
      if (inputValue.length >= 10) {
        setShowOTPModal(true);
      } else {
        Alert.alert('Invalid Phone', 'Please enter a valid phone number');
      }
    } else {
      Alert.alert('Info', 'Email login not implemented yet');
    }
  };

  const toggleInputMode = () => {
    setIsPhoneMode(!isPhoneMode);
    setInputValue('');
    setPassword('');
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

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <View className="flex-1 justify-center items-center px-6">
        <View className="mb-8">
          <Text className="text-4xl text-black font-bold">Login</Text>
        </View>
        <View className="gap-4 flex flex-col items-center justify-center">
          {isPhoneMode ? (
            <View className="flex flex-row items-center w-[90vw] h-16 bg-white border border-slate-300 rounded-md">
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
                <Text className="text-base font-medium ml-1">
                  +{callingCode}
                </Text>
                <Ionicons
                  name="chevron-down"
                  size={16}
                  color="#64748B"
                  className="ml-1"
                />
              </TouchableOpacity>
              <TextInput
                className="flex-1 px-3 py-2"
                onChangeText={setInputValue}
                value={inputValue}
                placeholder="Phone Number"
                keyboardType="phone-pad"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          ) : (
            <TextInput
              className="flex flex-row items-center py-2 pl-3 pr-14 w-[313px] h-[45.36px] bg-white border border-slate-300 rounded-md"
              onChangeText={setInputValue}
              value={inputValue}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          )}
          {!isPhoneMode && (
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
          )}
          <View className="flex flex-row items-center gap-8 mb-12">
            <Pressable onPress={toggleInputMode} android_ripple={null}>
              <Text className="color-[#5F3FFD] text-lg font-semibold">
                {isPhoneMode ? 'via Email' : 'via Phone Number'}
              </Text>
            </Pressable>
            <View className="h-8 w-px bg-gray-300" />
            <Pressable
              onPress={() => console.log('Google login')}
              android_ripple={null}
            >
              <Text className="color-[#5F3FFD] text-lg font-semibold">
                via Google
              </Text>
            </Pressable>
          </View>
          <PressableScale onPress={handleNext}>
            <View className="w-[60vw] h-12 bg-blue-500 rounded-md justify-center items-center">
              <Text className="text-white font-semibold text-base">Next</Text>
            </View>
          </PressableScale>
        </View>
      </View>

      {showOTPModal && (
        <OTPModal
          visible={showOTPModal}
          onClose={() => setShowOTPModal(false)}
          phoneNumber={inputValue}
          callingCode={callingCode}
          onVerify={handleOTPVerify}
        />
      )}
    </KeyboardAvoidingView>
  );
}

export default Login;
