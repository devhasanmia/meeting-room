import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.ts";
import { Toaster } from "sonner";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router.tsx";
import { PersistGate } from "redux-persist/integration/react";
import { Suspense } from "react";
import { Spin } from "antd";
createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Suspense
        fallback={
          <div className="h-screen w-full m-auto flex justify-center items-center">
            <Spin size="large"  />
          </div>
        }
      >
        <RouterProvider router={router} />
      </Suspense>
    </PersistGate>
    <Toaster richColors duration={2000} />
  </Provider>
);
