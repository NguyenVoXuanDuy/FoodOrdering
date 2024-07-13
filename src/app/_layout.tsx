import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack, useNavigation } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Provider, useSelector } from "react-redux";
import store, { AppDispatch, RootState } from "@/redux/store";
import { onAuthStateChanged, signOut } from "firebase/auth";
export { ErrorBoundary } from "expo-router";
import { auth } from "@/firebase/firebaseConfig";
import Toast from "react-native-toast-message";
import {
  fetchUser,
  setIsCreatingUser,
  setIsInitialized,
} from "@/redux/authSlice";
import { useDispatch } from "react-redux";
import { StripeProvider } from "@stripe/stripe-react-native";
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <StripeProvider
      publishableKey={process.env.EXPO_PUBLIC_PUBLISHABLE_KEY as string}>
      <Provider store={store}>
        <RootLayoutNav />
      </Provider>
    </StripeProvider>
  );
}

function RootLayoutNav() {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const isInitialized = useSelector(
    (state: RootState) => state.auth.isInitialized
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      const isCreateUser = store.getState().auth.isCreateUser;

      if (isCreateUser) {
        auth.signOut();
        dispatch(setIsCreatingUser(false));
        return;
      }
      if (user) {
        dispatch(fetchUser({ uid: user.uid })).then(() => {
          navigation.reset({
            index: 0,
            routes: [{ name: "(home)" as never }],
          });
        });
      }
      dispatch(setIsInitialized(false));
    });
    return () => {
      unsubscribe();
    };
  }, []);

  if (isInitialized) return null;

  return (
    <>
      <Stack>
        <Stack.Screen name="(home)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="cart" options={{ headerShown: false }} />
        <Stack.Screen name="products" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
      <Toast />
    </>
  );
}
