import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";

import "./lib/api_config";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { ItemDetailPage } from "./pages/ItemDetailPage";
import { ItemCreatePage } from "./pages/ItemCreatePage";
import { MyPage } from "./pages/MyPage";
import { SearchPage } from "./pages/SearchPage";
import { PurchaseConfirmPage } from "./pages/PurchaseConfirmPage";
import { PurchaseSuccessPage } from "./pages/PurchaseSuccessPage";
import { PurchasedItemsPage } from "./pages/PurchasedItemsPage";
import { ProtectedRoute } from "./ProtectedRoute";
import FooterMenu from "./components/FooterMenu";

function App() {
  return (
    <BrowserRouter>
      <Box sx={{ pb: { xs: 8, sm: 0 } }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/items/:id" element={<ItemDetailPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/sell" element={<ItemCreatePage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/mypage/purchased" element={<PurchasedItemsPage />} />
          </Route>
          <Route path="/search" element={<SearchPage />} />
          <Route path="/purchase/:id" element={<PurchaseConfirmPage />} />
          <Route path="/purchase/success" element={<PurchaseSuccessPage />} />
          <Route path="*" element={<Box p={4}>Page Not Found</Box>} />
        </Routes>
      </Box>
      <FooterMenu />
    </BrowserRouter>
  );
}

export default App;
