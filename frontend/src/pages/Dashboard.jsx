import { useEffect, useState } from "react";
import axios from "../api/axios";
import TaskCard from "../components/TaskCard";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  
  const [newTask, setNewTask] = useState({ title: '', project: '', assignedTo: '', dueDate: '' });
  const [newProject, setNewProject] = useState("");
  
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const fetchAll = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      const [taskRes, projectRes] = await Promise.all([
        axios.get("/tasks", config),
        axios.get("/projects", config)
      ]);
      
      setTasks(taskRes.data);
      setProjects(projectRes.data);
      
      if (role === 'admin') {
        const userRes = await axios.get("/users", config);
        setUsers(userRes.data);
      }
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  useEffect(() => {
    if (token) fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/tasks", newTask, { headers: { Authorization: `Bearer ${token}` } });
      setNewTask({ title: '', project: '', assignedTo: '', dueDate: '' });
      fetchAll();
    } catch (err) {
      alert("Error creating task");
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/projects", { name: newProject }, { headers: { Authorization: `Bearer ${token}` } });
      setNewProject("");
      fetchAll();
    } catch (err) {
      alert("Error creating project");
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`/tasks/${id}`, { status }, { headers: { Authorization: `Bearer ${token}` } });
      fetchAll();
    } catch (err) {
      alert("Error updating status");
    }
  };

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    overdue: tasks.filter(t => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'completed').length
  };

  return (
    <div className="flex-col gap-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2>Dashboard</h2>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="glass-panel p-6 text-center">
          <h3>Total Tasks</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--accent)' }}>{stats.total}</p>
        </div>
        <div className="glass-panel p-6 text-center">
          <h3>Completed</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--success)' }}>{stats.completed}</p>
        </div>
        <div className="glass-panel p-6 text-center" style={{ border: stats.overdue > 0 ? '1px solid var(--danger)' : '' }}>
          <h3>Overdue</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: stats.overdue > 0 ? 'var(--danger)' : 'var(--text-primary)' }}>{stats.overdue}</p>
        </div>
      </div>

      {role === 'admin' && (
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="glass-panel p-6">
            <h3>Create Project</h3>
            <form onSubmit={handleCreateProject} className="flex gap-4 mt-4">
              <input 
                value={newProject} 
                onChange={e => setNewProject(e.target.value)} 
                placeholder="Project Name" 
                required 
                style={{ marginBottom: 0 }}
              />
              <button type="submit" style={{ whiteSpace: 'nowrap' }}>Create</button>
            </form>
          </div>

          <div className="glass-panel p-6">
            <h3>Create Task</h3>
            <form onSubmit={handleCreateTask} className="flex-col mt-4">
              <input 
                value={newTask.title} 
                onChange={e => setNewTask({...newTask, title: e.target.value})} 
                placeholder="Task Title" 
                required 
              />
              <div className="flex gap-4">
                <select 
                  value={newTask.project} 
                  onChange={e => setNewTask({...newTask, project: e.target.value})} 
                  required
                >
                  <option value="">Select Project</option>
                  {projects.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
                </select>
                <select 
                  value={newTask.assignedTo} 
                  onChange={e => setNewTask({...newTask, assignedTo: e.target.value})} 
                  required
                >
                  <option value="">Assign To</option>
                  {users.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
                </select>
              </div>
              <input 
                type="date" 
                value={newTask.dueDate} 
                onChange={e => setNewTask({...newTask, dueDate: e.target.value})} 
                required 
              />
              <button type="submit">Create Task</button>
            </form>
          </div>
        </div>
      )}

      <h3>Tasks</h3>
      <div className="grid grid-cols-3 gap-6">
        {tasks.map(task => (
          <TaskCard key={task._id} task={task} onStatusChange={handleStatusChange} role={role} />
        ))}
        {tasks.length === 0 && <p style={{ color: 'var(--text-secondary)' }}>No tasks found.</p>}
      </div>
    </div>
  );
}