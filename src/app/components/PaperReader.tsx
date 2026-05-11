import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Paper,
  Popover,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Chip
} from '@mui/material';
import { Send, BookOpen, MessageCircle, X } from 'lucide-react';
import { useState, useRef } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  context?: string;
}

export function PaperReader() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedTerm, setSelectedTerm] = useState<{ term: string; definition: string; context: string } | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '안녕하세요! 논문 읽기 중 궁금한 점이 있으시면 언제든지 질문해주세요. 특정 문장이나 개념에 대해 설명해드릴 수 있습니다.'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Mock paper content with highlighted terms
  const paperContent = `
논문 제목: Elastic Wave Propagation with Perfectly Matched Layer Boundary Conditions

초록:
본 연구에서는 탄성파 전파 시뮬레이션에서 인공 경계 반사를 최소화하기 위한 <term data-term="pml">Perfectly Matched Layer (PML)</term> 기법을 다룬다. <term data-term="elastic">탄성파</term>는 지진학, 비파괴 검사 등 다양한 분야에서 중요한 역할을 한다.

1. 서론
<term data-term="wave-equation">파동 방정식</term>은 탄성 매질 내에서 파동의 전파를 기술한다. 무한 영역을 수치적으로 모델링할 때, 계산 영역을 유한하게 제한해야 하므로 <term data-term="boundary">경계 조건</term>이 필수적이다. 전통적인 흡수 경계 조건은 반사파를 완전히 제거하지 못하는 한계가 있다.

2. 방법론
PML은 <term data-term="complex-coordinate">복소 좌표 변환</term>을 통해 경계에서 파동을 지수적으로 감쇠시킨다. 이는 <term data-term="hooke">Hooke의 법칙</term>과 운동 방정식을 변형된 좌표계에서 재구성함으로써 달성된다.
`;

  const terms: Record<string, { definition: string; context: string }> = {
    pml: {
      definition: 'Perfectly Matched Layer: 파동을 반사 없이 흡수하는 인공 경계층',
      context: '이 논문에서는 탄성파 시뮬레이션의 경계 조건으로 사용되며, 무한 영역을 유한 영역으로 근사할 때 반사파를 최소화하는 핵심 기법입니다.'
    },
    elastic: {
      definition: '탄성파: 탄성 매질 내에서 전파되는 파동',
      context: '이 논문에서는 P파(종파)와 S파(횡파) 두 가지 탄성파 모드를 다루며, 각각의 전파 특성과 PML에서의 감쇠 메커니즘을 분석합니다.'
    },
    'wave-equation': {
      definition: '파동 방정식: 파동의 시공간 전파를 기술하는 편미분 방정식',
      context: '탄성 매질에서의 파동 방정식은 Navier 방정식으로 표현되며, 변위 벡터를 미지수로 하는 2차 편미분 방정식입니다.'
    },
    boundary: {
      definition: '경계 조건: 편미분 방정식의 해를 유일하게 결정하기 위한 경계에서의 조건',
      context: '이 논문에서는 흡수 경계 조건(ABC), 무반사 경계 조건, PML 등 다양한 경계 조건을 비교 분석합니다.'
    },
    'complex-coordinate': {
      definition: '복소 좌표 변환: 실수 좌표를 복소수 영역으로 확장하는 수학적 기법',
      context: 'PML 구현의 핵심으로, 복소 좌표를 도입하여 파동 방정식의 해가 경계층에서 지수적으로 감쇠하도록 만듭니다.'
    },
    hooke: {
      definition: 'Hooke의 법칙: 응력과 변형률이 선형 비례 관계를 가진다는 탄성 이론의 기본 법칙',
      context: '탄성파 방정식의 기본 구성 관계로, PML 영역에서도 수정된 형태로 적용됩니다.'
    }
  };

  const handleTermClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    if (target.dataset.term) {
      const termKey = target.dataset.term;
      setSelectedTerm({
        term: target.textContent || '',
        definition: terms[termKey].definition,
        context: terms[termKey].context
      });
      setAnchorEl(target);
    }
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setSelectedTerm(null);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: inputValue
    };

    // Simulate AI response
    const aiResponse: Message = {
      role: 'assistant',
      content: `"${inputValue}"에 대해 설명드리겠습니다.\n\n이 개념은 논문의 핵심 방법론과 관련이 있습니다. PML 기법은 수치 해석에서 무한 영역을 유한 영역으로 근사할 때 발생하는 인공 반사를 제거하기 위해 개발되었습니다.\n\n더 자세한 설명이 필요하시면 말씀해주세요!`,
      context: '2장 방법론'
    };

    setMessages([...messages, userMessage, aiResponse]);
    setInputValue('');
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const renderPaperContent = () => {
    const lines = paperContent.trim().split('\n');
    return lines.map((line, idx) => {
      if (line.trim() === '') return <Box key={idx} sx={{ height: 8 }} />;

      const parts = line.split(/(<term data-term="[^"]+">.*?<\/term>)/g);

      return (
        <Typography
          key={idx}
          variant="body1"
          sx={{
            mb: 1,
            lineHeight: 1.8,
            fontSize: line.includes('제목:') ? '1.5rem' : line.startsWith('초록:') || line.match(/^\d+\./) ? '1.1rem' : '1rem',
            fontWeight: line.includes('제목:') || line.match(/^\d+\./) ? 600 : 400,
            color: line.startsWith('초록:') || line.match(/^\d+\./) ? 'primary.main' : 'text.primary'
          }}
        >
          {parts.map((part, partIdx) => {
            if (part.startsWith('<term')) {
              const termMatch = part.match(/data-term="([^"]+)">([^<]+)</);
              if (termMatch) {
                const [, termKey, termText] = termMatch;
                return (
                  <Box
                    key={partIdx}
                    component="span"
                    data-term={termKey}
                    onClick={handleTermClick}
                    sx={{
                      color: 'primary.main',
                      textDecoration: 'underline',
                      cursor: 'pointer',
                      fontWeight: 600,
                      '&:hover': {
                        bgcolor: 'primary.50',
                        borderRadius: 0.5,
                        px: 0.5
                      }
                    }}
                  >
                    {termText}
                  </Box>
                );
              }
            }
            return <span key={partIdx}>{part}</span>;
          })}
        </Typography>
      );
    });
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, height: 'calc(100vh - 64px)' }}>
      {/* Paper Content */}
      <Box sx={{ flex: 1, overflow: 'auto', p: 4 }}>
        <Paper sx={{ p: 4, maxWidth: 800, mx: 'auto', minHeight: '100%' }}>
          {renderPaperContent()}
        </Paper>
      </Box>

      {/* Chat Sidebar */}
      <Box
        sx={{
          width: chatOpen ? 400 : 60,
          transition: 'width 0.3s',
          borderLeft: '1px solid #e0e0e0',
          bgcolor: '#fafafa',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {!chatOpen ? (
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <IconButton
              onClick={() => setChatOpen(true)}
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                '&:hover': { bgcolor: 'primary.dark' }
              }}
            >
              <MessageCircle size={24} />
            </IconButton>
          </Box>
        ) : (
          <>
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e0e0e0' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                <MessageCircle size={20} />
                Q&A
              </Typography>
              <IconButton size="small" onClick={() => setChatOpen(false)}>
                <X size={20} />
              </IconButton>
            </Box>

            <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
              <List>
                {messages.map((msg, idx) => (
                  <ListItem
                    key={idx}
                    sx={{
                      flexDirection: 'column',
                      alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start',
                      mb: 2
                    }}
                  >
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start', maxWidth: '90%' }}>
                      {msg.role === 'assistant' && (
                        <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                          <BookOpen size={18} />
                        </Avatar>
                      )}
                      <Card
                        sx={{
                          p: 1.5,
                          bgcolor: msg.role === 'user' ? 'primary.main' : 'white',
                          color: msg.role === 'user' ? 'white' : 'text.primary'
                        }}
                      >
                        <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                          {msg.content}
                        </Typography>
                        {msg.context && (
                          <Chip
                            label={msg.context}
                            size="small"
                            sx={{ mt: 1, height: 20, fontSize: '0.7rem' }}
                          />
                        )}
                      </Card>
                      {msg.role === 'user' && (
                        <Avatar sx={{ width: 32, height: 32, bgcolor: '#7c4dff' }}>U</Avatar>
                      )}
                    </Box>
                  </ListItem>
                ))}
                <div ref={chatEndRef} />
              </List>
            </Box>

            <Box sx={{ p: 2, borderTop: '1px solid #e0e0e0' }}>
              <TextField
                fullWidth
                size="small"
                placeholder="질문을 입력하세요..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                InputProps={{
                  endAdornment: (
                    <IconButton size="small" onClick={handleSendMessage} disabled={!inputValue.trim()}>
                      <Send size={18} />
                    </IconButton>
                  )
                }}
              />
            </Box>
          </>
        )}
      </Box>

      {/* Term Definition Popover */}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {selectedTerm && (
          <Card sx={{ p: 2, maxWidth: 400 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              {selectedTerm.term}
            </Typography>
            <Divider sx={{ mb: 1 }} />
            <Typography variant="body2" sx={{ mb: 2 }}>
              {selectedTerm.definition}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
              이 논문에서의 맥락:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {selectedTerm.context}
            </Typography>
          </Card>
        )}
      </Popover>
    </Box>
  );
}
