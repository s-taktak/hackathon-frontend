import {
  Box,
  Typography,
  Container,
  CircularProgress,
  Grid,
} from "@mui/material";
import { ItemCard } from "../features/items/components/ItemCard";
import { useItems } from "../features/items/hooks/useItems";
import { Header } from "../components/Header";

export const HomePage = () => {
  const { items, loading } = useItems();

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          おすすめの商品
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
            <CircularProgress />
          </Box>
        ) : (
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
        )}

        {!loading && items.length === 0 && (
          <Typography variant="body1" textAlign="center" sx={{ py: 10 }}>
            表示できる商品がありません
          </Typography>
        )}
      </Container>
    </>
  );
};
