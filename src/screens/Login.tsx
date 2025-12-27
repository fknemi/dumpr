import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { PressableScale } from 'pressto';

function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
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
          <TextInput
            className="flex flex-row items-center py-2 pl-3 pr-14 w-[313px] h-[45.36px] bg-white border border-slate-300 rounded-md"
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

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

          <View className="flex flex-row items-center gap-8 mb-12">
            <Pressable
              onPress={() => console.log('Phone login')}
              android_ripple={null}
            >
              <Text className="color-[#5F3FFD] text-lg font-semibold">
                via Phone Number
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

          <PressableScale onPress={handleLogin}>
            <View className="w-[60vw] h-12 bg-blue-500 rounded-md justify-center items-center">
              <Text className="text-white font-semibold text-base">Login</Text>
            </View>
          </PressableScale>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default Login;
