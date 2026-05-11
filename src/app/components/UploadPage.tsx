import { Box, Card, CardContent, Typography, Button, LinearProgress, Alert } from '@mui/material';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';

interface UploadPageProps {
  onNavigate: (view: string, paperId?: string) => void;
}

export function UploadPage({ onNavigate }: UploadPageProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [fileName, setFileName] = useState('');

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      simulateUpload();
    }
  };

  const simulateUpload = () => {
    setUploading(true);
    setUploadStatus('uploading');
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          setUploadStatus('success');
          setTimeout(() => {
            onNavigate('paper', 'new-paper-id');
          }, 2000);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <Box sx={{ p: 4, bgcolor: '#f5f5f5', minHeight: 'calc(100vh - 64px)' }}>
      <Box sx={{ maxWidth: 800, mx: 'auto' }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
          논문 업로드
        </Typography>

        <Card>
          <CardContent sx={{ p: 4 }}>
            <Box
              sx={{
                border: '2px dashed #1976d2',
                borderRadius: 2,
                p: 6,
                textAlign: 'center',
                bgcolor: '#f5f9ff',
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: '#e3f2fd',
                  borderColor: '#1565c0'
                }
              }}
              onClick={() => document.getElementById('file-input')?.click()}
            >
              <Upload size={64} color="#1976d2" style={{ margin: '0 auto 16px' }} />
              <Typography variant="h6" sx={{ mb: 1 }}>
                PDF 파일을 선택하세요
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                또는 파일을 이곳에 드래그하세요
              </Typography>
              <Button variant="contained" component="label">
                파일 선택
                <input
                  id="file-input"
                  type="file"
                  hidden
                  accept=".pdf"
                  onChange={handleFileSelect}
                />
              </Button>
            </Box>

            {uploadStatus !== 'idle' && (
              <Box sx={{ mt: 4 }}>
                {uploadStatus === 'uploading' && (
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <FileText size={24} color="#1976d2" />
                      <Typography variant="body1">{fileName}</Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={uploadProgress}
                      sx={{ height: 8, borderRadius: 1, mb: 1 }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      업로드 중... {uploadProgress}%
                    </Typography>
                  </Box>
                )}

                {uploadStatus === 'success' && (
                  <Alert
                    icon={<CheckCircle size={24} />}
                    severity="success"
                    sx={{ alignItems: 'center' }}
                  >
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        업로드 완료!
                      </Typography>
                      <Typography variant="body2">
                        논문을 분석하고 있습니다. 잠시 후 상세 페이지로 이동합니다...
                      </Typography>
                    </Box>
                  </Alert>
                )}

                {uploadStatus === 'error' && (
                  <Alert
                    icon={<AlertCircle size={24} />}
                    severity="error"
                    sx={{ alignItems: 'center' }}
                  >
                    <Typography variant="body1">
                      업로드에 실패했습니다. 다시 시도해주세요.
                    </Typography>
                  </Alert>
                )}
              </Box>
            )}
          </CardContent>
        </Card>

        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              업로드 가이드
            </Typography>
            <Box component="ul" sx={{ pl: 2 }}>
              <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                PDF 형식의 논문 파일만 업로드 가능합니다
              </Typography>
              <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                최대 파일 크기는 50MB입니다
              </Typography>
              <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                스캔본보다는 텍스트 추출이 가능한 PDF를 권장합니다
              </Typography>
              <Typography component="li" variant="body2">
                업로드 후 AI 분석에 1-2분 정도 소요될 수 있습니다
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
