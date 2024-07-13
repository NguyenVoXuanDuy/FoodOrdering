import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";

const useAuth = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  return {
    isAdmin: user?.isAdmin,
    name: user?.name,
    email: user?.email,
    id: user?.id,
  };
};

export default useAuth;
