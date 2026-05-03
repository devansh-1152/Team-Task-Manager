import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <nav className="glass-panel" style={{ margin: '1rem 2rem', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link to="/dashboard" style={{ textDecoration: 'none' }}>
        <h2 style={{ margin: 0, fontSize: '1.5rem' }}>TaskManager</h2>
      </Link>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        {!token ? (
          <>
            <Link to="/" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Login</Link>
            <Link to="/register" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Register</Link>
          </>
        ) : (
          <>
            <span className="badge progress" style={{ textTransform: 'uppercase' }}>{role}</span>
            <button className="secondary" onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}