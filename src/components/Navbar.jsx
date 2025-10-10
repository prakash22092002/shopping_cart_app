import React from "react";
import {
    Box,
    Typography,
    IconButton,
    Skeleton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { FilterBar } from "../styles/ProductTable.styles";

const Navbar = ({ loading, renderFilterContent, setDrawerOpen }) => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 20px",
                backgroundColor: "#fff",
                borderBottom: "2px solid #d4e8c1",
            }}
        >
            {/* Logo */}
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

            {/* Mobile Menu */}
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
        </Box>
    );
};

export default Navbar;
