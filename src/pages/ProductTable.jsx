import React, { useEffect, useState, useMemo } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, TextField, MenuItem, Select, InputLabel, FormControl, Box, Pagination, Skeleton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useProductStore } from '../store/useProductStore';
import { TableContainer, FilterBar, OuterNav } from '../styles/ProductTable.styles';

const ProductTable = () => {
    const navigate = useNavigate();

    const { products, fetchProducts, loading, totalProducts, page, pageSize, setPage } = useProductStore();

    // usestate for the local value change
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [sortOrder, setSortOrder] = useState('');

    useEffect(() => {
        fetchProducts();
    }, [page, pageSize]);


    // the filtering function 
    const filteredProducts = useMemo(() => {
        let filtered = [...products];

        if (searchTerm) {
            filtered = filtered.filter(p => p.name?.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        // bases on the category
        if (categoryFilter) {
            filtered = filtered.filter(p => p.category_level_2 === categoryFilter || p.category_level_1 === categoryFilter || p.main_category === categoryFilter);
        }
        // based on the 
        if (sortOrder === 'asc') {
            filtered.sort((a, b) => (a.mrp?.mrp || 0) - (b.mrp?.mrp || 0));
        }
        if (sortOrder === 'desc') {
            filtered.sort((a, b) => (b.mrp?.mrp || 0) - (a.mrp?.mrp || 0));
        }
        return filtered;
    }, [products, searchTerm, categoryFilter, sortOrder]);



    const categories = useMemo(() => {
        const setCat = new Set();

        products.forEach(p => {
            const category = p.main_category || 'Uncategorized';
            setCat.add(category);
        });
        return Array.from(setCat).sort();
    }, [products]);

    const handleProductClick = (product) => {
        const productId = product.id || product.gtin || product.sku_code;
        navigate(`/product/${productId}`);
    };

    const getImage = (product) => product.images?.front || '/placeholder-image.png';
    const getCategory = (product) => product.category_level_2 || product.category_level_1 || product.main_category || 'Uncategorized';
    const getPrice = (product) => product.mrp?.mrp || 'N/A';

    const totalPages = Math.ceil(totalProducts / pageSize);

    return (
        <TableContainer>
            {/* Filter Bar */}
            <OuterNav>

                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography
                        sx={{
                            fontFamily: 'Arial, sans-serif',
                            color: '#008040',
                            fontWeight: 'bold',
                            fontSize: "1.4em"
                        }}
                    >
                        SmallBasket
                    </Typography>
                </Box>

                <FilterBar>
                    {loading ? (
                        <>
                            <Skeleton variant="rectangular" width={200} height={40} />
                            <Skeleton variant="rectangular" width={150} height={40} />
                            <Skeleton variant="rectangular" width={150} height={40} />
                        </>
                    ) : (
                        <>
                            {/* search by nmae  */}
                            <TextField
                                label='Search by name'
                                variant='outlined'
                                size='small'
                                sx={{ minWidth: 200 }}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            {/* category section */}
                            <FormControl size='small' sx={{ minWidth: 150 }}>
                                <InputLabel>Category</InputLabel>
                                <Select label='Category' value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                                    <MenuItem value=''>DEFAULT</MenuItem>
                                    {categories.map(category => (
                                        <MenuItem key={category} value={category}>{category}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            {/* sort by price */}
                            <FormControl size='small' sx={{ minWidth: 150 }}>
                                <InputLabel>Sort by Price</InputLabel>
                                <Select label='Sort by Price' value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                                    <MenuItem value=''>Default</MenuItem>
                                    <MenuItem value='asc'>Low to High</MenuItem>
                                    <MenuItem value='desc'>High to Low</MenuItem>
                                </Select>
                            </FormControl>
                        </>
                    )}
                </FilterBar>
            </OuterNav>




            {/* Cards Grid */}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
                    gap: 2,
                    mt: 2
                }}
            >
                {loading ? (
                    // Skeleton Cards
                    Array.from({ length: 8 }).map((_, idx) => (
                        <Card key={idx} sx={{ height: 350, display: 'flex', flexDirection: 'column' }}>
                            <Skeleton variant="rectangular" height={180} />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Skeleton height={25} sx={{ mb: 1 }} />
                                <Skeleton height={20} sx={{ mb: 0.5 }} />
                                <Skeleton height={20} sx={{ mb: 0.5 }} />
                                <Skeleton height={25} sx={{ mt: 'auto' }} />
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    filteredProducts.map(product => (
                        <Card
                            key={product.id || product.gtin || product.sku_code}
                            sx={{
                                height: 350,
                                display: 'flex',
                                flexDirection: 'column',
                                cursor: 'pointer',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                '&:hover': { transform: 'translateY(-2px)', boxShadow: 3 },
                            }}
                            onClick={() => handleProductClick(product)}
                        >
                            <CardMedia
                                component='img'
                                height='180'
                                image={getImage(product)}
                                alt={product.name}
                                sx={{ objectFit: 'cover', backgroundColor: '#f5f5f5' }}
                            />
                            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                <Typography
                                    variant='p'
                                    sx={{
                                        mb: 1,
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                    }}
                                >
                                    {product.name}
                                </Typography>
                                <Typography variant='body2' color='text.secondary' sx={{ mb: 0.5 }}>
                                    <strong>Category:</strong> {getCategory(product)}
                                </Typography>
                                <Box sx={{ mt: 'auto' }}>
                                    <Typography variant='subtitle1' sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                                        ₹ {getPrice(product)}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    ))
                )}
            </Box>

            {/* Pagination */}
            {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={(e, value) => setPage(value)}
                        color='primary'
                        showFirstButton
                        showLastButton
                    />
                </Box>
            )}
        </TableContainer>
    );
};

export default ProductTable;
