/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useCallback, useRef, useState } from "react";
import {
  InputLabel,
  Box,
  FormHelperText,
  OutlinedInput,
  InputAdornment,
  IconButton,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormControl,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ThirdPartyLogin from "./ThirdPartyLogin.jsx";
import { useFetchUsernameSuggestion } from "../../api/user-api.js";

const SignupForm = ({ onSubmit }) => {
  const [error, setError] = useState("");
  const [signingUp, setSigningUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [gettingSuggestion, setGettingSuggestion] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [categories, setCategories] = useState([]);

  const baseName = useRef("");

  const fetchUsernameSuggestion = useFetchUsernameSuggestion();

  const getSuggestedUsername = useCallback(async () => {
    setGettingSuggestion(true);
    try {
      const username = await fetchUsernameSuggestion(
        baseName.current.replaceAll(" ", "") === ""
          ? undefined
          : baseName.current
      );
      setUsername(username);
    } catch (e) { /* empty */ } finally {
      setGettingSuggestion(false);
    }
  }, [fetchUsernameSuggestion]);

  const handleSubmit = async () => {
    const values = { username, email, password, categories };
    console.log("SignUpForm:" ,categories);
    if (Object.values(values).some((v) => v.length === 0)) {
      setError("Please complete all fields");
      return;
    } else if (values.password.length < 8) {
      setError("Password must contain at least 8 characters");
      return;
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      setError("Invalid email address");
      return;
    }

    setSigningUp(true);
    try {
      await onSubmit(values);
    } catch (e) {
      if (e.message.includes("auth/email-already-in-use")) {
        setError("Email is already taken");
      } else {
        setError(e.message);
      }
    } finally {
      setSigningUp(false);
    }
  };

  const handleCheckboxChange = (subject) => (event) => {
    if (event.target.checked) {
      setCategories([...categories, subject]);
    } else {
      setCategories(categories.filter(item => item !== subject));
    }
  };

  console.log(categories);

  return (
    <Box>
      <Box sx={{ mb: { xs: 1, md: 2 } }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <InputLabel>Username</InputLabel>
          <LoadingButton
            loading={gettingSuggestion}
            variant={"text"}
            onClick={getSuggestedUsername}
          >
            Get random name
          </LoadingButton>
        </Box>
        <TextField
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            baseName.current = e.target.value;
          }}
        />
      </Box>
      <Box sx={{ mb: { xs: 1, md: 2 } }}>
        <InputLabel>Email</InputLabel>
        <TextField value={email} onChange={(e) => setEmail(e.target.value)} />
      </Box>
      <Box sx={{ mb: { xs: 1, md: 2 } }}>
        <InputLabel>Password</InputLabel>
        <OutlinedInput
          name={password}
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position={"end"}>
              <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          }
        />
      </Box>
      <div>
        <Box sx={{ width: 400, bgcolor: 'background.paper', p: 2 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            What's your subject of interest?
          </Typography>
          <FormControl component="fieldset">
            <FormGroup row>
              {/* <Box sx={{ display: 'flex', flexDirection: 'column' }}> */}
                <FormControlLabel
                  control={<Checkbox />}
                  label="Mathematics"
                  onChange={handleCheckboxChange("Mathematics")}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="History"
                  onChange={handleCheckboxChange("History")}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Geography"
                  onChange={handleCheckboxChange("Geography")}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Science"
                  onChange={handleCheckboxChange("Science")}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Psychology"
                  onChange={handleCheckboxChange("Psychology")}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Literature"
                  onChange={handleCheckboxChange("English Literature")}
                />
              {/* </Box> */}
            </FormGroup>
          </FormControl>
        </Box>
      <Box>
        
        
      </Box>
    </div>
      <Box>
        <FormHelperText>{error}</FormHelperText>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row-reverse",
          },
          justifyContent: "space-between",
          alignItems: {
            xs: "flex-end",
            md: "center",
          },
        }}
      >
        <LoadingButton
          onClick={handleSubmit}
          loading={signingUp}
          variant={"contained"}
          sx={{
            width: { xs: "100%", md: "auto" },
            mb: 2,
          }}
        >
          Submit
        </LoadingButton>
        <ThirdPartyLogin
          onError={() =>
            setError("Your email exists with different credential.")
          }
        />
      </Box>
    </Box>
  );
};

export default SignupForm;
