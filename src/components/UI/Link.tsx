import { useCallback } from "react";
import { Alert, Linking, Pressable, Text } from "react-native";

type LinkType = {
  url: string;
  children: React.ReactNode;
};

export const Link = ({ url, children }: LinkType) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);

    supported ? await Linking.openURL(url) : Alert.alert(`Podany adres URL nie jest wspierany: ${url}`);
  }, [url]);
  return (
    <Pressable onPress={handlePress} className="py-2">
      <Text className={"text-blue-500"}>{children}</Text>
    </Pressable>
  );
};
