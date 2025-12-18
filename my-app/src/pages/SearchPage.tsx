import {
  Box,
  Typography,
  Container,
  CircularProgress,
  Grid,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { Header } from "../components/Header";
import { ItemCard } from "../features/items/components/ItemCard";
import { useSearchedItems } from "../features/items/hooks/useSearchedItems";

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const { items, loading } = useSearchedItems(keyword);

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
          "{keyword}" の検索結果
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {items.length > 0 ? (
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
            ) : (
              <Box sx={{ textAlign: "center", py: 10 }}>
                <Typography variant="body1" color="text.secondary">
                  一致する商品が見つかりませんでした。
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  キーワードを変えて再度検索してみてください。
                </Typography>
              </Box>
            )}
          </>
        )}
      </Container>
    </>
  );
};
