'use client';

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import {
  AppBar,
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
  TextField as MUITextField,
  Toolbar,
} from '@mui/material';
import { ReactNode, useState } from 'react';

import { Icon } from '@/components';
import { SCREEN_NAME } from '@/constants';
import { StyledSwitch } from '@/styles';

const pages = [SCREEN_NAME.HOME, SCREEN_NAME.BLOG, SCREEN_NAME.CONTACT];

export default function BaseLayout({ children }: { children: ReactNode }) {
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
        {pages.map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box
      component="main"
      display="flex"
      flexDirection="column"
      minHeight="100vh"
    >
      <AppBar position="static" sx={{ bgcolor: 'white', boxShadow: 'none' }}>
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              py: 0.5,
            }}
          >
            <ButtonBase>
              <Icon
                name="Logo"
                sx={{ width: 120, color: 'black', height: 64 }}
              />
            </ButtonBase>
            <Box sx={{ display: { xs: 'none', md: 'flex', gap: 12 } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseDrawer}
                  sx={{ color: 'black', fontSize: 16 }}
                >
                  {page}
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
                        <IconButton>
                          <SearchIcon />
                        </IconButton>
                      ),
                    },
                  }}
                />
                <StyledSwitch />
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
      </AppBar>
      <Container maxWidth="xl">{children}</Container>
    </Box>
  );
}
