import { NavLink } from 'react-router-dom';
import { DashboardIcon, InboxIcon, OutboxIcon, CheckCircleIcon, ArchiveIcon } from '../ui/Icon';

const items = [
  { to: '/', label: 'Dashboard', icon: <DashboardIcon size={18} /> },
  { to: '/incoming', label: 'Incoming Letters', icon: <InboxIcon size={18} /> },
  { to: '/outgoing', label: 'Outgoing Letters', icon: <OutboxIcon size={18} /> },
  { to: '/approvals', label: 'Approvals', icon: <CheckCircleIcon size={18} /> },
  { to: '/archive', label: 'Archive & Audit', icon: <ArchiveIcon size={18} /> },
];

export const Sidebar = () => (
  <aside className="w-64 bg-slate-900 text-slate-100 min-h-screen flex flex-col shadow-xl">
    <div className="px-6 py-6 border-b border-slate-800 flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg">L</div>
      <div>
        <h1 className="text-base font-bold leading-tight">LMS</h1>
        <p className="text-[10px] text-slate-400 uppercase tracking-wider">Letter Management</p>
      </div>
    </div>

    <nav className="flex-1 p-4 space-y-1">
      {items.map((it) => (
        <NavLink
          key={it.to}
          to={it.to}
          end={it.to === '/'}
          className={({ isActive }) =>
            `relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              isActive
                ? 'bg-blue-600 text-white shadow-md shadow-blue-900/50'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`
          }
        >
          {it.icon}
          <span>{it.label}</span>
        </NavLink>
      ))}
    </nav>

    <div className="p-4 border-t border-slate-800">
      <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-800/50">
        <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">M</div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-white truncate">Manager</p>
          <p className="text-[10px] text-slate-400 truncate">Administrator</p>
        </div>
      </div>
    </div>
  </aside>
);