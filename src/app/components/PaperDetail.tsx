import { Box, Card, CardContent, Typography, Tabs, Tab, Chip, LinearProgress } from '@mui/material';
import { FileText, MapIcon, BookOpen } from 'lucide-react';
import { useState } from 'react';
import { PrerequisiteTree } from './PrerequisiteTree';
import { PaperReader } from './PaperReader';

interface PaperDetailProps {
  paperId: string;
}

export function PaperDetail({ paperId }: PaperDetailProps) {
  const [currentTab, setCurrentTab] = useState(0);

  // Mock paper data
  const paper = {
    title: 'Elastic Wave Propagation with Perfectly Matched Layer Boundary Conditions',
    authors: ['김철수', '이영희', 'John Smith'],
    abstract: '본 연구에서는 탄성파 전파 시뮬레이션에서 인공 경계 반사를 최소화하기 위한 Perfectly Matched Layer (PML) 기법을 다룬다. 복소 좌표 변환을 통해 경계에서 파동을 지수적으로 감쇠시키며, 시간 영역 구현에서의 안정성 분석을 수행한다.',
    status: 'ready',
    progress: 100,
    uploadedAt: '2024-05-10'
  };

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: 'calc(100vh - 64px)' }}>
      {/* Header */}
      <Box sx={{ bgcolor: 'white', borderBottom: '1px solid #e0e0e0', p: 3 }}>
        <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <Chip label="분석 완료" color="success" size="small" />
            <Chip label={paper.uploadedAt} size="small" variant="outlined" />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
            {paper.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            저자: {paper.authors.join(', ')}
          </Typography>
        </Box>
      </Box>

      {/* Tabs */}
      <Box sx={{ bgcolor: 'white', borderBottom: '1px solid #e0e0e0' }}>
        <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
          <Tabs value={currentTab} onChange={(_, v) => setCurrentTab(v)}>
            <Tab icon={<FileText size={18} />} label="개요" iconPosition="start" />
            <Tab icon={<MapIcon size={18} />} label="선수 지식 로드맵" iconPosition="start" />
            <Tab icon={<BookOpen size={18} />} label="논문 읽기" iconPosition="start" />
          </Tabs>
        </Box>
      </Box>

      {/* Tab Content */}
      <Box>
        {currentTab === 0 && (
          <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  초록
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                  {paper.abstract}
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ mt: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  분석 상태
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                  <Typography variant="body2" sx={{ minWidth: 120 }}>
                    텍스트 파싱
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={100}
                    sx={{ flex: 1, height: 8, borderRadius: 1 }}
                  />
                  <Chip label="완료" size="small" color="success" />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                  <Typography variant="body2" sx={{ minWidth: 120 }}>
                    선수 지식 분석
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={100}
                    sx={{ flex: 1, height: 8, borderRadius: 1 }}
                  />
                  <Chip label="완료" size="small" color="success" />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography variant="body2" sx={{ minWidth: 120 }}>
                    용어 사전 생성
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={100}
                    sx={{ flex: 1, height: 8, borderRadius: 1 }}
                  />
                  <Chip label="완료" size="small" color="success" />
                </Box>
              </CardContent>
            </Card>

            <Card sx={{ mt: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  분석 요약
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      추출된 선수 지식 개념
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      12개
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      등록된 용어
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      28개
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      논문 페이지 수
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      15페이지
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      추정 읽기 시간
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      45분
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        )}

        {currentTab === 1 && (
          <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
            <PrerequisiteTree />
          </Box>
        )}

        {currentTab === 2 && (
          <PaperReader />
        )}
      </Box>
    </Box>
  );
}
