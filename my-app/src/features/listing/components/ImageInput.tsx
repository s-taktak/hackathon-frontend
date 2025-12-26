import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";

interface ImageInputProps {
  images: string[];
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: (index: number) => void;
}

export const ImageInput = ({ images, onUpload, onRemove }: ImageInputProps) => {
  return (
    <Box>
      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        出品画像
        <Typography
          component="span"
          color="error"
          sx={{ ml: 1, fontSize: "0.8rem" }}
        >
          必須
        </Typography>
      </Typography>
      <Typography
        variant="caption"
        color="text.secondary"
        display="block"
        sx={{ mb: 2 }}
      >
        最大10枚までアップロードできます
      </Typography>

      <Grid container spacing={2}>
        {images.map((img, index) => (
          <Grid size={{ xs: 4, sm: 3, md: 2 }} key={index}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                paddingTop: "100%",
              }}
            >
              <img
                src={img}
                alt="preview"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <IconButton
                size="small"
                onClick={() => onRemove(index)}
                sx={{
                  position: "absolute",
                  top: -8,
                  right: -8,
                  bgcolor: "rgba(0,0,0,0.5)",
                  color: "white",
                  "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          </Grid>
        ))}

        <Grid size={{ xs: 4, sm: 3, md: 2 }}>
          <Button
            component="label"
            variant="outlined"
            sx={{
              width: "100%",
              height: 0,
              paddingTop: "100%",
              position: "relative",
              bgcolor: "#fafafa",
              borderStyle: "dashed",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "text.secondary",
              }}
            >
              <CloudUploadIcon />
              <Typography variant="caption" sx={{ mt: 1 }}>
                画像を追加
              </Typography>
            </Box>
            <input type="file" hidden accept="image/*" onChange={onUpload} />
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
