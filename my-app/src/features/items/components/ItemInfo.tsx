import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ItemResponse } from "../../../lib/api_client";
import { ItemRecommend } from "./ItemRecommend";

interface ItemInfoProps {
  item: ItemResponse;
  isSoldOut: boolean;
  onPurchase: () => void;
}

export const ItemInfo = ({ item, isSoldOut, onPurchase }: ItemInfoProps) => {
  return (
    <Stack spacing={2}>
      <Typography variant="h5" component="h1" fontWeight="bold">
        {item.title}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        {item.brand?.name ?? "ノーブランド"}
        {" | "}
        {item.category?.name ?? "カテゴリーなし"}
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4" color="error" fontWeight="bold">
          ¥{(item.price ?? 0).toLocaleString()}
        </Typography>
        <Box>
          <IconButton aria-label="お気に入りに追加">
            <FavoriteBorderIcon />
          </IconButton>
          <IconButton aria-label="共有">
            <ShareIcon />
          </IconButton>
        </Box>
      </Box>

      <Button
        variant="contained"
        color="error"
        size="large"
        fullWidth
        disabled={isSoldOut}
        onClick={onPurchase}
        sx={{ py: 1.5, fontSize: "1.2rem", fontWeight: "bold" }}
      >
        {isSoldOut ? "売り切れ" : "購入手続きへ"}
      </Button>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom>
        商品の説明
      </Typography>
      <Typography variant="body1" sx={{ whiteSpace: "pre-line", mb: 4 }}>
        {item.description}
      </Typography>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="subtitle2" gutterBottom fontWeight="bold">
          商品の情報
        </Typography>
        <Grid container spacing={1}>
          <Grid size={{ xs: 4 }}>
            <Typography variant="body2" color="text.secondary">
              カテゴリー
            </Typography>
          </Grid>
          <Grid size={{ xs: 8 }}>
            <Typography variant="body2">
              {item.category?.name ?? "-"}
            </Typography>
          </Grid>

          <Grid size={{ xs: 4 }}>
            <Typography variant="body2" color="text.secondary">
              商品の状態
            </Typography>
          </Grid>
          <Grid size={{ xs: 8 }}>
            <Typography variant="body2">
              {item.condition?.name ?? "-"}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar sx={{ bgcolor: "grey.200", color: "grey.600" }}>
            <AccountCircleIcon />
          </Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {item.seller.username}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              出品者
            </Typography>
          </Box>
        </Box>
      </Paper>

      <ItemRecommend item_id={item.id} />
    </Stack>
  );
};
