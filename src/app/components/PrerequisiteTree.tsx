import { Box, Card, CardContent, Typography, Chip, IconButton, Collapse, Button, Dialog, DialogTitle, DialogContent, DialogActions, Tabs, Tab } from '@mui/material';
import { ChevronDown, ChevronRight, ExternalLink, BookOpen, CheckCircle, Circle, HelpCircle } from 'lucide-react';
import { useState } from 'react';

interface TreeNode {
  id: string;
  title: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  importance: 'high' | 'medium' | 'low';
  whyNeeded: string;
  summary: {
    easy: string;
    undergrad: string;
    advanced: string;
  };
  proficiency?: 'unknown' | 'heard' | 'basic' | 'can-explain';
  externalLinks?: string[];
  children?: TreeNode[];
}

interface TreeNodeComponentProps {
  node: TreeNode;
  level: number;
  onProficiencyChange: (nodeId: string, proficiency: string) => void;
}

function TreeNodeComponent({ node, level, onProficiencyChange }: TreeNodeComponentProps) {
  const [expanded, setExpanded] = useState(level === 0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '#4caf50';
      case 'intermediate': return '#ff9800';
      case 'advanced': return '#f44336';
      default: return '#9e9e9e';
    }
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'default';
      default: return 'default';
    }
  };

  const getProficiencyIcon = (proficiency?: string) => {
    switch (proficiency) {
      case 'can-explain': return <CheckCircle size={16} color="#4caf50" />;
      case 'basic': return <Circle size={16} color="#ff9800" />;
      case 'heard': return <HelpCircle size={16} color="#2196f3" />;
      default: return <Circle size={16} color="#9e9e9e" />;
    }
  };

  const getProficiencyText = (proficiency?: string) => {
    switch (proficiency) {
      case 'can-explain': return '설명 가능';
      case 'basic': return '기초 이해';
      case 'heard': return '들어봄';
      default: return '아직 모름';
    }
  };

  return (
    <Box sx={{ ml: level * 3 }}>
      <Card
        sx={{
          mb: 1.5,
          borderLeft: `4px solid ${getDifficultyColor(node.difficulty)}`,
          '&:hover': { boxShadow: 3 }
        }}
      >
        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
            {node.children && node.children.length > 0 && (
              <IconButton
                size="small"
                onClick={() => setExpanded(!expanded)}
                sx={{ mt: -0.5 }}
              >
                {expanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
              </IconButton>
            )}

            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, flex: 1 }}>
                  {node.title}
                </Typography>
                <Chip
                  label={node.difficulty === 'beginner' ? '초급' : node.difficulty === 'intermediate' ? '중급' : '고급'}
                  size="small"
                  sx={{
                    bgcolor: getDifficultyColor(node.difficulty),
                    color: 'white',
                    fontWeight: 600,
                    height: 24
                  }}
                />
                <Chip
                  label={node.importance === 'high' ? '필수' : node.importance === 'medium' ? '권장' : '참고'}
                  size="small"
                  color={getImportanceColor(node.importance)}
                  sx={{ height: 24 }}
                />
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                {node.whyNeeded}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  {getProficiencyIcon(node.proficiency)}
                  <Typography variant="caption" color="text.secondary">
                    {getProficiencyText(node.proficiency)}
                  </Typography>
                </Box>

                <Button
                  size="small"
                  startIcon={<BookOpen size={16} />}
                  onClick={() => setDialogOpen(true)}
                >
                  자세히 보기
                </Button>

                <Button
                  size="small"
                  variant={node.proficiency === 'can-explain' ? 'outlined' : 'contained'}
                  onClick={() => {
                    const newProficiency = node.proficiency === 'can-explain' ? 'unknown' : 'can-explain';
                    onProficiencyChange(node.id, newProficiency);
                  }}
                >
                  {node.proficiency === 'can-explain' ? '학습 취소' : '학습 완료'}
                </Button>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {node.children && (
        <Collapse in={expanded}>
          {node.children.map((child) => (
            <TreeNodeComponent
              key={child.id}
              node={child}
              level={level + 1}
              onProficiencyChange={onProficiencyChange}
            />
          ))}
        </Collapse>
      )}

      {/* Detail Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>{node.title}</DialogTitle>
        <DialogContent>
          <Tabs value={selectedTab} onChange={(_, v) => setSelectedTab(v)} sx={{ mb: 2 }}>
            <Tab label="쉬운 설명" />
            <Tab label="전공 학부 수준" />
            <Tab label="심화 설명" />
          </Tabs>

          <Box sx={{ mb: 3 }}>
            {selectedTab === 0 && <Typography>{node.summary.easy}</Typography>}
            {selectedTab === 1 && <Typography>{node.summary.undergrad}</Typography>}
            {selectedTab === 2 && <Typography>{node.summary.advanced}</Typography>}
          </Box>

          {node.externalLinks && node.externalLinks.length > 0 && (
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                추천 학습 자료
              </Typography>
              {node.externalLinks.map((link, idx) => (
                <Button
                  key={idx}
                  size="small"
                  startIcon={<ExternalLink size={16} />}
                  href={link}
                  target="_blank"
                  sx={{ display: 'block', mb: 0.5, textAlign: 'left' }}
                >
                  학습 자료 {idx + 1}
                </Button>
              ))}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>닫기</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export function PrerequisiteTree() {
  const [treeData, setTreeData] = useState<TreeNode[]>([
    {
      id: 'node_1',
      title: '선형 탄성학 기초',
      difficulty: 'beginner',
      importance: 'high',
      whyNeeded: '응력-변형률 관계와 파동 방정식을 이해하기 위해 필요',
      summary: {
        easy: '물체가 힘을 받으면 변형되는데, 이 변형과 힘 사이의 관계를 다루는 학문입니다. 고무줄을 당기면 늘어나고 놓으면 다시 줄어드는 것처럼, 탄성체는 외력에 비례해 변형됩니다.',
        undergrad: '선형 탄성학은 응력(stress)과 변형률(strain) 사이의 선형 관계를 다룹니다. Hooke의 법칙이 기본 원리이며, 탄성계수(elastic modulus)와 포아송 비(Poisson ratio)가 재료 특성을 정의합니다.',
        advanced: '선형 탄성 이론은 응력 텐서와 변형률 텐서 간의 관계를 구성 방정식(constitutive equation)으로 표현합니다. 등방성 재료의 경우 Lamé 상수로 특징지어지며, 평형 방정식과 결합하여 Navier 방정식을 도출할 수 있습니다.'
      },
      proficiency: 'basic',
      externalLinks: ['https://example.com/elasticity-intro', 'https://example.com/mechanics-basics'],
      children: [
        {
          id: 'node_2',
          title: 'Hooke의 법칙',
          difficulty: 'beginner',
          importance: 'high',
          whyNeeded: '응력과 변형률의 선형 관계를 이해하는 기본 원리',
          summary: {
            easy: '용수철을 당기는 힘과 늘어나는 길이는 비례합니다. 2배 힘을 주면 2배 늘어나고, 힘을 없애면 원래대로 돌아옵니다.',
            undergrad: 'Hooke의 법칙은 σ = Eε로 표현되며, 여기서 σ는 응력, E는 탄성계수(Young\'s modulus), ε는 변형률입니다. 이는 선형 탄성 영역에서만 유효합니다.',
            advanced: '일반화된 Hooke의 법칙은 3차원 응력-변형률 관계를 텐서 형태로 표현합니다: σᵢⱼ = Cᵢⱼₖₗεₖₗ. 등방성 재료의 경우 81개의 탄성계수가 2개로 축약됩니다.'
          },
          proficiency: 'can-explain',
          externalLinks: ['https://example.com/hookes-law']
        },
        {
          id: 'node_3',
          title: '응력 텐서',
          difficulty: 'intermediate',
          importance: 'high',
          whyNeeded: '3차원 응력 상태를 수학적으로 표현하기 위해 필요',
          summary: {
            easy: '물체 내부의 한 점에서 여러 방향으로 작용하는 힘들을 정리한 것입니다. 마치 공이 여러 방향에서 눌리는 것처럼, 각 방향의 힘을 모두 고려합니다.',
            undergrad: '응력 텐서는 3×3 행렬로 표현되며, 대각 성분은 수직응력, 비대각 성분은 전단응력을 나타냅니다. 평형 상태에서는 대칭 텐서입니다.',
            advanced: 'Cauchy 응력 텐서는 변형된 형상에서 정의되며, σᵢⱼnⱼ = tᵢ 관계를 통해 임의 면에서의 응력 벡터를 계산할 수 있습니다. 주응력 및 주축 개념과 연결됩니다.'
          },
          proficiency: 'heard',
          externalLinks: ['https://example.com/stress-tensor']
        }
      ]
    },
    {
      id: 'node_4',
      title: '파동 방정식',
      difficulty: 'intermediate',
      importance: 'high',
      whyNeeded: '탄성파의 전파를 수학적으로 기술하기 위해 필요',
      summary: {
        easy: '파동이 시간에 따라 어떻게 퍼져나가는지를 설명하는 수식입니다. 물결이 퍼지거나 소리가 전달되는 것을 수학으로 표현한 것입니다.',
        undergrad: '파동 방정식은 ∂²u/∂t² = c²∇²u 형태로 표현되며, 여기서 c는 파동 속도입니다. 탄성파의 경우 P파와 S파가 서로 다른 속도로 전파됩니다.',
        advanced: '탄성 파동 방정식은 Navier 방정식으로부터 도출되며, Helmholtz 분해를 통해 종파(P파)와 횡파(S파)로 분리됩니다. 각각의 속도는 재료의 Lamé 상수와 밀도에 의해 결정됩니다.'
      },
      proficiency: 'unknown',
      externalLinks: ['https://example.com/wave-equation', 'https://example.com/elastic-waves'],
      children: [
        {
          id: 'node_5',
          title: 'Perfectly Matched Layer (PML)',
          difficulty: 'advanced',
          importance: 'high',
          whyNeeded: '무한 영역을 유한 영역으로 근사하여 수치 해석을 수행하기 위해 필요',
          summary: {
            easy: '컴퓨터로 무한히 넓은 공간을 계산할 수 없으므로, 경계에서 파동을 완벽하게 흡수하는 특수한 층을 만듭니다. 마치 방음벽처럼 파동이 반사되지 않게 합니다.',
            undergrad: 'PML은 계산 영역 경계에서 파동을 반사 없이 흡수하는 인공 경계 조건입니다. 복소 좌표 변환을 통해 구현되며, 반사 계수를 이론적으로 0으로 만들 수 있습니다.',
            advanced: 'PML은 좌표 신축(coordinate stretching)을 통해 구현되며, 완벽 정합 조건(perfect matching condition)을 만족합니다. 시간 영역 구현에서는 보조 변수(auxiliary variable) 또는 CFS(Complex Frequency Shifted) PML 기법이 사용됩니다.'
          },
          proficiency: 'unknown',
          externalLinks: ['https://example.com/pml-intro', 'https://example.com/pml-theory']
        }
      ]
    }
  ]);

  const handleProficiencyChange = (nodeId: string, proficiency: string) => {
    const updateNode = (nodes: TreeNode[]): TreeNode[] => {
      return nodes.map(node => {
        if (node.id === nodeId) {
          return { ...node, proficiency: proficiency as any };
        }
        if (node.children) {
          return { ...node, children: updateNode(node.children) };
        }
        return node;
      });
    };
    setTreeData(updateNode(treeData));
  };

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          선수 지식 로드맵
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Chip label="초급" size="small" sx={{ bgcolor: '#4caf50', color: 'white' }} />
          <Chip label="중급" size="small" sx={{ bgcolor: '#ff9800', color: 'white' }} />
          <Chip label="고급" size="small" sx={{ bgcolor: '#f44336', color: 'white' }} />
        </Box>
      </Box>

      {treeData.map((node) => (
        <TreeNodeComponent
          key={node.id}
          node={node}
          level={0}
          onProficiencyChange={handleProficiencyChange}
        />
      ))}
    </Box>
  );
}
