import React from "react";
import { Card, CardMedia } from "@mui/material";

const ProductImage = (product) => {

    console.log(product?.product)

    return (
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
                image={product?.product?.images?.front || "https://via.placeholder.com/400x400?text=No+Image"}
                alt={product?.product?.name || "No image found"}
                sx={{
                    objectFit: "contain",
                    width: "100%",
                    height: "100%",
                }}
            />
        </Card>
    );
};

export default ProductImage;
