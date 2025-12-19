import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import { useUserProfile } from "../features/auth/hooks/useUserProfile";
import { UserProfileCard } from "../features/auth/components/UserProfileCard";
import { MenuLink } from "../features/auth/components/MenuLink";

export const MyPage = () => {
  const { username } = useUserProfile();

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        マイページ
      </Typography>

      <UserProfileCard username={username} />

      <Stack spacing={2}>
        <Link to="/mypage/purchased">
          <MenuLink label="購入した商品" />
        </Link>
        <MenuLink label="出品した商品" />
      </Stack>
    </Container>
  );
};
