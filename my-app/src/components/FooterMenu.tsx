import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import PersonIcon from "@mui/icons-material/Person";

const RED = "#EA352D";

function FooterMenu() {
  const navigate = useNavigate();
  const location = useLocation();

  const getValue = () => {
    const path = location.pathname;
    if (path === "/") return 0;
    if (path === "/aiSearch") return 1;
    if (path === "/sell") return 2;
    if (path === "/mypage") return 3;
    return 4;
  };

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        borderTop: "1px solid #e0e0e0",
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={getValue()}
        onChange={(event, newValue) => {
          if (newValue === getValue()) return;

          switch (newValue) {
            case 0:
              navigate("/");
              break;
            case 1:
              navigate("/aiSearch");
              break;
            case 2:
              navigate("/sell");
              break;
            case 3:
              navigate("/mypage");
              break;
          }
        }}
        sx={{
          "& .Mui-selected": {
            color: `${RED} !important`,
          },
          "& .Mui-selected .MuiBottomNavigationAction-label": {
            fontSize: "12px",
          },
        }}
      >
        <BottomNavigationAction label="ホーム" icon={<HomeIcon />} />
        <BottomNavigationAction label="AI検索" icon={<SearchIcon />} />
        <BottomNavigationAction label="出品" icon={<CameraAltIcon />} />
        <BottomNavigationAction label="マイページ" icon={<PersonIcon />} />
      </BottomNavigation>
    </Paper>
  );
}

export default FooterMenu;
