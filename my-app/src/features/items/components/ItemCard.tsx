import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Chip, Box } from "@mui/material";
import { ItemResponse } from "../../../lib/api_client";

type Props = {
  item: ItemResponse;
};

export const ItemCard = ({ item }: Props) => {
  const isSoldOut = item.status === "sold_out";
  const imageUrl = item.images?.[0]?.image_url;
  const imageSource = imageUrl ?? "https://placehold.co/300x200?text=No+Image";

  return (
    <Card
      sx={{
        maxWidth: 345,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <CardActionArea
        component={RouterLink}
        to={`/items/${item.id}`}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Box sx={{ position: "relative", width: "100%" }}>
          <CardMedia
            component="img"
            height="180"
            image={imageSource}
            alt={item.title || "商品画像"}
            sx={{
              objectFit: "cover",
              filter: isSoldOut ? "grayscale(100%)" : "none",
            }}
          />

          {isSoldOut && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                bgcolor: "rgba(255, 0, 0, 0.7)",
                color: "white",
                px: 1,
                py: 0.5,
                borderBottomRightRadius: 4,
                fontWeight: "bold",
                zIndex: 1,
              }}
            >
              SOLD OUT
            </Box>
          )}
        </Box>

        <CardContent sx={{ flexGrow: 1, width: "100%", pt: 1, pb: 1 }}>
          <Typography
            gutterBottom
            variant="body1"
            component="div"
            sx={{
              fontWeight: "bold",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              height: "3em",
              lineHeight: "1.5em",
            }}
          >
            {item.title}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 1,
            }}
          >
            <Typography variant="h6" color="error" fontWeight="bold">
              ¥{item.price?.toLocaleString() ?? 0}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
