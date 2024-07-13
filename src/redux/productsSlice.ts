import { db } from "@/firebase/firebaseConfig";
import {
  addNewProductToFirebase,
  deleteProductFromFirebase,
  loadImage,
  updateProductToFirebase,
} from "@/firebase/firebaseService";
import { Product } from "@/types/type";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (
    {
      numberOfResult,
      offset,
    }: {
      numberOfResult: number;
      offset: number;
    },
    thunkAPI
  ) => {
    try {
      //todo: implement lazy loading later
      const productRef = collection(db, "products");

      const q = query(
        productRef,
        orderBy("createdAt", "desc")
        // startAt(offset),
        // limit(numberOfResult)
      );

      const documentSnapshots = await getDocs(q);
      const products = documentSnapshots.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt.toDate().toISOString(),
          updatedAt: doc.data().updatedAt.toDate().toISOString(),
        } as Product;
      });

      return products;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addProduct = createAsyncThunk(
  "products/addNewProduct",
  async (product: Product, thunkAPI) => {
    try {
      await addNewProductToFirebase(product);

      return product;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (product: Product, thunkAPI) => {
    try {
      await updateProductToFirebase(product);
      return product;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id: string, thunkAPI) => {
    try {
      await deleteProductFromFirebase(id);

      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

type ProductState = {
  products: Product[];
  isFetchingLoading: boolean;
  isFirstFetchingLoading: boolean;
  isUploadingLoading: boolean;
  isUpdatingLoading: boolean;
};

export const productsSlice = createSlice({
  name: "products",

  initialState: {
    products: [],
    isFetchingLoading: false,
    isFirstFetchingLoading: true,
    isUploadingLoading: false,
    isUpdatingLoading: false,
  } as ProductState,

  reducers: {
    setImage: (
      state,
      action: PayloadAction<{ id: string; image: string | null | undefined }>
    ) => {
      const product = state.products.find(
        (product) => product.id === action.payload.id
      );
      if (product) {
        product.image = action.payload.image;
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(
      deleteProduct.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
      }
    );
    builder.addCase(updateProduct.pending, (state) => {
      state.isUpdatingLoading = true;
    });

    builder.addCase(
      updateProduct.fulfilled,
      (state, action: PayloadAction<Product>) => {
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        state.products[index] = action.payload;
        state.isUpdatingLoading = false;
      }
    );

    builder.addCase(updateProduct.rejected, (state, action) => {
      state.isUpdatingLoading = false;
      alert(action.payload);
    });

    builder.addCase(addProduct.pending, (state) => {
      state.isUploadingLoading = true;
    });

    builder.addCase(
      addProduct.fulfilled,
      (state, action: PayloadAction<Product>) => {
        state.products = [action.payload, ...state.products];
        state.isUploadingLoading = false;
      }
    );

    builder.addCase(addProduct.rejected, (state, action) => {
      state.isUploadingLoading = false;
      alert(action.payload);
    });

    builder.addCase(fetchProducts.pending, (state) => {
      state.isFetchingLoading = true;
    });

    builder.addCase(
      fetchProducts.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        state.products = action.payload;
        state.isFirstFetchingLoading = false;
        state.isFetchingLoading = false;
      }
    );

    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.isFetchingLoading = false;
      alert(action.payload);
    });
  },
});

export const { setImage } = productsSlice.actions;
