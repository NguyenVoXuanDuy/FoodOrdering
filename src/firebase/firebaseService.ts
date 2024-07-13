import { db, storage } from "@/firebase/firebaseConfig";
import { Order, OrderStatus, Product } from "@/types/type";
import products from "@assets/data/products";
import { randomUUID } from "expo-crypto";
import {
  doc,
  setDoc,
  serverTimestamp,
  Timestamp,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

// this function is used only once to upload all "hardcode" products to the FireBase database
export async function uploadAllProducts(): Promise<void> {
  for (const product of products) {
    await uploadProduct(product);
  }
}
// this function is used only once to upload all "hardcode" products to the FireBase database
async function uploadProduct(product: any): Promise<void> {
  try {
    if (product.image) {
      const imageUrl = product.image;
      const imageFilename = `products/${product.id}.png`;
      console.log("imageFilename: ", imageFilename);
      const imageResponse = await fetch(imageUrl);
      console.log("imageResponse: ", imageResponse);
      const imageBlob = await imageResponse.blob();
      console.log("imageBlob: ", imageBlob);
      const imageRef = ref(storage, imageFilename);

      await uploadBytes(imageRef, imageBlob).then((snapshot) => {
        console.log("Uploaded an array!");
      });
      product.image = await getDownloadURL(imageRef);
      console.log("product.image: ", product.image);
    }

    await setDoc(doc(db, "products", product.id), {
      ...product,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    console.log(`Product "${product.name}" uploaded successfully!`);
  } catch (error) {
    console.error(`${error}`);
    alert(`${error}`);
  }
}

// service
export const addNewProductToFirebase = async (product: Product) => {
  product.id = randomUUID();

  try {
    if (product.image) {
      const imageUrl = product.image;
      const imageFilename = `products/${product.id}.png`;
      const imageResponse = await fetch(imageUrl);
      const imageBlob = await imageResponse.blob();
      const imageRef = ref(storage, imageFilename);

      await uploadBytes(imageRef, imageBlob).then((snapshot) => {});
      console.log("start getDownloadURL(imageRef)");
      product.image = await getDownloadURL(imageRef);
      console.log("after upload product.image: ", product.image);
    }
    console.log("start setDoc");
    await setDoc(doc(db, "products", product.id), {
      ...product,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    console.log("end setDoc");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateProductToFirebase = async (product: Product) => {
  try {
    // if image is not a URL, it means it is a local file
    // so we need to update the image in the storage
    // and get the new URL
    if (product.id === "-1") {
      alert("Product ID is not valid for some reason!");
      return;
    }

    if (product.image && !product.image.startsWith("http")) {
      const imageUrl = product.image;
      const imageFilename = `products/${product.id}.png`;
      const imageResponse = await fetch(imageUrl);
      const imageBlob = await imageResponse.blob();
      const imageRef = ref(storage, imageFilename);

      await uploadBytes(imageRef, imageBlob).then((snapshot) => {});
      product.image = await getDownloadURL(imageRef);
    }
    await updateDoc(doc(db, "products", product.id), {
      ...product,
      createdAt: Timestamp.fromDate(new Date(product.createdAt)),
      updatedAt: serverTimestamp(),
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteProductFromFirebase = async (productId: string) => {
  try {
    await deleteDoc(doc(db, "products", productId));
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const saveOrderToFirebase = async (order: Order) => {
  order.id = Math.floor(Math.random() * 100000000000).toString();
  try {
    await setDoc(doc(db, `orders`, order.id), {
      ...order,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateOrderStatusToFirebase = async (
  orderId: string,
  status: OrderStatus
) => {
  try {
    await updateDoc(doc(db, "orders", orderId), {
      status: status,
      updatedAt: serverTimestamp(),
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const loadImage = async (imageUrl: string | null | undefined) => {
  if (!imageUrl) return null;
  try {
    const response = await fetch(imageUrl);
    const data = await response.blob();
    const imageUri = URL.createObjectURL(data);
    return imageUri;
  } catch (error: any) {
    alert(error.message);
  }
};
