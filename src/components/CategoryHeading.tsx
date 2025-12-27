import { View, Text, Pressable } from 'react-native';
import { CategoryHeadingParams } from '../../types/index.ts';
function CategoryHeading({ title, width, onViewMore }: CategoryHeadingParams) {
  return (
    <View
      className={`flex flex-row ${width} items-start justify-between border-b-2 pb-2 border-[#F0F0F0]`}
    >
      <Text className="text-2xl font-semibold">{title}</Text>
      <Pressable onPress={() => onViewMore()}>
        <Text className="color-[#111] text-lg font-medium">see more</Text>
      </Pressable>
    </View>
  );
}

export default CategoryHeading;
