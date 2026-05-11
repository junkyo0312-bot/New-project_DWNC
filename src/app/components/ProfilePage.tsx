import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Divider
} from '@mui/material';
import { TrendingUp, BookOpen, Target, Award } from 'lucide-react';

export function ProfilePage() {
  const knowledgeAreas = [
    { area: '탄성역학', proficiency: 75, concepts: 12 },
    { area: '파동 이론', proficiency: 60, concepts: 8 },
    { area: '수치해석', proficiency: 45, concepts: 6 },
    { area: '편미분 방정식', proficiency: 55, concepts: 9 },
    { area: '재료 역학', proficiency: 80, concepts: 15 }
  ];

  const recentActivity = [
    { action: 'Hooke의 법칙', type: '학습 완료', date: '2시간 전', proficiency: '설명 가능' },
    { action: 'PML 기법', type: '학습 중', date: '5시간 전', proficiency: '기초 이해' },
    { action: '응력 텐서', type: 'Q&A 질문', date: '1일 전', proficiency: '들어봄' },
    { action: '파동 방정식', type: '외부 자료 열람', date: '1일 전', proficiency: '기초 이해' },
    { action: '변형률 텐서', type: '학습 완료', date: '2일 전', proficiency: '설명 가능' }
  ];

  const weakConcepts = [
    { name: '복소 좌표 변환', papers: 2, attempts: 3 },
    { name: 'Lamé 상수', papers: 2, attempts: 2 },
    { name: 'Helmholtz 분해', papers: 1, attempts: 4 }
  ];

  const frequentTopics = [
    { topic: '경계 조건', count: 15 },
    { topic: '탄성 계수', count: 12 },
    { topic: 'P파와 S파', count: 10 },
    { topic: '응력-변형률 관계', count: 9 },
    { topic: '수치 안정성', count: 7 }
  ];

  return (
    <Box sx={{ p: 4, bgcolor: '#f5f5f5', minHeight: 'calc(100vh - 64px)' }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        지식 프로필
      </Typography>

      <Grid container spacing={3}>
        {/* Stats */}
        <Grid item xs={12} md={3}>
          <Card sx={{ bgcolor: '#e3f2fd', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <BookOpen size={40} color="#1976d2" />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>50</Typography>
                  <Typography variant="body2" color="text.secondary">학습한 개념</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ bgcolor: '#f3e5f5', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Target size={40} color="#7b1fa2" />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>32</Typography>
                  <Typography variant="body2" color="text.secondary">설명 가능한 개념</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ bgcolor: '#fff3e0', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TrendingUp size={40} color="#f57c00" />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>85%</Typography>
                  <Typography variant="body2" color="text.secondary">학습 완료율</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ bgcolor: '#e8f5e9', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Award size={40} color="#388e3c" />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>12</Typography>
                  <Typography variant="body2" color="text.secondary">분석한 논문</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Knowledge Areas */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                분야별 지식 분포
              </Typography>
              {knowledgeAreas.map((area, idx) => (
                <Box key={idx} sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {area.area}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <Typography variant="body2" color="text.secondary">
                        {area.concepts}개 개념
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {area.proficiency}%
                      </Typography>
                    </Box>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={area.proficiency}
                    sx={{
                      height: 10,
                      borderRadius: 1,
                      bgcolor: '#e0e0e0',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: area.proficiency >= 70 ? '#4caf50' : area.proficiency >= 50 ? '#ff9800' : '#f44336'
                      }
                    }}
                  />
                </Box>
              ))}
            </CardContent>
          </Card>

          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                최근 활동
              </Typography>
              <List>
                {recentActivity.map((activity, idx) => (
                  <Box key={idx}>
                    {idx > 0 && <Divider />}
                    <ListItem>
                      <Avatar sx={{ bgcolor: '#1976d2', mr: 2 }}>
                        <BookOpen size={20} />
                      </Avatar>
                      <ListItemText
                        primary={activity.action}
                        secondary={
                          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 0.5 }}>
                            <Chip label={activity.type} size="small" sx={{ height: 20, fontSize: '0.7rem' }} />
                            <Chip label={activity.proficiency} size="small" color="primary" sx={{ height: 20, fontSize: '0.7rem' }} />
                            <Typography variant="caption" color="text.secondary">
                              {activity.date}
                            </Typography>
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

        {/* Weak Concepts & Frequent Topics */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                취약 개념
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                추가 학습이 권장되는 개념들입니다
              </Typography>
              <List>
                {weakConcepts.map((concept, idx) => (
                  <Box key={idx}>
                    {idx > 0 && <Divider sx={{ my: 1 }} />}
                    <ListItem disablePadding>
                      <ListItemText
                        primary={concept.name}
                        secondary={
                          <Box sx={{ mt: 0.5 }}>
                            <Typography variant="caption" color="text.secondary">
                              {concept.papers}개 논문에서 등장 · {concept.attempts}회 질문
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  </Box>
                ))}
              </List>
            </CardContent>
          </Card>

          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                많이 질문한 주제
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {frequentTopics.map((topic, idx) => (
                  <Chip
                    key={idx}
                    label={`${topic.topic} (${topic.count})`}
                    size="small"
                    sx={{ bgcolor: '#e3f2fd' }}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                추천 학습 영역
              </Typography>
              <Box>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  🎯 복소 좌표 변환
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
                  2개 논문에서 핵심 개념으로 등장했으나 숙련도가 낮습니다
                </Typography>

                <Typography variant="body2" sx={{ mb: 1 }}>
                  🎯 텐서 해석
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block">
                  탄성역학 분야 학습을 위해 권장됩니다
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
