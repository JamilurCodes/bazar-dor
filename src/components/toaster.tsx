"use client";
import { Toaster } from "react-hot-toast";
export default function AppToaster() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3500,
        style: {
          borderRadius: 14,
          background: "#183d2b",
          color: "#fff",
          padding: "13px 17px",
          fontSize: 14,
        },
      }}
    />
  );
}
