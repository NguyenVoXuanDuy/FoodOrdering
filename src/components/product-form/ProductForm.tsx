import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import FormInput from "@/components/common/FormInput";
import "@fullstackcraft/react-native-keyboard-shift";
import SizeEnum from "@/enums/SizeEnum";
import { CreateProduct } from "@/redux/createProductSlice";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AddIngredientModal from "@/components/product-form/AddIngredientModal";
import IngredientChip from "@/components/product-form/IngredientChip";
import BackPreviousButton from "@/components/common/BackPreviousButton";
import PlusSvgIcon from "@assets/svg/PlusSvgIcon";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import UploadImageSvgIcon from "@assets/svg/UploadImageSvgIcon";
import TrashSvgIcon from "@assets/svg/TrashSvgIcon";
import DeleteWarningModal from "@/components/product-form/DeleteWarningModal";
import { router, useNavigation } from "expo-router";

type ProductFormProps = {
  product: CreateProduct;
  onProductChange: (product: CreateProduct) => void;
  title: string;
  isEdit?: boolean;
  onDelete?: () => void;
};

const ProductForm = ({
  product,
  onProductChange,
  title,
  isEdit = false,
  onDelete,
}: ProductFormProps) => {
  const [isIngredientModalVisible, setIsIngredientModalVisible] =
    useState<boolean>(false);

  const [isWarningModalVisible, setIsWarningModalVisible] =
    useState<boolean>(false);
  const [ingredient, setIngredient] = useState<string>("");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    console.log("picking image");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      onProductChange({ ...product, image: result.assets[0].uri });
      return;
    }
    console.log("asd");
  };

  return (
    <View className="h-full bg-white">
      <AddIngredientModal
        isModalVisible={isIngredientModalVisible}
        setIsModalVisible={setIsIngredientModalVisible}
        ingredient={ingredient}
        setIngredient={setIngredient}
        onAddIngredient={() => {
          if (ingredient) {
            onProductChange({
              ...product,
              ingredients: [...product.ingredients, ingredient],
            });
            setIngredient("");
            setIsIngredientModalVisible(false);
          }
        }}
      />

      <DeleteWarningModal
        onConfirmDelete={onDelete}
        isModalVisible={isWarningModalVisible}
        setIsModalVisible={setIsWarningModalVisible}
      />

      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={{
          height: "100%",
        }}>
        <View className="">
          <View className="flex flex-row justify-between items-center">
            <BackPreviousButton textColor="white" backgroundColor="secondary" />
            {isEdit && (
              <TouchableOpacity
                onPress={() => {
                  setIsWarningModalVisible(true);
                }}>
                <TrashSvgIcon />
              </TouchableOpacity>
            )}
          </View>
          <View className="flex flex-row justify-center items-center">
            <Text className="text-2xl font-semibold mt-3">{title}</Text>
          </View>
          <View className="mt-8">
            <Text className="font-semibold  text-secondary">Product Photo</Text>
            <Text className="text-gray-300">
              Upload your product photo (Recommendation 1:1)
            </Text>
            <View className="w-full flex justify-between items-center ">
              {!product.image ? (
                <TouchableOpacity onPress={pickImage}>
                  <View className=" h-40 w-40 rounded-full border border-gray-300 bg-gray-200 justify-center items-center mt-3">
                    <UploadImageSvgIcon />
                    <TouchableOpacity onPress={pickImage}>
                      <Text className="text-secondary">Upload Image</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={pickImage}>
                  <View>
                    <Image
                      key={product.id}
                      source={product.image || undefined}
                      onLoad={() => {
                        console.log(product.image);
                      }}
                      style={{ width: 160, height: 160 }}
                      cachePolicy="memory-disk"
                      className="rounded-full aspect-square mt-3"
                    />
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View className="mt-4">
            <FormInput
              value={product.name}
              onChangeText={(name) => onProductChange({ ...product, name })}
              title="Product Name"
              placeholder="Enter product name..."
            />
          </View>
          <View className="mt-4 flex flex-row space-x-3 ">
            <View className="flex-1">
              <FormInput
                value={product.price[SizeEnum.SMALL]}
                onChangeText={(smallPrice) =>
                  onProductChange({
                    ...product,
                    price: {
                      ...product.price,
                      [SizeEnum.SMALL]: smallPrice,
                    },
                  })
                }
                keyboardType={"numeric"}
                title="Small Price"
                placeholder="e.g. 10.00"
              />
            </View>
            <View className="flex-1">
              <FormInput
                value={product.price[SizeEnum.MEDIUM]}
                onChangeText={(mediumPrice) =>
                  onProductChange({
                    ...product,
                    price: {
                      ...product.price,
                      [SizeEnum.MEDIUM]: mediumPrice,
                    },
                  })
                }
                keyboardType={"numeric"}
                title="Medium Price"
                placeholder="e.g. 10.00"
              />
            </View>
            <View className="flex-1">
              <FormInput
                value={product.price[SizeEnum.LARGE]}
                onChangeText={(largePrice) =>
                  onProductChange({
                    ...product,
                    price: {
                      ...product.price,
                      [SizeEnum.LARGE]: largePrice,
                    },
                  })
                }
                keyboardType={"numeric"}
                title="Large Price"
                placeholder="e.g. 10.00"
              />
            </View>
          </View>
          <View className="mt-4 flex flex-row space-x-3 ">
            <View className="flex-1">
              <FormInput
                value={product.calories}
                onChangeText={(calories) =>
                  onProductChange({ ...product, calories: calories })
                }
                keyboardType={"numeric"}
                title="Calories"
                placeholder="e.g. 120"
              />
            </View>
            <View className="flex-1">
              <FormInput
                value={product.fat}
                onChangeText={(fat) =>
                  onProductChange({ ...product, fat: fat })
                }
                keyboardType={"numeric"}
                title="Fats"
                placeholder="e.g. 16"
              />
            </View>
          </View>
          <View className="mt-4 flex flex-row space-x-3 ">
            <View className="flex-1">
              <FormInput
                value={product.protein}
                onChangeText={(protein) =>
                  onProductChange({ ...product, protein: protein })
                }
                keyboardType={"numeric"}
                title="Protein"
                placeholder="e.g. 18"
              />
            </View>
            <View className="flex-1">
              <FormInput
                value={product.carbs}
                onChangeText={(carbs) =>
                  onProductChange({ ...product, carbs: carbs })
                }
                keyboardType={"numeric"}
                title="Carbs"
                placeholder="e.g. 20"
              />
            </View>
          </View>
          <View className="mt-4">
            <View className="flex flex-row justify-between items-center">
              <View className="">
                <Text className="font-semibold  text-secondary">
                  Ingredients
                </Text>
                <Text className="text-gray-300 ">Add ingredients here</Text>
              </View>
              <TouchableOpacity
                onPress={() => setIsIngredientModalVisible(true)}>
                <PlusSvgIcon />
              </TouchableOpacity>
            </View>
            <View className="flex flex-row flex-wrap mt-1 mb-16">
              {product.ingredients.map((ingredient, index) => (
                <IngredientChip
                  key={index}
                  ingredient={ingredient}
                  onRemove={() => {
                    const newIngredients = product.ingredients.filter(
                      (_, i) => i !== index
                    );
                    onProductChange({
                      ...product,
                      ingredients: newIngredients,
                    });
                  }}
                />
              ))}
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default ProductForm;
