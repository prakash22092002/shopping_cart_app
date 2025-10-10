import React from "react";
import { useParams } from "react-router-dom";
import { useProductStore } from "../store/useProductStore";
import {
    Box,
    Typography,
    Card,
    CardMedia,
    CardContent,
    Divider,
    Button,
    Chip,
} from "@mui/material";

const ProductDetail = () => {
    const { id } = useParams();
    const { products } = useProductStore();

    // const product = products.find((p) => p.id === id);

    if (!products) {
        return (
            <Box sx={{ p: 5, textAlign: "center" }}>
                <Typography variant="h6" color="error">
                    Product not found 😕
                </Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                maxWidth: "900px",
                mx: "auto",
                my: 6,
                px: { xs: 2, sm: 4 },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            {/* Product Image */}
            <Card
                sx={{
                    width: "100%",
                    borderRadius: 4,
                    boxShadow: 3,
                    mb: 4,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: { xs: 300, md: 400 },
                    p: 2,
                }}
            >
                <CardMedia
                    component="img"
                    image={
                        products?.[0]?.images?.front ||
                        "https://via.placeholder.com/400x400?text=No+Image"
                    }
                    alt={products?.[0]?.name ?? "No image found"}
                    sx={{
                        objectFit: "contain",
                        width: "100%",
                        height: "100%",
                    }}
                />
            </Card>

            {/* Product Info */}
            <Card
                sx={{
                    width: "100%",
                    borderRadius: 4,
                    boxShadow: 3,
                    p: { xs: 2, sm: 4 },
                }}
            >
                <CardContent>
                    {/* Product Name */}
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: "bold",
                            color: "#008040",
                            mb: 2,
                            textAlign: "center",
                        }}
                    >
                        {products?.[0]?.name ?? ""}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    {/* Category */}
                    <Typography
                        variant="body1"
                        sx={{ mb: 1, textAlign: "center", color: "text.secondary" }}
                    >
                        <b>Category:</b> {products?.[0]?.main_category ?? "N/A"}
                    </Typography>

                    {/* Price Section */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "baseline",
                            mb: 2,
                            gap: 1,
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: "bold",
                                color: "#008040",
                            }}
                        >
                            ₹{products?.[0]?.mrp?.mrp ?? "N/A"}
                        </Typography>

                        {products?.[0]?.compare_price && (
                            <Typography
                                variant="body1"
                                sx={{
                                    textDecoration: "line-through",
                                    color: "gray",
                                }}
                            >
                                ₹{products?.[0]?.compare_price ?? "0"}
                            </Typography>
                        )}
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {/* Other Info */}
                    <Typography variant="body1" sx={{ mb: 1 }}>
                        <b>Packaging Type:</b> {products?.[0]?.packaging_type ?? "N/A"}
                    </Typography>

                    <Typography variant="body1" sx={{ mb: 1 }}>
                        <b>Country of Origin:</b>{" "}
                        {products?.[0]?.country_of_origin ?? "Not specified"}
                    </Typography>

                    <Typography variant="body1" sx={{ mb: 1 }}>
                        <b>HS Code:</b> {products?.[0]?.hs_code ?? "N/A"}
                    </Typography>

                    <Typography variant="body2" sx={{ mb: 2 }}>
                        <b>Tax:</b> IGST {products?.[0]?.igst ?? 0}% | CGST {products?.[0]?.cgst ?? 0}% | SGST{" "}
                        {products?.[0]?.sgst ?? 0}%
                    </Typography>

                    {products?.[0]?.description && (
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            {products?.[0]?.description}
                        </Typography>
                    )}

                    {/* Tags */}
                    <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mb: 3 }}>
                        {products?.[0]?.isLocalProduct === "Yes" && (
                            <Chip label="Local Product" color="success" />
                        )}
                        {products?.[0]?.marketPlaceSellable && (
                            <Chip label="Marketplace" color="primary" />
                        )}
                    </Box>

                    {/* Add to Cart */}
                    <Box sx={{ textAlign: "center" }}>
                        <Button
                            variant="contained"
                            color="success"
                            sx={{ borderRadius: 2, px: 5, fontSize: "1rem" }}
                        >
                            Add to Cart
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default ProductDetail;
