import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/type";
import { auth, db } from "@/firebase/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Toast from "react-native-toast-message";

type UserState = {
  user: User | null;
  isInitialized: boolean;
  isCreatingUserLoading: boolean;
  isLoginLoading: boolean;
  isCreateUser: boolean;
};

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (
    {
      name,
      email,
      password,
    }: { name: string; email: string; password: string },
    thunkAPI
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, "users", userCredential.user.uid), {
        email: email,
        name: name,
        isAdmin: false,
      });
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const login = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await auth.signOut();
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async ({ uid }: { uid: string }, thunkAPI) => {
    const userRef = doc(db, "users", uid);
    try {
      const documentSnapshots = await getDoc(userRef);
      if (documentSnapshots.exists() && documentSnapshots.data()) {
        const user = {
          id: documentSnapshots.id,
          ...documentSnapshots.data(),
        } as User;
        return user;
      } else {
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isInitialized: true,
    isCreatingUserLoading: false,
    isCreateUser: false,
    isLoginLoading: false,
  } as UserState,
  reducers: {
    setIsCreatingUser: (state, action: PayloadAction<boolean>) => {
      state.isCreateUser = action.payload;
    },
    setIsInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      //after login success, onAuthStateChanged listener in first _layout.tsx file will
      //automatically update the user state
      state.isLoginLoading = true;
    });
    //we don't use login.fulfilled
    //because isLoginLoading true after fetchUser action fulfilled
    builder.addCase(login.rejected, (state, action: PayloadAction<any>) => {
      state.isLoginLoading = false;
      Toast.show({
        type: "error",
        text1: "Error",
        text2: action.payload,
        visibilityTime: 2000,
      });
    });
    builder.addCase(
      fetchUser.fulfilled,
      (state, action: PayloadAction<User | undefined>) => {
        if (action.payload) {
          state.user = action.payload;
        }
        state.isLoginLoading = false;
      }
    );
    builder.addCase(fetchUser.rejected, (state, action: PayloadAction<any>) => {
      alert(action.payload);
      state.isLoginLoading = false;
    });

    builder.addCase(signUp.pending, (state) => {
      state.isCreatingUserLoading = true;
    });
    builder.addCase(signUp.fulfilled, (state) => {
      state.isCreatingUserLoading = false;
    });
    builder.addCase(signUp.rejected, (state, action: PayloadAction<any>) => {
      state.isCreatingUserLoading = false;
      alert(action.payload);
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
    });
    builder.addCase(logout.rejected, (state, action: PayloadAction<any>) => {
      alert(action.payload);
    });
  },
});

export const { setIsInitialized, setIsCreatingUser } = authSlice.actions;
