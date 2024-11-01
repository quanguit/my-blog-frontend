'use client';

import { yupResolver } from '@hookform/resolvers/yup';
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
  Skeleton,
  Toolbar,
} from '@mui/material';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Form, Icon, Input } from '@/components';
import { allRoutes, SCREEN_NAME } from '@/constants';
import { useLogoutMutation } from '@/features/auth/mutations';
import { SearchInputDTO, searchSchema } from '@/features/search';
import { useAuth } from '@/hooks';
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
  const { theme, setTheme } = useTheme();
  const { mutateAsync } = useLogoutMutation();
  const { user, isFetched } = useAuth();
  const router = useRouter();
  const isDarkTheme = theme === 'dark';
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const q = searchParams.get('q') ?? '';

  const methods = useForm<SearchInputDTO>({
    resolver: yupResolver(searchSchema),
    defaultValues: { q },
  });

  const { handleSubmit, register, reset } = methods;

  const handleOpenDrawer = () => {
    setIsOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
  };

  const onSubmit: SubmitHandler<SearchInputDTO> = ({ q }) => {
    router.push(allRoutes.search.toURL({ query: { q } }));
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={handleCloseDrawer}>
      <List>
        <ListItem disablePadding>
          <ListItemButton
            disableTouchRipple
            sx={{
              '&:hover': {
                backgroundColor: 'transparent',
              },
            }}
          >
            <StyledSwitch
              checked={isDarkTheme}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => {
                setTheme(`${e.target.checked ? 'dark' : 'light'}`);
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
        <ListItem>
          <ListItemButton
            sx={{ justifyContent: 'center' }}
            onClick={() => {
              mutateAsync().then(() => {
                router.push(allRoutes.login.toURL());
              });
            }}
          >
            Logout
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  useEffect(() => {
    if (pathName !== allRoutes.search.toURL()) {
      reset({ q: '' });
    }
  }, [pathName, reset]);

  return (
    <MUIAppBar position="static" enableColorOnDark>
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
            <Icon name="Logo" sx={{ width: 120, height: 64 }} />
          </ButtonBase>
          <Box sx={{ display: { xs: 'none', md: 'flex', gap: 12 } }}>
            {pages.map((page) => (
              <Button
                component={Link}
                href={page.route}
                key={page.name}
                onClick={handleCloseDrawer}
                sx={{ fontSize: 16 }}
                color="inherit"
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
              <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Input
                  size="small"
                  sx={{ width: 180 }}
                  placeholder="Search"
                  slotProps={{
                    input: {
                      endAdornment: (
                        <IconButton aria-label="search" type="submit">
                          <SearchIcon />
                        </IconButton>
                      ),
                    },
                  }}
                  {...register('q')}
                />
              </Form>
              <StyledSwitch
                sx={{ display: { xs: 'none', md: 'flex' } }}
                checked={isDarkTheme}
                onChange={(e) =>
                  setTheme(`${e.target.checked ? 'dark' : 'light'}`)
                }
              />
              {!isFetched ? (
                <Skeleton width="60px" />
              ) : user ? (
                <Button
                  sx={{ display: { xs: 'none', md: 'flex' } }}
                  onClick={() =>
                    mutateAsync().then(() => {
                      router.push(allRoutes.login.toURL());
                    })
                  }
                >
                  Logout
                </Button>
              ) : (
                <Button component={Link} href={allRoutes.login.toURL()}>
                  Login / Register
                </Button>
              )}
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
