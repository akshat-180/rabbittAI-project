import { useState } from "react";
import axios from "axios";
import "./style.css";

function App() {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async () => {
    if (!file || !email) {
      setStatus("Fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("email", email);

    try {
      setStatus("Processing...");
      await axios.post("http://localhost:8000/upload", formData);
      setStatus("Success! Email sent.");
    } catch {
      setStatus("Error occurred");
    }
  };

  return (
    <div className="container">
      <h2>Sales Insight Automator</h2>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <input
        type="email"
        placeholder="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={handleSubmit}>Generate Summary</button>

      <p
  className={`status ${
    status.includes("Processing")
      ? "processing"
      : status.includes("Error")
      ? "error"
      : status
      ? "success"
      : ""
  }`}
>
  {status}
</p>
    </div>
  );
}

export default App;