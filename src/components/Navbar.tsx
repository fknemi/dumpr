import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Pressable,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import useLocation from '../hooks/useLocation';

interface NavbarProps {
  navigation?: NativeStackHeaderProps['navigation'];
  name?: string | null;
  showBackButton?: boolean;
  showLocation?: boolean;
  location?: string;
}

function Navbar({
  navigation,
  name = null,
  showBackButton = true,
  showLocation = true,
  location = 'Location',
}: NavbarProps) {
  const { getCurrentLocation } = useLocation();
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SafeAreaView className="bg-white">
        <View className="flex-row items-center justify-between px-4">
          <View className="flex-row items-center gap-6">
            {showBackButton && navigation?.canGoBack() && (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                className="p-2 bg-[#111] rounded-full"
              >
                <Ionicons name="arrow-back" size={28} color="#fff" />
              </TouchableOpacity>
            )}
            {name && (
              <View className="flex flex-row items-center justify-center gap-2">
                <Text className="text-2xl font-semibold ">Hi {name} </Text>
                <Text className="text-4xl">🖐️</Text>
              </View>
            )}
          </View>

          {showLocation && (
            <Pressable
              className="flex-row items-center gap-2 px-4 py-2 border border-gray-300 rounded-full"
              onPress={() => getCurrentLocation()}
            >
              <Text className="text-2xl font-medium">{location || '?'}</Text>
              <Ionicons name="location-sharp" size={24} color="#111" />
            </Pressable>
          )}
        </View>
      </SafeAreaView>
    </>
  );
}

export default Navbar;
