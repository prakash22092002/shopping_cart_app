import React from "react";
import { Drawer, Box, IconButton, Skeleton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const FilterDrawer = ({ drawerOpen, setDrawerOpen, loading, renderFilterContent }) => (
    <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: "80%", p: 2 } }}
    >
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton onClick={() => setDrawerOpen(false)}>
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
);

export default FilterDrawer;
