import "@fontsource/public-sans";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import MainLayout from "./layouts/MainLayout";
import App from "./pages/Home";
import QuizPage from "./pages/Quiz";
import ResultPage from "./pages/Result";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} />
      <Route path="quiz" element={<QuizPage />} />
      <Route path="result" element={<ResultPage />} />
      {/* ... etc. */}
    </>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MainLayout>
      <RouterProvider router={router} />
    </MainLayout>
  </React.StrictMode>
);
