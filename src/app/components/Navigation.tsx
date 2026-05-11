import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { BookOpen, User, Upload, Home } from 'lucide-react';
import { useState } from 'react';

interface NavigationProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export function Navigation({ currentView, onNavigate }: NavigationProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenSettings = () => {
    setAnchorEl(null);
    setSettingsOpen(true);
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
            <MenuItem onClick={handleOpenSettings}>설정</MenuItem>
            <MenuItem onClick={handleClose}>로그아웃</MenuItem>
          </Menu>
        </Box>
      </Toolbar>

      <Dialog
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>설정</DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2" color="text.secondary">
            (임시) 설정 화면입니다. 여기에 테마/알림/계정 등의 설정을 추가할 수 있어요.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSettingsOpen(false)}>닫기</Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
}
