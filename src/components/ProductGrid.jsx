import React from "react";
import { Box, Card, Skeleton, CardContent } from "@mui/material";
import ProductCard from "./ProductCard";

const ProductGrid = ({ loading, filteredProducts, handleProductClick, handleAddToCart }) => (
    <Box
        sx={{
            display: "grid",
            gridTemplateColumns: { xs: "repeat(1, 1fr)", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
            gap: 2,
            mt: 2,
        }}
    >
        {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <Card key={i} sx={{ height: 400, display: "flex", flexDirection: "column" }}>
                    <Skeleton variant="rectangular" height={180} />
                    <CardContent sx={{ flexGrow: 1 }}>
                        <Skeleton height={25} sx={{ mb: 1 }} />
                        <Skeleton height={20} sx={{ mb: 0.5 }} />
                        <Skeleton height={20} sx={{ mb: 0.5 }} />
                        <Skeleton height={25} sx={{ mt: "auto" }} />
                    </CardContent>
                </Card>
            ))
            : filteredProducts.map((product) => (
                <ProductCard
                    key={product.id || product.gtin || product.sku_code}
                    product={product}
                    handleProductClick={handleProductClick}
                    handleAddToCart={handleAddToCart}
                />
            ))}
    </Box>
);

export default ProductGrid;
