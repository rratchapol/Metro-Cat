import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  Autocomplete,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import { useNavigate } from "react-router-dom";

const InfoFormPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [dob, setDob] = useState<Dayjs | null>(null);
  const [interests, setInterests] = useState<string[]>([]);
  const [bio, setBio] = useState("");
  const [additional, setAdditional] = useState("");

  const interestOptions = ["กีฬา", "ดนตรี", "ศิลปะ", "อ่านหนังสือ", "ท่องเที่ยว", "เกม"];
  const skillOptions = ["React", "Node.js", "Python", "Vue", "Django", "Angular"];
  const countryOptions = ["", "ไทย", "ญี่ปุ่น", "สหรัฐอเมริกา"];
  const genderOptions = ["ชาย", "หญิง", "ไม่ระบุ"];
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const formData = {
      fullName,
      email,
      phone,
      gender,
      country,
      skills,
      dateOfBirth: dob ? dob.format("YYYY-MM-DD") : null,
      interests,
      bio,
      additional,
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
        <Typography variant="h5" sx={{ 
          fontWeight: 'bold',
          color: 'text.primary',
          mb: 1
        }}>
          แบบฟอร์มขอข้อมูลทั่วไป
        </Typography>
        <Typography variant="body2" sx={{ 
          color: 'text.secondary',
          mb: 4
        }}>
          แบบฟอร์มสำหรับเก็บข้อมูลพื้นฐานเพื่อการติดต่อและการวิเคราะห์
        </Typography>

        <TextField
          label="ชื่อ-นามสกุล"
          required
          fullWidth
          margin="normal"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <TextField
          label="อีเมล"
          type="email"
          required
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="เบอร์โทรศัพท์"
          type="tel"
          fullWidth
          margin="normal"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <FormControl margin="normal">
          <FormLabel>เพศ</FormLabel>
          <RadioGroup row value={gender} onChange={(e) => setGender(e.target.value)}>
            {genderOptions.map((g) => (
              <FormControlLabel key={g} value={g} control={<Radio />} label={g} />
            ))}
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset" margin="normal">
          <FormLabel>ความสนใจ</FormLabel>
          <FormGroup row>
            {interestOptions.map((interest) => (
              <FormControlLabel
                key={interest}
                control={
                  <Checkbox
                    checked={interests.includes(interest)}
                    onChange={(e) =>
                      setInterests((prev) =>
                        e.target.checked
                          ? [...prev, interest]
                          : prev.filter((i) => i !== interest)
                      )
                    }
                  />
                }
                label={interest}
              />
            ))}
          </FormGroup>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <FormLabel>ประเทศ</FormLabel>
          <Select
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
            displayEmpty
          >
            <MenuItem value="">-- เลือกประเทศ --</MenuItem>
            {countryOptions.slice(1).map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Autocomplete
          multiple
          options={skillOptions}
          value={skills}
          onChange={(_, value) => setSkills(value)}
          renderInput={(params) => (
            <TextField {...params} label="ทักษะ (เลือกได้หลายอย่าง)" margin="normal" />
          )}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="วันเกิด"
            value={dob}
            onChange={(newValue) => setDob(newValue)}
            slotProps={{
              textField: { fullWidth: true, required: true, margin: "normal" },
            }}
          />
        </LocalizationProvider>

        <TextField
          label="ประวัติส่วนตัว/ข้อความเพิ่มเติม"
          multiline
          rows={3}
          fullWidth
          margin="normal"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        <Accordion sx={{ mt: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: 'medium' }}>
              ข้อมูลเพิ่มเติม (คลิกเพื่อขยาย/ยุบ)
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              label="รายละเอียดเพิ่มเติม"
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              value={additional}
              onChange={(e) => setAdditional(e.target.value)}
            />
          </AccordionDetails>
        </Accordion>

        <Box sx={{ mt: 4 }}>
          <Button type="submit" fullWidth variant="contained" color="primary">
            ส่งข้อมูล
          </Button>
        </Box>

        {submitted && (
          <Typography color="success.main" align="center" sx={{ mt: 4 }}>
            ส่งข้อมูลสำเร็จแล้ว!
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default InfoFormPage;
