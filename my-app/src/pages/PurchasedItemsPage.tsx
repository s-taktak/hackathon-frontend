import {
  Box,
  Typography,
  Stack,
  CircularProgress,
  Container,
  IconButton,
  Divider,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { ItemCard } from "../features/items/components/ItemCard";
import { usePurchasedItems } from "../features/items/hooks/usePurchasedItems";
export const PurchasedItemsPage = () => {
  const { items, loading } = usePurchasedItems();
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* ヘッダーエリア */}
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" fontWeight="bold">
          購入した商品
        </Typography>
      </Stack>

      <Divider sx={{ mb: 4 }} />

      {/* コンテンツエリア */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
          <CircularProgress color="error" />
        </Box>
      ) : items.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 10 }}>
          <Typography color="text.secondary" variant="body1">
            購入した商品はまだありません。
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
            gap: 2,
          }}
        >
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </Box>
      )}
    </Container>
  );
};
