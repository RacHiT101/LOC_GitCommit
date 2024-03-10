import { useCallback, useRef, useState } from "react";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline"; // Assuming you have EyeIcon and EyeOffIcon components
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
    } catch (e) {
      /* empty */
    } finally {
      setGettingSuggestion(false);
    }
  }, [fetchUsernameSuggestion]);

  const handleSubmit = async () => {
    const values = { username, email, password, categories };
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
      setCategories(categories.filter((item) => item !== subject));
    }
  };

  return (
    <div className="font-Poppins">
      <div className="space-x-2 my-1">
        <label htmlFor="username" className="block font-semibold">
          Username
        </label>
        <button
          onClick={getSuggestedUsername}
          className="text-sm text-[#10002b] text-right right-0"
          disabled={gettingSuggestion}
        >
          Get random name
        </button>
      </div>
      <input
        id="username"
        type="text"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
          baseName.current = e.target.value;
        }}
        className="w-full px-3 py-2 border rounded"
      />
      <div>
        <label htmlFor="email" className="block font-semibold">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="password" className="block font-semibold">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
          <button
            className="absolute top-0 right-0 px-2 py-1"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
      </div>
      <div className="space-y-2">
        <p className="font-semibold">What's your subject of interest?</p>
        <div className="space-y-2 grid grid-cols-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={categories.includes("Mathematics")}
              onChange={handleCheckboxChange("Mathematics")}
            />
            Mathematics
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={categories.includes("History")}
              onChange={handleCheckboxChange("History")}
            />
            History
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={categories.includes("Geography")}
              onChange={handleCheckboxChange("Geography")}
            />
            Geography
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={categories.includes("Science")}
              onChange={handleCheckboxChange("Science")}
            />
            Science
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={categories.includes("Psychology")}
              onChange={handleCheckboxChange("Psychology")}
            />
            Psychology
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={categories.includes("English Literature")}
              onChange={handleCheckboxChange("English Literature")}
            />
            Literature
          </label>
        </div>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex justify-between items-center my-4 space-x-4">
        <button
          onClick={handleSubmit}
          className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          disabled={signingUp}
        >
          Submit
        </button>
        <ThirdPartyLogin
          onError={() =>
            setError("Your email exists with different credential.")
          }
        />
      </div>
    </div>
  );
};

export default SignupForm;
