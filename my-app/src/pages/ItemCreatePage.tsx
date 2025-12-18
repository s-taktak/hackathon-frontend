import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import { useItemForm } from "../features/items/hooks/useItemForm";
import { ImageInput } from "../features/items/components/ImageInput";
import { CATEGORIES, CONDITIONS } from "../features/items/constants";

export const ItemCreatePage = () => {
  const navigate = useNavigate();
  const {
    title,
    setTitle,
    description,
    setDescription,
    price,
    setPrice,
    category,
    setCategory,
    condition,
    setCondition,
    previewUrls,
    handleImageUpload,
    handleRemoveImage,
    handleSubmit,
  } = useItemForm();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 4 }}>
        商品の情報を入力
      </Typography>

      <Stack spacing={4}>
        <ImageInput
          images={previewUrls}
          onUpload={handleImageUpload}
          onRemove={handleRemoveImage}
        />

        <Divider />

        <Box>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            商品名
          </Typography>
          <TextField
            fullWidth
            placeholder="商品名（必須 40文字まで）"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 3 }}
          />

          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            商品の説明
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={6}
            placeholder="商品の色、素材、重さ、定価、注意点などを記載しましょう"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Box>

        <Divider />

        <Box>
          <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
            商品の詳細
          </Typography>

          <Stack spacing={3}>
            <Box>
              <Typography variant="body2" fontWeight="bold" gutterBottom>
                カテゴリー
              </Typography>
              <TextField
                select
                fullWidth
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                label="カテゴリーを選択"
              >
                {CATEGORIES.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            <Box>
              <Typography variant="body2" fontWeight="bold" gutterBottom>
                商品の状態
              </Typography>
              <TextField
                select
                fullWidth
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                label="状態を選択"
              >
                {CONDITIONS.map((cond) => (
                  <MenuItem key={cond} value={cond}>
                    {cond}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Stack>
        </Box>

        <Divider />

        <Box>
          <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
            販売価格
          </Typography>
          <TextField
            fullWidth
            type="number"
            placeholder="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">¥</InputAdornment>
                ),
              },
            }}
          />
        </Box>

        <Box sx={{ mt: 4, mb: 8 }}>
          <Button
            variant="contained"
            color="error"
            fullWidth
            size="large"
            onClick={handleSubmit}
            sx={{ fontWeight: "bold", fontSize: "1.1rem", py: 1.5 }}
          >
            出品する
          </Button>
          <Button fullWidth sx={{ mt: 2 }} onClick={() => navigate(-1)}>
            もどる
          </Button>
        </Box>
      </Stack>
    </Container>
  );
};
