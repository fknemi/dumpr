import { View, Text, Image, Pressable } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import useAuthStore from '@/stores/useAuthStore';

interface ProfilePageProps {
  navigation?: NativeStackHeaderProps['navigation'];
}

function ProfilePage({ navigation }: ProfilePageProps) {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return (
    <View>
      {isAuthenticated ? (
        <></>
      ) : (
        <View className="flex flex-col w-full h-[60vh] items-center justify-center gap-24">
          <View className="flex flex-col items-center justify-center gap-4">
            <Image source={require('../../assets/profile-icon.png')} />
            <Text className="text-xl font-rethink-semibold text-center">
              To continue browsing please {'\n'}login or create an account.
            </Text>
          </View>
          <View className="flex flex-row gap-8 iitems-center justify-center">
            <Pressable
              onPress={() => navigation.navigate('Login')}
              className="flex flex-row gap-8 items-center justify-center border-[1.5px] border-[#16161726] px-4 py-2 rounded-lg"
            >
              <Text className="text-lg font-rethink-semibold">Login</Text>
              <Ionicons name={'arrow-forward-outline'} size={24} color="#111" />
            </Pressable>

            <Pressable
              onPress={() => navigation.navigate('Registration')}
              className="flex flex-row gap-8 items-center justify-center border-[1.5px] border-[#16161726] px-4 py-2 rounded-lg"
            >
              <Text className="text-lg font-rethink-semibold">Register</Text>
              <Ionicons name={'arrow-forward-outline'} size={24} color="#111" />
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}

export default ProfilePage;
