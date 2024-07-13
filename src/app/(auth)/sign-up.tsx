import { View, Text, SafeAreaView, KeyboardAvoidingView } from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import DismissKeyboard from "@/components/common/DismissKeyboard";
import FormInput from "@/components/common/FormInput";
import BackPreviousButton from "@/components/common/BackPreviousButton";
import CommonButton from "@/components/common/CommonButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchUser, setIsCreatingUser, signUp } from "@/redux/authSlice";
import Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
const SignUp = () => {
  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");
  const isLoading = useSelector(
    (state: RootState) => state.auth.isCreatingUserLoading
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleSignUp = () => {
    if (
      email === "" ||
      password === "" ||
      confirmPassword === "" ||
      name === ""
    ) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please fill all the fields",
        visibilityTime: 2000,
      });

      return;
    }
    if (!validateEmail(email)) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please enter a valid email",
        visibilityTime: 2000,
      });

      return;
    }
    if (password.length < 6) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Password must be at least 6 characters long",
        visibilityTime: 2000,
      });
      return;
    }
    if (password !== confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Passwords do not match",
        visibilityTime: 2000,
      });
      return;
    }
    dispatch(setIsCreatingUser(true));

    dispatch(signUp({ name, email, password })).then(() => {
      if (router.canGoBack()) {
        router.replace("/create-success");
      } else {
        router.push("/create-success");
      }
    });
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <KeyboardAwareScrollView>
        <View className="bg-white h-full p-4">
          <BackPreviousButton textColor="white" backgroundColor="secondary" />
          <Text className="text-2xl mt-9 font-semibold text-secondary">
            Create an account!
          </Text>
          <Text className="mt-2 text-gray-300">
            Please login your details to register. 😘
          </Text>
          <View>
            <View className="mt-8">
              {/* FormInput component is a custom component which is created in components/common/ folder*/}
              <FormInput
                value={name}
                onChangeText={(e) => setName(e)}
                title="Display name"
                placeholder="Enter your display name..."
              />
            </View>
            <View className="mt-4">
              <FormInput
                value={email}
                onChangeText={(e) => setEmail(e)}
                title="Email"
                placeholder="Enter your email..."
              />
            </View>
            <View className="mt-4">
              <FormInput
                value={password}
                onChangeText={(e) => setPassword(e)}
                title="Password"
                placeholder="Enter your password..."
                isSecureTextEntry={true}
              />
            </View>
            <View className="mt-4">
              <FormInput
                value={confirmPassword}
                onChangeText={(e) => setConfirmPassword(e)}
                title="Confirm Password"
                placeholder="Enter your confirm password..."
                isSecureTextEntry={true}
              />
            </View>
            <View className="mt-8">
              <CommonButton
                onPress={handleSignUp}
                title="Sign Up"
                isLoading={isLoading}
              />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
