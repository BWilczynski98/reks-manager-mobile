import { Button } from "@/components";
import { Modal, Text, View } from "react-native";

type ConfirmationModalProps = {
  modalIsVisible: boolean;
  closeModal: () => void;
  isLoading: boolean;
  onConfirm: () => void;
  title: string;
  content: string;
};

export const ConfirmationModal = ({
  modalIsVisible,
  closeModal,
  isLoading,
  onConfirm,
  title,
  content,
}: ConfirmationModalProps) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Modal visible={modalIsVisible} transparent={true} animationType="fade" statusBarTranslucent={true}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              paddingVertical: 18,
              paddingHorizontal: 20,
              backgroundColor: "#1f2937",
              borderRadius: 20,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
              width: "95%",
              rowGap: 16,
            }}
          >
            <View>
              <Text className="text-gray-50 text-2xl font-semibold">{title}</Text>
            </View>
            <View>
              <Text className="text-gray-300 text-xl tracking-wide">{content}</Text>
            </View>
            <View className="flex-row justify-end space-x-3">
              <View className="w-1/3">
                <Button variant="outline" onPress={closeModal}>
                  Anuluj
                </Button>
              </View>
              <View className="w-1/3">
                <Button variant="destructive" onPress={onConfirm} isLoading={isLoading}>
                  Usuń
                </Button>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
