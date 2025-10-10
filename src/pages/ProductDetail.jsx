import React from "react";
import { useProductStore } from "../store/useProductStore";
import { Box, Typography } from "@mui/material";
import ProductImage from "../components/ProductImage";
import ProductInfo from "../components/ProductInfo";

const ProductDetail = () => {
    const { products } = useProductStore();

    if (!products || products.length === 0) {
        return (
            <Box sx={{ p: 5, textAlign: "center" }}>
                <Typography variant="h6" color="error">
                    Product not found 😕
                </Typography>
            </Box>
        );
    }

    const product = products[0];
    // debugger

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
            <ProductImage product={product} />
            <ProductInfo product={product} />
        </Box>
    );
};

export default ProductDetail;
