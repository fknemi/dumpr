import { View, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

function Login() {
    const navigation = useNavigation();

    const handleLogin = () => {
        navigation.navigate('MainTabs');
    };

    return (
        <View className="flex-1 bg-black justify-center items-center px-6">
            <Text className="text-4xl text-white font-bold mb-8">Login</Text>
            
            <TouchableOpacity 
                onPress={handleLogin}
                className="bg-green-500 px-8 py-4 rounded-lg w-full"
            >
                <Text className="text-white text-center text-lg font-semibold">
                    Go to Home
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Login
