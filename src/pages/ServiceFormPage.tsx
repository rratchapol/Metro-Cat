import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import { useNavigate } from "react-router-dom";

const ServiceFormPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  // --- States ---
  const [serviceQuality, setServiceQuality] = useState<string>("");
  const [feedbackDate, setFeedbackDate] = useState<Dayjs | null>(null);
  const [overallFeedback, setOverallFeedback] = useState<string>("");
  const [improvementSuggestions, setImprovementSuggestions] = useState<string[]>([""]);
  const [additionalInfo, setAdditionalInfo] = useState<string>("");

  // --- Handlers ---
  const handleImprovementChange = (index: number, value: string) => {
    setImprovementSuggestions((prev) =>
      prev.map((item, i) => (i === index ? value : item))
    );
  };

  const addImprovement = () => {
    setImprovementSuggestions((prev) => [...prev, ""]);
  };

  const removeImprovement = (index: number) => {
    setImprovementSuggestions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // ตรวจสอบว่ามีค่าที่จำเป็นไหม
    if (!serviceQuality || !feedbackDate) {
      alert("กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน");
      return;
    }

    const formData = {
      serviceQuality,
      feedbackDate: feedbackDate.format("YYYY-MM-DD"),
      overallFeedback,
      improvementSuggestions: improvementSuggestions.filter((s) => s.trim() !== ""),
      additionalInfo,
    };

    console.log("ส่งข้อมูล :", formData);
    navigate("/");
  };

  return (
    <Box sx={{ 
      // minHeight: '100vh',
      // display: 'flex',
      // alignItems: 'center',
      // justifyContent: 'center',
      // bgcolor: 'background.default',
      py: 4,
      // px: 2
    }}>
      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: '100%',
          maxWidth: '800px',
          p: 4,
          borderRadius: 2,
          boxShadow: 3
        }}
      >
        {/* Header */}
        <Typography variant="h5" sx={{ 
          fontWeight: 'bold',
          color: 'text.primary',
          mb: 1
        }}>
          แบบฟอร์มสำรวจความพึงพอใจบริการ
        </Typography>
        <Typography variant="body2" sx={{ 
          color: 'text.secondary',
          mb: 4
        }}>
          แบบฟอร์มเพื่อสำรวจความคิดเห็นและความพึงพอใจในการให้บริการของเรา
        </Typography>

        {/* Service Quality */}
        <FormControl fullWidth margin="normal" required>
          <FormLabel>คุณภาพการบริการ *</FormLabel>
          <Select
            value={serviceQuality}
            onChange={(e) => setServiceQuality(e.target.value)}
            displayEmpty
          >
            <MenuItem value="">-- กรุณาเลือก --</MenuItem>
            <MenuItem value="ดีมาก">ดีมาก</MenuItem>
            <MenuItem value="ดี">ดี</MenuItem>
            <MenuItem value="พอใช้">พอใช้</MenuItem>
            <MenuItem value="ควรปรับปรุง">ควรปรับปรุง</MenuItem>
          </Select>
        </FormControl>

        {/* Date */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="วันที่ให้ข้อเสนอแนะ *"
            value={feedbackDate}
            onChange={(newValue) => setFeedbackDate(newValue)}
            slotProps={{
              textField: { fullWidth: true, required: true, margin: "normal" },
            }}
          />
        </LocalizationProvider>

        {/* Overall Feedback */}
        <TextField
          label="ข้อเสนอแนะโดยรวม"
          multiline
          rows={3}
          fullWidth
          margin="normal"
          value={overallFeedback}
          onChange={(e) => setOverallFeedback(e.target.value)}
        />

        {/* Improvement Suggestions */}
        <Typography variant="subtitle1" sx={{ mt: 4, color: 'text.primary' }}>
          ข้อเสนอแนะในการปรับปรุง (หากมี)
        </Typography>

        {improvementSuggestions.map((value, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <TextField
              fullWidth
              value={value}
              onChange={(e) => handleImprovementChange(index, e.target.value)}
              placeholder={`ข้อเสนอแนะ #${index + 1}`}
            />
            {improvementSuggestions.length > 1 && (
              <IconButton
                aria-label="ลบ"
                onClick={() => removeImprovement(index)}
                color="error"
                sx={{ ml: 1 }}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </Box>
        ))}

        <Box sx={{ mt: 2 }}>
          <Button onClick={addImprovement} variant="outlined">
            เพิ่มข้อเสนอแนะ
          </Button>
        </Box>

        {/* Additional Info */}
        <Accordion sx={{ mt: 4 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: 'medium', color: 'text.primary' }}>
              ข้อมูลเพิ่มเติม (คลิกเพื่อขยาย/ยุบ)
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              label="รายละเอียดเพิ่มเติม"
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              multiline
              rows={4}
              fullWidth
              variant="outlined"
            />
          </AccordionDetails>
        </Accordion>

        {/* Submit */}
        <Box sx={{ mt: 4 }}>
          <Button type="submit" fullWidth variant="contained" color="primary">
            ส่งข้อมูล
          </Button>
        </Box>

        {/* Success Message */}
        {submitted && (
          <Typography color="success.main" align="center" sx={{ mt: 4 }}>
            ส่งข้อมูลสำเร็จแล้ว!
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default ServiceFormPage;
