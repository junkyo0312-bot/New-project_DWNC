import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  LinearProgress,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Divider
} from '@mui/material';
import { FileText, Clock, TrendingUp, BookOpen } from 'lucide-react';

interface Paper {
  id: string;
  title: string;
  status: 'parsing' | 'parsed' | 'analyzing' | 'ready';
  progress: number;
  uploadedAt: string;
}

interface RecentConcept {
  id: string;
  name: string;
  paper: string;
  proficiency: string;
}

interface DashboardProps {
  onNavigate: (view: string, paperId?: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  // Mock data
  const recentPapers: Paper[] = [
    {
      id: '1',
      title: 'Elastic Wave Propagation with Perfectly Matched Layer Boundary Conditions',
      status: 'ready',
      progress: 100,
      uploadedAt: '2시간 전'
    },
    {
      id: '2',
      title: 'Deep Learning Approaches for Time Series Forecasting',
      status: 'analyzing',
      progress: 65,
      uploadedAt: '5시간 전'
    },
    {
      id: '3',
      title: 'Quantum Computing: An Overview of Recent Developments',
      status: 'parsed',
      progress: 40,
      uploadedAt: '1일 전'
    }
  ];

  const recentConcepts: RecentConcept[] = [
    { id: '1', name: 'Perfectly Matched Layer (PML)', paper: 'Elastic Wave...', proficiency: '기초 이해' },
    { id: '2', name: 'Wave Equation', paper: 'Elastic Wave...', proficiency: '설명 가능' },
    { id: '3', name: 'Transformer Architecture', paper: 'Deep Learning...', proficiency: '들어봄' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'success';
      case 'analyzing': return 'info';
      case 'parsed': return 'warning';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ready': return '분석 완료';
      case 'analyzing': return '분석 중';
      case 'parsed': return '파싱 완료';
      default: return '업로드됨';
    }
  };

  return (
    <Box sx={{ p: 4, bgcolor: '#f5f5f5', minHeight: 'calc(100vh - 64px)' }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        대시보드
      </Typography>

      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: '#e3f2fd' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <FileText size={40} color="#1976d2" />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>12</Typography>
                  <Typography variant="body2" color="text.secondary">분석한 논문</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: '#f3e5f5' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <BookOpen size={40} color="#7b1fa2" />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>48</Typography>
                  <Typography variant="body2" color="text.secondary">학습한 개념</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: '#e8f5e9' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TrendingUp size={40} color="#388e3c" />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>78%</Typography>
                  <Typography variant="body2" color="text.secondary">이해도 증가</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Papers */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  최근 업로드 논문
                </Typography>
                <Button size="small" onClick={() => onNavigate('upload')}>
                  새 논문 업로드
                </Button>
              </Box>
              <List>
                {recentPapers.map((paper, index) => (
                  <Box key={paper.id}>
                    {index > 0 && <Divider />}
                    <ListItemButton onClick={() => onNavigate('paper', paper.id)}>
                      <ListItemText
                        primary={paper.title}
                        secondary={
                          <Box sx={{ mt: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                              <Chip
                                label={getStatusText(paper.status)}
                                size="small"
                                color={getStatusColor(paper.status)}
                              />
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <Clock size={14} />
                                <Typography variant="caption">{paper.uploadedAt}</Typography>
                              </Box>
                            </Box>
                            {paper.status !== 'ready' && (
                              <LinearProgress
                                variant="determinate"
                                value={paper.progress}
                                sx={{ height: 6, borderRadius: 1 }}
                              />
                            )}
                          </Box>
                        }
                      />
                    </ListItemButton>
                  </Box>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Concepts */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                최근 학습 개념
              </Typography>
              <List>
                {recentConcepts.map((concept, index) => (
                  <Box key={concept.id}>
                    {index > 0 && <Divider sx={{ my: 1 }} />}
                    <ListItem disablePadding>
                      <ListItemText
                        primary={concept.name}
                        secondary={
                          <Box sx={{ mt: 0.5 }}>
                            <Typography variant="caption" display="block" color="text.secondary">
                              {concept.paper}
                            </Typography>
                            <Chip
                              label={concept.proficiency}
                              size="small"
                              sx={{ mt: 0.5, height: 20, fontSize: '0.7rem' }}
                            />
                          </Box>
                        }
                      />
                    </ListItem>
                  </Box>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
