import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import FormInput from "@/components/common/FormInput";

type AddIngredientModalProps = {
  isModalVisible: boolean;
  setIsModalVisible: (isVisible: boolean) => void;
  ingredient: string;
  setIngredient: (ingredient: string) => void;
  onAddIngredient: () => void;
};

const AddIngredientModal = ({
  isModalVisible,
  setIsModalVisible,
  ingredient,
  setIngredient,
  onAddIngredient,
}: AddIngredientModalProps) => {
  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={() => {
        setIsModalVisible(false);
      }}
      backdropColor="black"
      backdropOpacity={0.7}
      className="flex-1 justify-center items-center">
      <View className="w-[300px]  bg-gray-100 rounded-xl relative flex flex-row justify-between items-center">
        <View className="flex-1">
          <FormInput
            placeholder="Enter a ingredient..."
            value={ingredient}
            onChangeText={(ingredient) => setIngredient(ingredient)}
          />
        </View>
        <TouchableOpacity
          onPress={onAddIngredient}
          className="h-[80%] bg-secondary mr-1 px-6 py-[14px] rounded-xl ">
          <Text className="text-white font-semibold">Add</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default AddIngredientModal;
