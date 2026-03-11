import { useState } from "react";
import axios from "axios";
import "./style.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

function App() {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getStatusClass = () => {
    if (status.includes("Processing")) return "processing";
    if (status.includes("Success")) return "success";
    if (status.includes("Error")) return "error";
    return "";
  };

  const handleSubmit = async () => {
    if (!file || !email) {
      setStatus("Please fill in all fields");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("email", email);

    try {
      setIsLoading(true);
      setStatus("Processing...");
      await axios.post(`${API_URL}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setStatus("Success! Email sent.");
      setFile(null);
      setEmail("");
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "An error occurred";
      setStatus(`Error: ${errorMsg}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Sales Insight Automator</h2>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        disabled={isLoading}
      />
      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading}
      />

      <button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? "Processing..." : "Generate Summary"}
      </button>

      {status && <p className={`status ${getStatusClass()}`}>{status}</p>}
    </div>
  );
}

export default App;