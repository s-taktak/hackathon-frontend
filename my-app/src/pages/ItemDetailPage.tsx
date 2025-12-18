import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

import { useItemDetail } from "../features/items/hooks/useItemDetail";
import { ItemImageCarousel } from "../features/items/components/ItemImageCarousel";
import { ItemInfo } from "../features/items/components/ItemInfo";
import { CommentSection } from "../features/items/components/CommentSection";

export const ItemDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { item, loading, purchase, isSoldOut } = useItemDetail(id);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <CircularProgress color="error" />
      </Box>
    );
  }

  if (!item) {
    return (
      <Container sx={{ py: 10, textAlign: "center" }}>
        <Typography variant="h6" color="text.secondary">
          商品が見つかりませんでした。
        </Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ bgcolor: "grey.50", minHeight: "100vh", py: { xs: 2, md: 5 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* 左カラム：メディア & 詳細説明 */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Stack spacing={3}>
              <Paper elevation={0} sx={{ borderRadius: 2, overflow: "hidden" }}>
                <ItemImageCarousel images={item.images ?? []} />
              </Paper>

              <Box sx={{ display: { xs: "none", md: "block" } }}>
                <CommentSection itemId={id || ""} sellerId={item.seller?.id} />
              </Box>
            </Stack>
          </Grid>

          {/* 右カラム：購入アクション（スクロール追従） */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ position: { md: "sticky" }, top: 100 }}>
              <Paper
                variant="outlined"
                sx={{ p: 3, borderRadius: 2, bgcolor: "background.paper" }}
              >
                <ItemInfo
                  item={item}
                  isSoldOut={isSoldOut}
                  onPurchase={purchase}
                />
              </Paper>
            </Box>
          </Grid>

          <Grid size={{ xs: 12 }} sx={{ display: { xs: "block", md: "none" } }}>
            <CommentSection itemId={id || ""} sellerId={item.seller?.id} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
