import { View, Text, Image, Pressable } from 'react-native';
import { FeatureCardParams } from '@/types/index';

interface FeatureCardProps {
  feature: FeatureCardParams;
}

function FeatureCard({
  title,
  subText,
  btnText,
  iconPath,
  gradientPath,
  color,
  offsetLeft
}: FeatureCardProps) {
  return (
    <View
      className="w-[85vw] flex flex-row items-between justify-start overflow-hidden px-4 py-3 rounded-xl"
      style={{ backgroundColor: color }}
    >
      <View className="flex flex-col gap-8">
        <View className="flex flex-col gap-2">
          <Text className="text-lg font-bold">{title}</Text>
          <Text className="text-md">{subText}</Text>
        </View>
        <Pressable
          className="w-[40vw] flex items-center justify-center rounded-lg px-2 py-3"
          style={{ backgroundColor: 'rgba(17, 17, 17, 0.8)' }}
        >
          <Text className="text-xl text-white font-medium">{btnText}</Text>
        </Pressable>
      </View>
      <View className="relative">
        <Image className="absolute bottom-[-20%]" source={gradientPath} />
        <Image className={`absolute bottom-[5%] ${offsetLeft || "left-24"}`}  source={iconPath} />
      </View>
    </View>
  );
}

export default FeatureCard;
