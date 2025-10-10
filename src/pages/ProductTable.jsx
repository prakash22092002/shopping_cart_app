import React, { useEffect, useState, useMemo } from "react";
import { Box, Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useProductStore } from "../store/useProductStore";
import createCartStore from "../store/useCartStore";
import { TableContainer } from "../styles/ProductTable.styles";
import Navbar from "../components/Navbar";
import ProductFilters from "../components/ProductFilters";
import FilterDrawer from "../components/FilterDrawer";
import ProductGrid from "../components/ProductGrid";
import SnackbarAlert from "../components/SnackbarAlert";

const ProductTable = () => {
    const navigate = useNavigate();
    const { products, fetchProducts, loading, totalProducts, page, pageSize, setPage, fetchProductById } =
        useProductStore();

    const { myCart, insertIntoCart } = createCartStore();

    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [sortOrder, setSortOrder] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, [page, pageSize]);

    const handleAddToCart = (product) => {
        insertIntoCart(product);
        setSnackbarMessage(`${product.name} added to cart!`);
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => setSnackbarOpen(false);

    const filteredProducts = useMemo(() => {
        let filtered = [...products];
        if (searchTerm)
            filtered = filtered.filter((p) => p.name?.toLowerCase().includes(searchTerm.toLowerCase()));
        if (categoryFilter)
            filtered = filtered.filter(
                (p) =>
                    p.category_level_2 === categoryFilter ||
                    p.category_level_1 === categoryFilter ||
                    p.main_category === categoryFilter
            );
        if (sortOrder === "asc") filtered.sort((a, b) => (a.mrp?.mrp || 0) - (b.mrp?.mrp || 0));
        if (sortOrder === "desc") filtered.sort((a, b) => (b.mrp?.mrp || 0) - (a.mrp?.mrp || 0));
        return filtered;
    }, [products, searchTerm, categoryFilter, sortOrder]);

    const categories = useMemo(() => {
        const setCat = new Set();
        products.forEach((p) => setCat.add(p.main_category || "Uncategorized"));
        return Array.from(setCat).sort();
    }, [products]);

    const handleProductClick = (product) => {
        const productId = product.id || product.gtin || product.sku_code;
        fetchProductById(productId, product);
        navigate(`/product/${productId}`);
    };

    const renderFilterContent = () => (
        <ProductFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            categories={categories}
            myCart={myCart}
        />
    );

    const totalPages = Math.ceil(totalProducts / pageSize);

    return (
        <TableContainer>
            <Navbar loading={loading} renderFilterContent={renderFilterContent} setDrawerOpen={setDrawerOpen} />
            <FilterDrawer
                drawerOpen={drawerOpen}
                setDrawerOpen={setDrawerOpen}
                loading={loading}
                renderFilterContent={renderFilterContent}
            />
            <ProductGrid
                loading={loading}
                filteredProducts={filteredProducts}
                handleProductClick={handleProductClick}
                handleAddToCart={handleAddToCart}
            />
            <SnackbarAlert open={snackbarOpen} message={snackbarMessage} onClose={handleSnackbarClose} />

            {/* PAGEnation */}
            {totalPages > 1 && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                    <Pagination count={totalPages} page={page} onChange={(e, v) => setPage(v)} color="primary" />
                </Box>
            )}
        </TableContainer>
    );
};

export default ProductTable;
