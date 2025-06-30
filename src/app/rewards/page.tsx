'use client';
import * as React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Alert, Avatar, Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Container, IconButton, InputBase, Divider, Link, Paper, Tab, Typography, TextField, InputAdornment, Stack, Step, StepContent, Stepper, StepLabel } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { ArrowBack, ArrowForward, Check, ExpandMore, Search } from '@mui/icons-material';
import { BaseCell, CKBCell } from '../models/NormalCell';
import { ViewData } from '@/client/ViewData';
import { ExplorerUtils } from '@/utils/ExplorerUtils';
import { HodlRules } from '@/client/HodlRules';
import { formatCapacity, formatTimestamp, formatTimestampStr } from '@/utils/stringUtils';

export default function AssetsPage() {
    // steps
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set<number>());
    // tabs
    const [value, setValue] = React.useState('1');
    // search
    const [searchTerm, setSearchTerm] = React.useState(`${ViewData.testAddress}`);
    const [searching, setSearching] = React.useState(false);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [canPrevPage, setCanPrevPage] = React.useState(false);
    const [canNextPage, setCanNextPage] = React.useState(false);
    const [cellsIn1Year, setCellsIn1Year] = React.useState<BaseCell[]>([]);
    const [cells1to3Years, setCellsIn1to3Years] = React.useState<BaseCell[]>([]);
    const [cells3to5Years, setCellsIn3to5Years] = React.useState<BaseCell[]>([]);
    const [cellsOut5Years, setCellsOut5Years] = React.useState<BaseCell[]>([]);
    const [noHodlCell, setNoHodlCell] = React.useState(true);
    const [selectedCount, setSelectedCount] = React.useState(0);
    const [ckbNeeded, setCkbNeeded] = React.useState(0);
    const [cellFee, setCellFee] = React.useState<CKBCell>(new CKBCell());

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };


    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = async (): Promise<boolean> => {
        setSearching(true);

        try {
            const cells = await ExplorerUtils.getLiveCells(searchTerm, currentPage);
            const count = cells.getCount();
            console.log(cells);
            setCanNextPage(count == ExplorerUtils.countPerPage);
            setCanPrevPage(currentPage > 1);

            const cells1 = HodlRules.getCellsIn1Year(cells);
            console.log(`<1Y cells count: ${cells1.getCount()}`);
            setCellsIn1Year([...cells1.getAllCells()]);

            const cells1_3 = HodlRules.getCells1to3Years(cells);
            console.log(`1~3Y cells count: ${cells1_3.getCount()}`);
            setCellsIn1to3Years([...cells1_3.getAllCells()]);

            const cells3_5 = HodlRules.getCells3to5Years(cells);
            console.log(`3~5Y cells count: ${cells3_5.getCount()}`);
            setCellsIn3to5Years([...cells3_5.getAllCells()]);

            const cells5 = HodlRules.getCellsOut5Years(cells);
            console.log(`5+ cells count: ${cells5.getCount()}`);
            setCellsOut5Years([...cells5.getAllCells()]);

            setNoHodlCell(cells1_3.getCount() === 0 && cells3_5.getCount() === 0 && cells5.getCount() === 0);
            setSearching(false);
            return true;
        }
        catch (err) {
            setSearching(false);
            return false;
        }
    };

    const handlePrevPage = async () => {
        setCurrentPage(currentPage - 1);
        const r = await handleSearch();
        if (!r) { setCurrentPage(currentPage + 1); }
    };

    const handleNextPage = async () => {
        setCurrentPage(currentPage + 1);
        const r = await handleSearch();
        if (!r) { setCurrentPage(currentPage - 1); }
    };

    const handleCreateTicket = async () => { }

    const getCardCover = (cell: BaseCell) => {
        switch (cell.grade) {
            case 1:
                return "/silver.jpg";
            case 3:
                return "/gold.jpg";
            case 5:
                return "/diamond.jpg";
            default:
                return "/silver.jpg";
        }
    }

    const refreshCells = (grade: number) => {
        switch (grade) {
            case 1:
                setCellsIn1to3Years([...cells1to3Years]);
                break;
            case 3:
                setCellsIn3to5Years([...cells3to5Years]);
                break;
            case 5:
                setCellsOut5Years([...cellsOut5Years]);
                break;
        }
    }

    const renderNormalCellCard = (cell: BaseCell, index: number) => {
        return (
            <Card sx={{ width: 280, height: 220 }} key={index}>
                <CardContent>
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                        {cell.group}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {formatCapacity(cell.balanceStr)} {cell.symbol}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>Block: {cell.block_number}</Typography>
                    <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 1 }}>{formatTimestampStr(cell.block_timestamp)}</Typography>
                </CardContent>
                <CardActions>
                    <Button component="a" href={`https://explorer.nervos.org/transaction/${cell.tx_hash}`} underline="none" target="_blank">Explorer</Button>
                    {cell.cell_type === 'normal' && cell.group === "Normal" ? <Button size="small" variant="contained" disabled={noHodlCell || cell.balance < ckbNeeded} onClick={() => {
                        setCellFee(cell);
                        handleNext();
                    }}>Use as fee</Button> : null}
                </CardActions>
            </Card>);
    }

    const renderHodlCellCard = (cell: BaseCell, index: number) => {
        return (
            <Card sx={{ width: 280, height: 380 }} key={index}>
                <CardMedia
                    sx={{ height: 140 }}
                    image={getCardCover(cell)}
                    title="HODL!"
                />
                <CardContent>
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                        {cell.group}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {formatCapacity(cell.balanceStr)} {cell.symbol}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>Block: {cell.block_number}</Typography>
                    <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>{formatTimestampStr(cell.block_timestamp)}</Typography>
                    <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 1 }}>Last claimed: {formatTimestamp(cell.last_claimed_at)}</Typography>
                </CardContent>
                <CardActions>
                    <Button component="a" href={`https://explorer.nervos.org/transaction/${cell.tx_hash}`} underline="none" target="_blank">Explorer</Button>
                    <Button size="small" variant="contained" disabled={noHodlCell} onClick={() => {
                        cell.selected = !cell.selected;
                        if (cell.selected) {
                            setSelectedCount(selectedCount + 1);
                        }
                        else {
                            setSelectedCount(selectedCount - 1);
                        }
                        refreshCells(cell.grade);
                    }}>{cell.selected ? "Unselect" : "Select"}</Button>
                    {cell.selected ? <Check color="success" sx={{ ml: 2 }} /> : null}
                </CardActions>
            </Card>);
    }

    return (
        <Stack width="100%" spacing={2}>
            <Alert severity="warning" sx={{ my: 2 }}>Fake data, just for DEMO show.</Alert>
            <Paper component="form"
                sx={{ my: 2, p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}>
                <InputBase
                    sx={{ ml: 1, flex: 1 }} value={searchTerm} onChange={handleSearchChange}
                    placeholder="Nervos CKB address"
                    inputProps={{ 'aria-label': 'nervos ckb address' }}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search" disabled={searching} onClick={handleSearch}>
                    <Search />
                </IconButton>
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton sx={{ p: '10px' }} aria-label="directions" disabled={searching || !canPrevPage} onClick={handlePrevPage}>
                    <ArrowBack />
                </IconButton>
                <IconButton sx={{ p: '10px' }} aria-label="directions" disabled={searching || !canNextPage} onClick={handleNextPage}>
                    <ArrowForward />
                </IconButton>
            </Paper>
            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={activeStep} orientation="vertical">
                    <Step>
                        <StepLabel>Choose cells for rewards</StepLabel>
                        <StepContent>
                            <Box sx={{ width: '100%', minHeight: '400px', my: 2 }}>
                                <TabContext value={value}>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
                                        <TabList onChange={handleTabChange} aria-label="asset tabs">
                                            <Tab label="1~3 Years" value="1" disabled={cells1to3Years.length == 0} />
                                            <Tab label="3~5 Years" value="2" disabled={cells3to5Years.length == 0} />
                                            <Tab label="5+ Years" value="3" disabled={cellsOut5Years.length == 0} />
                                        </TabList>
                                    </Box>
                                    <TabPanel value="1">
                                        <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
                                            {cells1to3Years.map((item: BaseCell, index: number) => (
                                                renderHodlCellCard(item, index)
                                            ))}
                                        </Stack>
                                    </TabPanel>
                                    <TabPanel value="2">
                                        <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
                                            {cells3to5Years.map((item: BaseCell, index: number) => (
                                                renderHodlCellCard(item, index)
                                            ))}
                                        </Stack>
                                    </TabPanel>
                                    <TabPanel value="3">
                                        <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
                                            {cellsOut5Years.map((item: BaseCell, index: number) => (
                                                renderHodlCellCard(item, index)
                                            ))}
                                        </Stack>
                                    </TabPanel>
                                </TabContext>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <IconButton sx={{ my: 1 }} color="primary" disabled={noHodlCell || selectedCount === 0} onClick={() => {
                                    const needed = ViewData.xudtCellFee + ViewData.platformFeePerCell * selectedCount;
                                    console.log(`Need ${needed} CKB`);
                                    setCkbNeeded(needed);
                                    handleNext();
                                }}>
                                    <ArrowForward />
                                </IconButton>
                                {/* <Alert severity="info" sx={{ my: 1, verticalAlign: 'middle' }}>Just read the info of selected UTXOs/Cells, NO SPEND!</Alert> */}
                            </Box>
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Choose a cell to pay fees</StepLabel>
                        <StepContent>
                            <Stack sx={{ minHeight: '400px', my: 2 }} direction="row" spacing={2} useFlexGap flexWrap="wrap">
                                {cellsIn1Year.map((item: BaseCell, index: number) => (
                                    renderNormalCellCard(item, index)
                                ))}
                            </Stack>
                            {/* <Divider/>
                            <IconButton sx={{ my: 2 }} disabled={cellsIn1Year.length == 0} onClick={handleNext}>
                                <ArrowForward />
                            </IconButton> */}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Create ticket</StepLabel>
                        <StepContent>
                            <Stack sx={{ width: '400px', minHeight: '400px', my: 2 }}>
                                <Accordion defaultExpanded>
                                    <AccordionSummary expandIcon={<ExpandMore />}>
                                        <Typography component="span">1. RGB++ Cell occupied fee</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            {ViewData.xudtCellFee} CKB x 1
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion defaultExpanded>
                                    <AccordionSummary expandIcon={<ExpandMore />}>
                                        <Typography component="span">2. Platform fee</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            {ViewData.platformFeePerCell} CKB x {selectedCount} Cells
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion defaultExpanded>
                                    <AccordionSummary expandIcon={<ExpandMore />}>
                                        <Typography variant="h6">Total</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography variant="h3">
                                            {ViewData.xudtCellFee * 1 + ViewData.platformFeePerCell * selectedCount} CKB
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Box sx={{ my: 1 }}>
                                    <Button variant="contained" startIcon={<ArrowForward />}>Submit</Button>
                                </Box>
                            </Stack>
                        </StepContent>
                    </Step>
                </Stepper>
            </Box>

        </Stack>
    );
}