import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Button, 
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme as useMuiTheme
} from "@mui/material";
import { 
  Brightness4, 
  Brightness7, 
  Logout, 
  Menu as MenuIcon,
  Home
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function NavBar() {
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    { text: 'หน้าหลัก', icon: <Home />, path: '/' },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, fontWeight: 'bold' }}>
        Metro Cat
      </Typography>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton 
              component={Link} 
              to={item.path}
              sx={{ color: 'text.primary' }}
            >
              <ListItemIcon sx={{ color: 'text.primary' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton onClick={toggleTheme}>
            <ListItemIcon sx={{ color: 'text.primary' }}>
              {theme === "light" ? <Brightness7 /> : <Brightness4 />}
            </ListItemIcon>
            <ListItemText primary={theme === "light" ? "โหมดกลางคืน" : "โหมดกลางวัน"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon sx={{ color: 'text.primary' }}>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="ออกจากระบบ" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="static" 
        sx={{
          bgcolor: 'background.paper',
          transition: 'background-color 0.2s ease-in-out'
        }}
      >
        <Toolbar sx={{ 
          width: '100%', 
          px: { xs: 2, sm: 3, md: 4 },
          justifyContent: 'space-between' 
        }}>
          {/* Logo */}
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              Metro Cat
            </Link>
          </Typography>

          {/* Desktop Menu */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              {menuItems.map((item) => (
                <Button 
                  key={item.text}
                  component={Link} 
                  to={item.path}
                  sx={{ 
                    color: 'text.primary',
                    '&:hover': {
                      color: 'text.secondary'
                    }
                  }}
                >
                  {item.text}
                </Button>
              ))}

              {/* Toggle Theme */}
              <IconButton 
                onClick={toggleTheme} 
                sx={{
                  color: theme === 'dark' ? 'primary.main' : 'text.primary',
                  '&:hover': {
                    bgcolor: 'action.hover',
                    color: 'primary.main'
                  }
                }}
                aria-label="toggle theme"
              >
                {theme === "light" ? <Brightness7 /> : <Brightness4 />}
              </IconButton>

              {/* Logout */}
              <Button
                onClick={handleLogout}
                startIcon={<Logout />}
                variant="outlined"
                size="small"
                sx={{
                  color: 'text.primary',
                  borderColor: 'divider',
                  px: 1.5,
                  '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: 'action.hover'
                  }
                }}
              >
                ออกจากระบบ
              </Button>
            </Box>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ color: 'text.primary' }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 240,
            bgcolor: 'background.paper'
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
