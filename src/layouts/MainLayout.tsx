import React from "react";
import NavBar from "../components/NavBar";
import { Box } from "@mui/material";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Box 
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        transition: 'background-color 0.2s ease-in-out'
      }}
    >
      <NavBar />
      <main className="p-4 max-w-4xl mx-auto w-full">
        {children}
      </main>
    </Box>
  );
};

export default MainLayout;
