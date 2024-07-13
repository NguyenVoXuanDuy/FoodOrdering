import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Modal from "react-native-modal";
type DeleteWarningModalProps = {
  onConfirmDelete?: () => void;
  isModalVisible: boolean;
  setIsModalVisible: (isVisible: boolean) => void;
};

const DeleteWarningModal = ({
  onConfirmDelete,
  isModalVisible,
  setIsModalVisible,
}: DeleteWarningModalProps) => {
  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={() => {
        setIsModalVisible(false);
      }}
      backdropColor="black"
      backdropOpacity={0.7}
      className="flex-1 justify-center items-center">
      <View className="w-[300px] h  bg-gray-100 rounded-xl relative flex flex-col justify-center items-center">
        <Text className="text-lg font-semibold mt-4 text-red-600/90">
          Are you sure?
        </Text>
        <Text className="text-gray-500 text-center mt-2 mb-4">
          Do you really want to delete this product?
        </Text>
        <View className="flex flex-row justify-center w-full mt-3 mb-3">
          <TouchableOpacity
            onPress={() => {
              setIsModalVisible(false);
            }}
            className="bg-gray-300 ml-1 px-6 py-[14px] rounded-xl mr-2">
            <Text className="text-black font-semibold">Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onConfirmDelete}
            className=" bg-red-600/90 mr-1 px-6 py-[14px] rounded-xl ">
            <Text className="text-white font-semibold ">Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteWarningModal;
