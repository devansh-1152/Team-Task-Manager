export default function TaskCard({ task, onStatusChange, role }) {
  const getBadgeClass = (status) => {
    switch (status) {
      case 'completed': return 'badge completed';
      case 'in-progress': return 'badge progress';
      default: return 'badge pending';
    }
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'completed';

  return (
    <div className="glass-panel p-6 animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', border: isOverdue ? '1px solid var(--danger)' : '' }}>
      <div className="flex justify-between items-center">
        <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{task.title}</h3>
        <span className={getBadgeClass(task.status)}>{task.status}</span>
      </div>
      
      <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
        <p><strong>Project:</strong> {task.project?.name || 'N/A'}</p>
        {role === 'admin' && <p><strong>Assigned To:</strong> {task.assignedTo?.name || 'Unassigned'}</p>}
        {task.dueDate && (
          <p style={{ color: isOverdue ? 'var(--danger)' : 'inherit' }}>
            <strong>Due:</strong> {new Date(task.dueDate).toLocaleDateString()}
          </p>
        )}
      </div>

      <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
        <select 
          value={task.status} 
          onChange={(e) => onStatusChange(task._id, e.target.value)}
          style={{ marginBottom: 0, padding: '0.5rem', background: 'rgba(0,0,0,0.2)' }}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>
  );
}
