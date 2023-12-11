import { Button } from "@/components";
import React from "react";
import { Text, View } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import { SvgXml } from "react-native-svg";
import { catXml, dogXml } from "../helpers/undraw";

type SuccessPropsType = {
  name: string;
  type: string;
  onBack: () => void;
  isEdit: boolean;
};

const Success = ({ name, type, onBack, isEdit }: SuccessPropsType) => {
  return (
    <View className="h-full justify-center px-2">
      <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} />
      <View>
        <Text className="text-violet-500 text-4xl font-semibold tracking-widest my-4">Udało się!</Text>
        <Text className="text-gray-300 text-xl text-justify">
          {isEdit
            ? "Ogłoszenie zostało edytowane. W przeciągu paru minut ogłoszenie na stronie zostanie odświeżone."
            : `${name} od teraz szuka wymarzonego domu. W przeciągu paru minut ogłoszenie pojawi się na stronie ogłoszeń Reksa.`}
        </Text>
      </View>
      <View className="items-center">
        <SvgXml xml={type === "KOT" ? catXml : dogXml} width={400} />
      </View>
      <View>
        <Button onPress={onBack}>Ekran główny</Button>
      </View>
    </View>
  );
};

export default Success;
