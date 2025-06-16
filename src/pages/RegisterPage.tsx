import React, { useState } from "react";
import type { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Alert,
  Link,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
    const handleClickconfirmPassword = () => {
      setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // ตรวจสอบรหัสผ่าน
    if (password !== confirmPassword) {
      setError("รหัสผ่านไม่ตรงกัน");
      return;
    }

    // ตรวจสอบความยาวรหัสผ่าน
    if (password.length < 6) {
      setError("รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร");
      return;
    }

    // ตรวจสอบความยาวชื่อผู้ใช้
    if (username.length < 3) {
      setError("ชื่อผู้ใช้ต้องมีความยาวอย่างน้อย 3 ตัวอักษร");
      return;
    }

    // TODO: เพิ่มการส่งข้อมูลไปยัง API
    console.log("Register data:", { username, password });
    
    // จำลองการลงทะเบียนสำเร็จ
    localStorage.setItem("token", "demo-token");
    navigate("/");
  };

  return (
    <Box sx={{ 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      bgcolor: 'background.default'
    }}>
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            bgcolor: 'background.paper'
          }}
        >
          <Typography
            variant="h5"
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
              mb: 3,
              color: 'text.primary'
            }}
          >
            สมัครสมาชิก
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              label="ชื่อผู้ใช้"
              value={username}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
              fullWidth
              required
              margin="normal"
              variant="outlined"
              sx={{
                '& .MuiInputLabel-root': {
                  color: 'text.secondary'
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'divider'
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.main'
                  }
                }
              }}
            />

            <TextField
              label="รหัสผ่าน"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              fullWidth
              required
              margin="normal"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                      sx={{ color: 'text.secondary' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiInputLabel-root': {
                  color: 'text.secondary'
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'divider'
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.main'
                  }
                }
              }}
            />

            <TextField
              label="ยืนยันรหัสผ่าน"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
              fullWidth
              required
              margin="normal"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickconfirmPassword}
                      edge="end"
                      sx={{ color: 'text.secondary' }}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiInputLabel-root': {
                  color: 'text.secondary'
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'divider'
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.main'
                  }
                }
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ 
                mt: 3,
                py: 1.5,
                '&:hover': {
                  bgcolor: 'primary.dark'
                }
              }}
            >
              สมัครสมาชิก
            </Button>

            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                มีบัญชีอยู่แล้ว?{' '}
                <Link 
                  component={RouterLink}
                  variant="body2"
                  // onClick={() => navigate('/login')}
                  to="/login"
                  sx={{ 
                    color: 'primary.main',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                >
                  เข้าสู่ระบบ
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default RegisterPage;
