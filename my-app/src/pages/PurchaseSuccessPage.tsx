import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Stack,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate } from "react-router-dom";

export const PurchaseSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 4, md: 10 } }}>
      <Paper
        elevation={0}
        sx={{
          p: 5,
          textAlign: "center",
          borderRadius: 4,
          border: "1px solid",
          borderColor: "grey.200",
        }}
      >
        <CheckCircleOutlineIcon
          sx={{ fontSize: 80, color: "success.main", mb: 2 }}
        />

        <Typography variant="h5" fontWeight="bold" gutterBottom>
          購入が完了しました！
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          お買い上げありがとうございます。
          <br />
          出品者からの発送通知をお待ちください。
        </Typography>

        <Stack spacing={2}>
          <Button
            variant="contained"
            color="error"
            fullWidth
            size="large"
            onClick={() => navigate("/")}
            sx={{ fontWeight: "bold", py: 1.5 }}
          >
            ホームに戻る
          </Button>

          <Button
            variant="outlined"
            fullWidth
            size="large"
            onClick={() => navigate("/mypage")}
            sx={{ fontWeight: "bold", py: 1.5 }}
          >
            購入した商品を確認する
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};
