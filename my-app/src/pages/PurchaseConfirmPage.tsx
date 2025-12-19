import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Stack,
  Divider,
  CircularProgress,
} from "@mui/material";

// 作成済みのカスタムフックをインポート
import { useItemDetail } from "../features/items/hooks/useItemDetail";
export const PurchaseConfirmPage = () => {
  const { id } = useParams();
  const { item, purchase, loading } = useItemDetail(id); // 同じフックを使う
  const navigate = useNavigate();

  if (loading) {
    return <CircularProgress />;
  }

  const handleFinalSubmit = async () => {
    const success = await purchase(); // ここで「実行」！
    if (success) {
      navigate("/purchase/success"); // 成功したら完了画面へ
    }
  };

  return (
    <Box>
      {/* 商品の最終確認UIを表示 */}
      <Typography>{item?.title} を購入しますか？</Typography>
      <Button onClick={handleFinalSubmit}>購入を確定する</Button>
    </Box>
  );
};
