import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";

const TextButton = styled(Button)({
  textTransform: "none",
  fontWeight: "bold",
  marginLeft: "8px",
});

export const Header = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const goToSignUp = () => navigate("/signup");
  const goToLogin = () => navigate("/login");

  const handleSearch = () => {
    if (!keyword.trim()) return;
    navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <Box
      sx={{
        p: 2,
        display: { xs: "none", sm: "flex" },
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid #ddd",
        bgcolor: "#fff",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <TextField
        size="small"
        placeholder="何かお探しですか？"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
        sx={{
          flexGrow: 1,
          maxWidth: "600px",
          bgcolor: "#f5f5f5",
          "& .MuiOutlinedInput-root": {
            borderRadius: "20px",
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton onClick={handleSearch} edge="start">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Box sx={{ display: "flex", ml: 2 }}>
        <TextButton variant="contained" onClick={goToLogin} color="primary">
          ログイン
        </TextButton>
        <TextButton variant="contained" onClick={goToSignUp} color="secondary">
          会員登録
        </TextButton>
      </Box>
    </Box>
  );
};
