import { Box, Typography, CircularProgress, Grid } from "@mui/material";
import { ItemCard } from "./ItemCard";
import { useItemRecommend } from "../hooks/useItemRecommend";

interface ItemIdProps {
  item_id: string;
}

export const ItemRecommend = ({ item_id }: ItemIdProps) => {
  const { items, loading } = useItemRecommend(item_id);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (items.length === 0) return null;

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        この商品を見たあなたへのおすすめ
      </Typography>
      <Grid container spacing={2}>
        {items.map((item) => (
          <Grid
            key={item.id}
            size={{
              xs: 6,
              sm: 4,
              md: 3,
            }}
          >
            <ItemCard item={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
