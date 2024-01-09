import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  SharedValue,
  measure,
  runOnUI,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const Chevron = ({ progress }: { progress: SharedValue<number> }) => {
  const chevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${progress.value * -180}deg` }],
  }));

  return (
    <View className="bg-gray-700 rounded-full p-1">
      <Animated.View style={chevronStyle}>
        <MaterialCommunityIcons name="chevron-down" size={24} color="white" />
      </Animated.View>
    </View>
  );
};

type AccordionProps = {
  children?: React.ReactNode;
  title: string;
};

export const Accordion = ({ children, title }: AccordionProps) => {
  const listRef = useAnimatedRef<Animated.View>();
  const heightValue = useSharedValue(0);
  const open = useSharedValue(false);
  const progress = useDerivedValue(() => (open.value ? withTiming(1) : withTiming(0)));
  const heightAnimationStyle = useAnimatedStyle(() => ({
    height: heightValue.value,
  }));

  const handlePress = () => {
    if (heightValue.value === 0) {
      runOnUI(() => {
        "worklet";
        heightValue.value = withTiming(measure(listRef)!.height);
      })();
    } else {
      heightValue.value = withTiming(0);
    }
    open.value = !open.value;
  };

  return (
    <View
      style={{
        marginTop: 10,
        paddingHorizontal: 14,
        backgroundColor: "#1f2937",
        overflow: "hidden",
      }}
      className="rounded-xl"
    >
      <Pressable onPress={handlePress} style={{ paddingVertical: 10 }}>
        <View className="flex-row justify-between items-center">
          <Text className="text-gray-50 text-xl font-semibold">{title}</Text>
          <Chevron progress={progress}></Chevron>
        </View>
      </Pressable>
      <Animated.View style={heightAnimationStyle}>
        <Animated.View
          style={{ backgroundColor: "#1f2937", position: "absolute", top: 0, width: "100%", paddingBottom: 16 }}
          ref={listRef}
        >
          {children}
        </Animated.View>
      </Animated.View>
    </View>
  );
};
