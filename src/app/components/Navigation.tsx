import { AppBar, Toolbar, Typography, Button, Box, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import { BookOpen, User, Upload, Home } from 'lucide-react';
import { useState } from 'react';

interface NavigationProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export function Navigation({ currentView, onNavigate }: NavigationProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ bgcolor: '#1a237e' }}>
      <Toolbar>
        <BookOpen size={28} style={{ marginRight: 12 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
          PaperPrep
        </Typography>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            color="inherit"
            startIcon={<Home size={18} />}
            onClick={() => onNavigate('dashboard')}
            sx={{ opacity: currentView === 'dashboard' ? 1 : 0.7 }}
          >
            대시보드
          </Button>
          <Button
            color="inherit"
            startIcon={<Upload size={18} />}
            onClick={() => onNavigate('upload')}
            sx={{ opacity: currentView === 'upload' ? 1 : 0.7 }}
          >
            업로드
          </Button>
          <Button
            color="inherit"
            startIcon={<User size={18} />}
            onClick={() => onNavigate('profile')}
            sx={{ opacity: currentView === 'profile' ? 1 : 0.7 }}
          >
            프로필
          </Button>

          <IconButton onClick={handleMenu} sx={{ ml: 1 }}>
            <Avatar sx={{ width: 32, height: 32, bgcolor: '#7c4dff' }}>U</Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>내 프로필</MenuItem>
            <MenuItem onClick={handleClose}>설정</MenuItem>
            <MenuItem onClick={handleClose}>로그아웃</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
