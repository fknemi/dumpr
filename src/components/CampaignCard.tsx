import { View, Text, Linking, Pressable, Alert } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { CampaignCardParams } from '@/types/index.ts';

const openLink = async (url: string) => {
  console.log('Attempting to open:', url);
  try {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      await Linking.openURL(url);
    } else {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Unable to open this link');
      }
    }
  } catch (err) {
    console.error(err);
    Alert.alert('Error', 'Failed to open the link. Please try again.');
  }
};

function CampaignCard({
  title,
  subText,
  url,
  icon,
  color,
}: CampaignCardParams) {
  return (
    <LinearGradient
      colors={['#FFF', color]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      locations={[0.1, 1]}
      className="w-[85vw] p-4 rounded-xl border-2 border-[#F0F0F0]"
    >
      <Pressable onPress={() => openLink(url)}>
        <View className="flex flex-col items-start justify-start gap-2">
          <Text className="color-[#111] text-2xl font-semibold">{title}</Text>
          <Text className="text-lg font-medium">{subText}</Text>
          <Text className="text-md underline mt-2">{url}</Text>
        </View>
        <View className="absolute right-4 top-4">
          <Ionicons name={icon} size={50} color="#fff" />
        </View>
      </Pressable>
    </LinearGradient>
  );
}

export default CampaignCard;
