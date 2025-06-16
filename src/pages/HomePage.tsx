import React from "react";
import { useNavigate } from "react-router-dom";
import { FaClipboardList, FaRegIdBadge } from "react-icons/fa";
import { Box, Typography, Paper } from "@mui/material";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "แบบฟอร์มข้อมูลทั่วไป",
      description: "แบบฟอร์มสำหรับเก็บข้อมูลพื้นฐานเพื่อการติดต่อและการวิเคราะห์",
      icon: <FaClipboardList style={{ fontSize: '3rem', marginBottom: '1rem' }} />,
      route: "/forminfo",
    },
    {
      title: "แบบฟอร์มสำรวจความพึงพอใจบริการ",
      description: "แบบฟอร์มเพื่อตรวจสอบความคิดเห็นและความพึงพอใจในการให้บริการของเรา",
      icon: <FaRegIdBadge style={{ fontSize: '3rem', marginBottom: '1rem' }} />,
      route: "/formservice",
    },
  ];

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      mt: 5,
      px: 2
    }}>
      <Typography variant="h4" sx={{ 
        fontWeight: 'bold', 
        mb: 5,
        color: 'text.primary'
      }}>
        เลือกแบบฟอร์ม
      </Typography>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' },
        gap: 3,
        maxWidth: 'md',
        width: '100%'
      }}>
        {cards.map((card, index) => (
          <Box key={index} sx={{ flex: 1 }}>
            <Paper
              onClick={() => navigate(card.route)}
              sx={{
                p: 3,
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6,
                  bgcolor: 'action.hover'
                }
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                {card.icon}
              </Box>
              <Typography variant="h6" sx={{ 
                mt: 2,
                fontWeight: 'semibold',
                color: 'text.primary'
              }}>
                {card.title}
              </Typography>
              <Typography variant="body2" sx={{ 
                mt: 1,
                color: 'text.secondary'
              }}>
                {card.description}
              </Typography>
            </Paper>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default HomePage;

