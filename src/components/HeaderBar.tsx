'use client';
import React, { useEffect, useState } from 'react';
import { AppBar, Avatar, Box, Button, Container, IconButton, Link, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import NextLink from 'next/link';
import { Diamond } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import CkbIcon from '@/assets/CkbIcon';
import { ccc } from "@ckb-ccc/connector-react";
import { ViewData } from '@/client/ViewData';

export default function HeaderBar() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { wallet, signerInfo, open, disconnect } = ccc.useCcc();
  const [address, setAddress] = useState<string>(ViewData.testAddress);
  const signer = ccc.useSigner();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    if (!signer) { return; }

    (async () => {
      const addr = await signer.getRecommendedAddress();
      setAddress(addr);
      console.log(`getRecommendedAddress: ${addr}`);
    })();

    // (async () => {
    //   const capacity = await signer.getBalance();
    //   setBalance(ccc.fixedPointToString(capacity));
    // })();

    return () => {

    };
  }, [signer]);

  return (
    <AppBar position="static" color="default">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Diamond sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}>HODLckb</Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              <MenuItem>
                <Link href="/" underline="none" component={NextLink} sx={{ textAlign: 'center', color: 'inherit' }}>Intro</Link>
              </MenuItem>
              {address && address.length > 0 ? <MenuItem>
                <Link href="/rewards" underline="none" component={NextLink} sx={{ textAlign: 'center', color: 'inherit' }}>Rewards</Link>
              </MenuItem> : null}
            </Menu>
          </Box>
          <Diamond sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}>HODLckb</Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            <Link sx={{ my: 2, display: 'block', color: 'inherit', fontWeight: 'bold' }}
              href="/" underline="none" component={NextLink}>Intro</Link>
            {address && address.length > 0 ? <Link sx={{ my: 2, display: 'block', color: 'inherit', fontWeight: 'bold' }}
              href="/rewards" underline="none" component={NextLink}>Rewards</Link> : null}
          </Box>
          {address && address.length > 3 ? <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={`https://robohash.org/${address}.png?set=set6`} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={() => {
                disconnect();
                setAddress("");
              }}>
                <Typography sx={{ textAlign: 'center' }}>Disconnect</Typography>
              </MenuItem>
            </Menu>
          </Box> :
            <Button variant="outlined" startIcon={<CkbIcon />} onClick={open}>
              Connect
            </Button>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
}
