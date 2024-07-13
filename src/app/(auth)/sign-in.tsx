import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FacebookSvgIcon from "@assets/svg/FacebookSvgIcon";
import GoogleSvgIcon from "@assets/svg/GoogleSvgIcon";
import { Link } from "expo-router";
import DismissKeyboard from "@/components/common/DismissKeyboard";
import FormInput from "@/components/common/FormInput";
import CommonButton from "@/components/common/CommonButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { login } from "@/redux/authSlice";
import Toast from "react-native-toast-message";

const SignIn = () => {
  const isLoading = useSelector(
    (state: RootState) => state.auth.isLoginLoading
  );
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignUp = () => {
    if (email === "" || password === "") {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please fill all the fields",
        visibilityTime: 2000,
      });
      return;
    }
    //after login onAuthStateChanged will be triggered and user will be redirected to home page
    //so no need to handle redirection here
    dispatch(login({ email, password }));
  };

  return (
    <DismissKeyboard>
      <SafeAreaView className="bg-white h-full p-4">
        <View className="flex justify-center items-center mt-8 text-secondary">
          <Text className="text-2xl font-semibold ">Login</Text>
        </View>
        <Text className="text-2xl mt-9 font-semibold text-secondary">
          Hello, Welcome! 👋
        </Text>
        <Text className="mt-2 text-gray-300">
          To enjoy the best pizza! Login here. 😍
        </Text>
        <View>
          {/* FormInput component is a custom component which is created in components/common/ folder*/}
          <View className="mt-8">
            <FormInput
              title="Email"
              placeholder="Enter your email..."
              value={email}
              onChangeText={(e) => setEmail(e)}
            />
          </View>
          <View className="mt-4">
            <FormInput
              title="Password"
              placeholder="Enter your password..."
              value={password}
              onChangeText={(e) => setPassword(e)}
              isSecureTextEntry={true}
            />
          </View>
          <View className="flex flex-row justify-end mt-2">
            <Text className="text-primary font-semibold ">Forgot password</Text>
          </View>
          <View className="mt-6">
            <CommonButton
              title="Login"
              onPress={handleSignUp}
              isLoading={isLoading}
            />
          </View>
          <View className="mt-8"></View>
          <View className="flex flex-row justify-center mt-8">
            <Text className="text-gray-300 font-semibold">
              Don't have an account?{" "}
            </Text>
            <Link href="(auth)/sign-up">
              <Text className="text-primary font-semibold">Register</Text>
            </Link>
          </View>
        </View>
        <View>
          <View className="mt-6 ">
            <View className="flex flex-row justify-between items-center px-7">
              <View className="flex-1 h-0.5 bg-gray-100  "></View>
              <View className="w-2"></View>
              <Text className=" text-gray-300 font-semibold">
                Or login with
              </Text>
              <View className="w-2"></View>
              <View className="flex-1 h-0.5 bg-gray-100"></View>
            </View>
            <View className="flex flex-row justify-center mt-4 space-x-5 items-center">
              <TouchableOpacity>
                <GoogleSvgIcon />
              </TouchableOpacity>
              <TouchableOpacity>
                <FacebookSvgIcon />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </DismissKeyboard>
  );
};

export default SignIn;
