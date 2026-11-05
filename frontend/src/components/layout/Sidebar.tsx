import { NavLink } from 'react-router-dom';

const items = [
  { to: '/', label: 'Dashboard', icon: '📊' },
  { to: '/incoming', label: 'Incoming Letters', icon: '📥' },
  { to: '/outgoing', label: 'Outgoing Letters', icon: '📤' },
  { to: '/approvals', label: 'Approvals', icon: '✅' },
  { to: '/archive', label: 'Archive & Audit', icon: '🗄️' },
];

export const Sidebar = () => (
  <aside className="w-64 bg-slate-900 text-slate-100 min-h-screen flex flex-col shadow-xl">
    <div className="px-5 py-5 border-b border-slate-800/80">
      <h1 className="text-lg font-bold flex items-center gap-2">
        <span className="text-2xl">📨</span> LMS
      </h1>
      <p className="text-xs text-slate-400 mt-1">Letter Management System</p>
    </div>

    <nav className="flex-1 p-3 space-y-1">
      {items.map((it) => (
        <NavLink
          key={it.to}
          to={it.to}
          end={it.to === '/'}
          className={({ isActive }) =>
            `relative flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-150 ${
              isActive
                ? 'bg-blue-600 text-white shadow-md shadow-blue-900/40'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`
          }
        >
          <span className="text-base">{it.icon}</span>
          <span>{it.label}</span>
        </NavLink>
      ))}
    </nav>

    <div className="p-3 text-xs text-slate-500 border-t border-slate-800/80">
      v1.0 • ERP-ready
    </div>
  </aside>
);