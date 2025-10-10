import React from "react";
import {
    Box,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    IconButton,
    Badge,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const ProductFilters = ({
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    sortOrder,
    setSortOrder,
    categories,
    myCart,
}) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                alignItems: { xs: "flex-start", sm: "center" },
                p: 2,
            }}
        >
            <TextField
                label="Search by name"
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ minWidth: 200 }}
            />

            <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Category</InputLabel>
                <Select
                    label="Category"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                >
                    <MenuItem value="">DEFAULT</MenuItem>
                    {categories.map((c) => (
                        <MenuItem key={c} value={c}>
                            {c}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Sort by Price</InputLabel>
                <Select
                    label="Sort by Price"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <MenuItem value="">Default</MenuItem>
                    <MenuItem value="asc">Low to High</MenuItem>
                    <MenuItem value="desc">High to Low</MenuItem>
                </Select>
            </FormControl>

            <IconButton>
                <Badge badgeContent={myCart.length} color="success">
                    <ShoppingCartIcon sx={{ color: "#008040" }} />
                </Badge>
            </IconButton>
        </Box>
    );
};

export default ProductFilters;
