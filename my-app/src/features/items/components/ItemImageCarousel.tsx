import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Carousel from "react-material-ui-carousel";

interface ItemImageCarouselProps {
  images: { image_url: string }[];
}

export const ItemImageCarousel = ({ images }: ItemImageCarouselProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: { xs: 300, sm: 400 },
        bgcolor: "grey.100",
        borderRadius: 2,
        overflow: "hidden",
        mb: 2,
        position: "relative",
      }}
    >
      <Carousel
        autoPlay={false}
        animation="slide"
        indicators={true}
        navButtonsAlwaysVisible={images.length > 1}
        cycleNavigation={true}
        navButtonsProps={{
          style: {
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            borderRadius: "50%",
          },
        }}
        indicatorContainerProps={{
          style: {
            marginTop: "-30px",
            position: "relative",
            zIndex: 1,
          },
        }}
        activeIndicatorIconButtonProps={{
          style: { color: "#fff" },
        }}
        sx={{ height: "100%" }}
      >
        {images && images.length > 0 ? (
          images.map((imgObj, index) => (
            <Box
              key={index}
              sx={{
                height: { xs: 300, sm: 400 },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "#fff",
              }}
            >
              <img
                src={imgObj.image_url}
                alt={`商品画像-${index}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </Box>
          ))
        ) : (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography color="text.secondary">NO IMAGE</Typography>
          </Box>
        )}
      </Carousel>
    </Box>
  );
};
