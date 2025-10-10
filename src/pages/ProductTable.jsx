import React, { useEffect, useState, useMemo } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Box,
    Pagination,
    Skeleton,
    Button,
    Snackbar,
    Alert,
    IconButton,
    Badge,
    Drawer,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useProductStore } from "../store/useProductStore";
import createCartStore from "../store/useCartStore";
import { TableContainer, FilterBar, OuterNav } from "../styles/ProductTable.styles";

const ProductTable = () => {
    const navigate = useNavigate();
    const { products, fetchProducts, loading, totalProducts, page, pageSize, setPage } =
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

    const handleSnackbarClose = (event, reason) => {
        if (reason === "clickaway") return;
        setSnackbarOpen(false);
    };

    const filteredProducts = useMemo(() => {
        let filtered = [...products];
        if (searchTerm)
            filtered = filtered.filter((p) =>
                p.name?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        if (categoryFilter)
            filtered = filtered.filter(
                (p) =>
                    p.category_level_2 === categoryFilter ||
                    p.category_level_1 === categoryFilter ||
                    p.main_category === categoryFilter
            );
        if (sortOrder === "asc")
            filtered.sort((a, b) => (a.mrp?.mrp || 0) - (b.mrp?.mrp || 0));
        if (sortOrder === "desc")
            filtered.sort((a, b) => (b.mrp?.mrp || 0) - (a.mrp?.mrp || 0));
        return filtered;
    }, [products, searchTerm, categoryFilter, sortOrder]);

    const categories = useMemo(() => {
        const setCat = new Set();
        products.forEach((p) => {
            const category = p.main_category || "Uncategorized";
            setCat.add(category);
        });
        return Array.from(setCat).sort();
    }, [products]);

    const handleProductClick = (product) => {
        const productId = product.id || product.gtin || product.sku_code;
        navigate(`/product/${productId}`);
    };

    const getImage = (product) => product.images?.front || "/placeholder-image.png";
    const getCategory = (product) =>
        product.category_level_2 ||
        product.category_level_1 ||
        product.main_category ||
        "Uncategorized";
    const getPrice = (product) => product.mrp?.mrp || "0";
    const totalPages = Math.ceil(totalProducts / pageSize);

    const renderFilterContent = () => (
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
                sx={{ minWidth: 200, }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Category</InputLabel>
                <Select
                    label="Category"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                >
                    <MenuItem value="">DEFAULT</MenuItem>
                    {categories.map((category) => (
                        <MenuItem key={category} value={category}>
                            {category}
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

    return (
        <TableContainer>
            {/* Responsive Navbar */}
            <OuterNav>
                {/* Logo */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                        sx={{
                            fontFamily: "Arial, sans-serif",
                            color: "#008040",
                            fontWeight: "bold",
                            fontSize: "1.4em",
                        }}
                    >
                        SmallBasket
                    </Typography>
                </Box>

                {/* Hamburger for mobile */}
                <Box sx={{ display: { xs: "block", sm: "none" } }}>
                    <IconButton onClick={() => setDrawerOpen(true)}>
                        <MenuIcon sx={{ color: "#008040" }} />
                    </IconButton>
                </Box>

                {/* Desktop Filters */}
                <FilterBar sx={{ display: { xs: "none", sm: "flex" } }}>
                    {loading ? (
                        <>
                            <Skeleton variant="rectangular" width={200} height={40} />
                            <Skeleton variant="rectangular" width={150} height={40} />
                            <Skeleton variant="rectangular" width={150} height={40} />
                        </>
                    ) : (
                        renderFilterContent()
                    )}
                </FilterBar>
            </OuterNav>

            {/* Drawer for mobile filters */}
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                PaperProps={{
                    sx: { width: "80%", p: 2 },
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
                    <IconButton onClick={() => setDrawerOpen(false)} >
                        <CloseIcon />
                    </IconButton>
                </Box>
                {loading ? (
                    <>
                        <Skeleton variant="rectangular" width="100%" height={40} sx={{ mb: 2 }} />
                        <Skeleton variant="rectangular" width="100%" height={40} sx={{ mb: 2 }} />
                        <Skeleton variant="rectangular" width="100%" height={40} />
                    </>
                ) : (
                    renderFilterContent()
                )}
            </Drawer>

            {/* Cards Grid */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "repeat(1, 1fr)",
                        sm: "repeat(2, 1fr)",
                        md: "repeat(4, 1fr)",
                    },
                    gap: 2,
                    mt: 2,
                }}
            >
                {loading
                    ? Array.from({ length: 8 }).map((_, idx) => (
                        <Card
                            key={idx}
                            sx={{
                                height: 400,
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
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
                        <Card
                            key={product.id || product.gtin || product.sku_code}
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
                            <CardContent
                                sx={{
                                    flexGrow: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    p: 2.5,
                                }}
                            >
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
                                    <strong style={{ color: "#3d5a25" }}>Category:</strong>{" "}
                                    {getCategory(product)}
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
                                        sx={{
                                            fontWeight: "bold",
                                            color: "#008040",
                                            fontSize: "1.35rem",
                                        }}
                                    >
                                        ₹ {getPrice(product)}
                                    </Typography>

                                    <Button
                                        variant="contained"
                                        size="small"
                                        sx={{
                                            backgroundColor: "green",
                                            "&:hover": { backgroundColor: "darkgreen" },
                                        }}
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
                    ))}
            </Box>

            {/* Snackbar */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>

            {/* Pagination */}
            {totalPages > 1 && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={(e, value) => setPage(value)}
                        color="primary"
                        showFirstButton
                        showLastButton
                    />
                </Box>
            )}
        </TableContainer>
    );
};

export default ProductTable;
