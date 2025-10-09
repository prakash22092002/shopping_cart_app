import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';


export const TableContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    boxSizing: 'border-box',
    padding: theme.spacing(2),
}));


export const FilterBar = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(2),
    flexWrap: 'wrap',
    paddingBottom: theme.spacing(2),
    marginTop: theme.spacing(1),
    borderBottom: "1px solid green"
}));