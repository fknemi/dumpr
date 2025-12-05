import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { Easing } from 'react-native';
import { useRef, useEffect } from 'react';
import Ionicons from '@react-native-vector-icons/ionicons';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

interface TabIcon {
    path: string;
    icon: string;
}

interface CustomTabBarProps extends BottomTabBarProps {
    icons: TabIcon[];
}

export default function CustomTabBar({ state, descriptors, navigation, icons }: CustomTabBarProps) {
    const filtered = state.routes.filter(r => icons.some(ic => ic.path === r.name));
    const anim = useRef(filtered.map(() => new Animated.Value(0))).current;

    useEffect(() => {
        filtered.forEach((route, i) => {
            const originalIndex = state.routes.findIndex(r => r.key === route.key);
            const focused = state.index === originalIndex;

            Animated.timing(anim[i], {
                toValue: focused ? 1 : 0,
                duration: 250,
                easing: Easing.out(Easing.ease),
                useNativeDriver: false,
            }).start();
        });
    }, [state.index]);

    return (
        <View
            style={{
                position: "absolute",
                bottom: 12,
                left: 18,
                right: 18,
                paddingVertical: 12,
                paddingHorizontal: 10,
                borderRadius: 999,
                backgroundColor: "#22C55E",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                height: 70,
            }}
        >
            {filtered.map((route, i) => {
                const originalIndex = state.routes.findIndex(r => r.key === route.key);
                const focused = state.index === originalIndex;

                const { options } = descriptors[route.key];
                const label = (options.tabBarLabel ?? options.title ?? route.name) as string;

                const iconName = icons.find(ic => ic.path === route.name)?.icon ?? "help-circle-outline";

                // Animations
                const width = anim[i].interpolate({
                    inputRange: [0, 1],
                    outputRange: [58, 150],
                });

                const bgOpacity = anim[i].interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.85, 1],
                });

                const scale = anim[i].interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.1],
                });

                const labelOpacity = anim[i];
                const labelTranslate = anim[i].interpolate({
                    inputRange: [0, 1],
                    outputRange: [10, 0],
                });

                const onPress = () => {
                    if (!focused) navigation.navigate(route.name);
                };

                return (
                    <TouchableOpacity
                        key={route.key}
                        activeOpacity={0.85}
                        onPress={onPress}
                        style={{ flexShrink: 0 }}
                    >
                        <Animated.View
                            style={{
                                width,
                                height: 52,
                                backgroundColor: "#fff",
                                borderRadius: 999,
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                paddingHorizontal: 12,
                                opacity: bgOpacity,
                                transform: [{ scale }],
                                overflow: "hidden",
                            }}
                        >
                            <Ionicons name={iconName as any} size={30} color="#111" />

                            <Animated.Text
                                numberOfLines={1}
                                style={{
                                    marginLeft: 8,
                                    opacity: labelOpacity,
                                    transform: [{ translateX: labelTranslate }],
                                    color: "#111",
                                    fontSize: 18,
                                    fontWeight: "600",
                                    display: focused ? "flex" : "none",
                                }}
                            >
                                {label}
                            </Animated.Text>
                        </Animated.View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

