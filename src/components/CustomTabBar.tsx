import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { useEffect, useRef } from 'react';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    const animatedValues = useRef(
        state.routes.map(() => new Animated.Value(0))
    ).current;

    useEffect(() => {
        animatedValues.forEach((value, index) => {
            Animated.spring(value, {
                toValue: state.index === index ? 1 : 0,
                useNativeDriver: false,
                friction: 8,
            }).start();
        });
    }, [state.index, animatedValues]);

    return (
        <View className="absolute bottom-5 left-5 right-5 flex-row bg-white rounded-full px-3 py-3 shadow-lg justify-around">
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    (options.tabBarLabel !== undefined
                        ? typeof options.tabBarLabel === 'string'
                            ? options.tabBarLabel
                            : String(options.tabBarLabel)
                        : options.title !== undefined
                        ? options.title
                        : route.name) as string;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const backgroundColor = animatedValues[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: ['rgba(229, 231, 235, 0)', 'rgba(34, 197, 94, 1)'],
                });

                const textColor = isFocused ? '#ffffff' : '#6b7280';

                return (
                    <TouchableOpacity
                        key={route.key}
                        onPress={onPress}
                        activeOpacity={0.7}
                    >
                        <Animated.View
                            style={{ backgroundColor }}
                            className="px-4 py-2 rounded-full flex-row items-center"
                        >
                            <Text style={{ color: textColor }} className="text-sm font-semibold">
                                {label}
                            </Text>
                        </Animated.View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

export default CustomTabBar;
