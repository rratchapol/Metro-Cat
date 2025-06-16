import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
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
import { useAuth } from "../context/AuthContext";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      try {
        await login("demo-token");
        navigate("/");
      } catch (err) {
        setError("เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
      }
    } else {
      setError("ชื่อผู้ใช้งาน หรือ รหัสผ่าน ไม่ถูกต้อง");
    }
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
            เข้าสู่ระบบ
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              label="ชื่อผู้ใช้งาน"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
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
              เข้าสู่ระบบ
            </Button>
          </Box>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                มีบัญชีอยู่แล้ว?{' '}
                <Link
                  component={RouterLink}
                  to="/register"
                  sx={{ 
                    color: 'primary.main',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                >
                  สมัครสมาชิก
                </Link>
              </Typography>
            </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;
