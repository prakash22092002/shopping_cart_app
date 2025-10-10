import React from "react";
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    Button,
} from "@mui/material";

const ProductCard = ({ product, handleProductClick, handleAddToCart }) => {
    const getImage = (p) => p.images?.front || "/placeholder-image.png";
    const getCategory = (p) =>
        p.category_level_2 || p.category_level_1 || p.main_category || "Uncategorized";
    const getPrice = (p) => p.mrp?.mrp || "0";

    return (
        <Card
            sx={{
                height: 400,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                cursor: "pointer",
                transition: "all 0.3s ease",
                borderRadius: 3,
                border: "2px solid #d4e8c1",
                backgroundColor: "#fcffe8",
                boxShadow: "0 3px 10px rgba(0, 128, 64, 0.1)",
                "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 12px 28px rgba(0, 128, 64, 0.2)",
                    borderColor: "#9fc880",
                    backgroundColor: "#fffef0",
                },
            }}
            onClick={() => handleProductClick(product)}
        >
            <CardMedia
                component="img"
                image={getImage(product)}
                alt={product.name}
                sx={{
                    height: 180,
                    objectFit: "contain",
                    backgroundColor: "#f0f4e8",
                    borderBottom: "2px solid #d4e8c1",
                }}
            />
            <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", p: 2.5 }}>
                <Typography
                    sx={{
                        mb: 2,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "green",
                        minHeight: "2.8em",
                    }}
                >
                    {product.name}
                </Typography>

                <Typography
                    variant="body2"
                    sx={{
                        mb: 0.5,
                        color: "#5a7a3d",
                        fontSize: "0.875rem",
                        backgroundColor: "#e8f5d8",
                        padding: "4px 8px",
                        borderRadius: 1,
                        display: "inline-block",
                        alignSelf: "flex-start",
                    }}
                >
                    <strong style={{ color: "#3d5a25" }}>Category:</strong> {getCategory(product)}
                </Typography>

                <Box
                    sx={{
                        mt: "auto",
                        pt: 2,
                        borderTop: "2px solid #d4e8c1",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold", color: "#008040", fontSize: "1.35rem" }}
                    >
                        ₹ {getPrice(product)}
                    </Typography>

                    <Button
                        variant="contained"
                        size="small"
                        sx={{ backgroundColor: "green", "&:hover": { backgroundColor: "darkgreen" } }}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(product);
                        }}
                    >
                        Add Cart
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
