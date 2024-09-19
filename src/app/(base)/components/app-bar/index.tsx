'use client';

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  ButtonBase,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  AppBar as MUIAppBar,
  TextField as MUITextField,
  Toolbar,
} from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';

import { Icon } from '@/components';
import { allRoutes, SCREEN_NAME } from '@/constants';
import { StyledSwitch } from '@/styles';

const pages = [
  {
    name: SCREEN_NAME.HOME,
    route: allRoutes['/'].toURL(),
  },
  {
    name: SCREEN_NAME.BLOG,
    route: allRoutes.blog.toURL(),
  },
  {
    name: SCREEN_NAME.CONTACT,
    route: allRoutes.contact.toURL(),
  },
];

export const AppBar = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [searchKey, setSearchKey] = useState('');

  const handleOpenDrawer = () => {
    setIsOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={handleCloseDrawer}>
      <List>
        <ListItem disablePadding>
          <ListItemButton disableTouchRipple>
            <StyledSwitch
              onChange={(e) => {
                e.stopPropagation();
              }}
            />
          </ListItemButton>
        </ListItem>
        {pages.map((page) => (
          <ListItem
            component={Link}
            href={page.route}
            key={page.name}
            disablePadding
          >
            <ListItemButton>
              <ListItemText primary={page.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <MUIAppBar position="static" sx={{ bgcolor: 'white', boxShadow: 'none' }}>
      <Container>
        <Toolbar
          disableGutters
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            py: 0.5,
          }}
        >
          <ButtonBase
            component={Link}
            href={allRoutes['/'].toURL()}
            aria-label="home page"
          >
            <Icon name="Logo" sx={{ width: 120, color: 'black', height: 64 }} />
          </ButtonBase>
          <Box sx={{ display: { xs: 'none', md: 'flex', gap: 12 } }}>
            {pages.map((page) => (
              <Button
                component={Link}
                href={page.route}
                key={page.name}
                onClick={handleCloseDrawer}
                sx={{ color: 'black', fontSize: 16 }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          <Box display="flex" alignItems="center">
            <Box
              sx={{
                display: { xs: 'none', sm: 'flex' },
                alignItems: 'center',
                gap: 2,
              }}
            >
              <MUITextField
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                size="small"
                sx={{ width: 180 }}
                placeholder="Search"
                slotProps={{
                  input: {
                    endAdornment: (
                      <IconButton aria-label="search">
                        <SearchIcon />
                      </IconButton>
                    ),
                  },
                }}
              />
              <StyledSwitch sx={{ display: { xs: 'none', md: 'flex' } }} />
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton size="large" onClick={handleOpenDrawer}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Drawer
              open={isOpenDrawer}
              onClose={handleCloseDrawer}
              anchor="right"
            >
              {DrawerList}
            </Drawer>
          </Box>
        </Toolbar>
      </Container>
    </MUIAppBar>
  );
};
