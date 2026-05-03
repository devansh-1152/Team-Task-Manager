import axios from "../api/axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("member");
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", { name, email, password, role });
      alert("Registered successfully. Please login.");
      navigate("/");
    } catch (err) {
      alert(err.response?.data || "Registration failed");
    }
  };

  return (
    <div className="flex items-center" style={{ justifyContent: 'center', height: '80vh' }}>
      <div className="glass-panel animate-fade-in" style={{ padding: '2.5rem', width: '100%', maxWidth: '400px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Create Account</h2>
        <form onSubmit={register} className="flex-col">
          <input placeholder="Name" required onChange={(e)=>setName(e.target.value)} />
          <input type="email" placeholder="Email" required onChange={(e)=>setEmail(e.target.value)} />
          <input type="password" placeholder="Password" required onChange={(e)=>setPassword(e.target.value)} />
          <select value={role} onChange={(e)=>setRole(e.target.value)} className="mb-4">
            <option value="member">Member</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" className="w-full mt-4">Register</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-secondary)' }}>
          Already have an account? <Link to="/" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Login</Link>
        </p>
      </div>
    </div>
  );
}