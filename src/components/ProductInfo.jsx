import React from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Divider,
    Button,
    Chip,
} from "@mui/material";

const ProductInfo = ({ product }) => {
    if (!product) return null;

    return (
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
                    {product.name}
                </Typography>

                <Divider sx={{ my: 2 }} />

                {/* Category */}
                <Typography
                    variant="body1"
                    sx={{ mb: 1, textAlign: "center", color: "text.secondary" }}
                >
                    <b>Category:</b> {product.main_category ?? "N/A"}
                </Typography>

                {/* Price */}
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
                        sx={{ fontWeight: "bold", color: "#008040" }}
                    >
                        ₹{product.mrp?.mrp ?? "N/A"}
                    </Typography>

                    {product.compare_price && (
                        <Typography
                            variant="body1"
                            sx={{ textDecoration: "line-through", color: "gray" }}
                        >
                            ₹{product.compare_price}
                        </Typography>
                    )}
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Other Info */}
                <Typography variant="body1" sx={{ mb: 1 }}>
                    <b>Packaging Type:</b> {product.packaging_type ?? "N/A"}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                    <b>Country of Origin:</b> {product.country_of_origin ?? "Not specified"}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                    <b>HS Code:</b> {product.hs_code ?? "N/A"}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                    <b>Tax:</b> IGST {product.igst ?? 0}% | CGST {product.cgst ?? 0}% | SGST {product.sgst ?? 0}%
                </Typography>

                {product.description && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        {product.description}
                    </Typography>
                )}

                {/* Tags */}
                <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mb: 3 }}>
                    {product.isLocalProduct === "Yes" && <Chip label="Local Product" color="success" />}
                    {product.marketPlaceSellable && <Chip label="Marketplace" color="primary" />}
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
    );
};

export default ProductInfo;
