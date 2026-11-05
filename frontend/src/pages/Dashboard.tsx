import { useEffect, useState } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

export const Dashboard = () => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/analytics/summary')
      .then((r) => r.json())
      .then(setStats)
      .catch(() => setStats(null));
  }, []);

  const cards = [
    { label: 'Incoming Letters', value: stats?.incoming_total ?? '—', icon: '📥', color: 'from-blue-500 to-indigo-600' },
    { label: 'Outgoing Letters', value: stats?.outgoing_total ?? '—', icon: '📤', color: 'from-emerald-500 to-teal-600' },
    { label: 'Pending Approvals', value: stats?.pending_approvals ?? '—', icon: '⏳', color: 'from-amber-500 to-orange-600' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">Central overview of letter activity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {cards.map((c) => (
          <Card
            key={c.label}
            className="p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {c.label}
                </p>
                <p className="text-3xl font-bold text-slate-800 mt-2">{c.value}</p>
              </div>
              <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center text-2xl shadow-lg`}
              >
                {c.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Card className="p-5">
            <h3 className="font-semibold text-slate-800 mb-4">Incoming by Status</h3>
            <ul className="space-y-3">
              {stats.incoming_by_status?.map((s: any) => (
                <li key={s.status} className="flex items-center justify-between text-sm">
                  <Badge label={s.status} />
                  <span className="font-semibold text-slate-700 tabular-nums">{s.count}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card className="p-5">
            <h3 className="font-semibold text-slate-800 mb-4">Outgoing by Priority</h3>
            <ul className="space-y-3">
              {stats.outgoing_by_priority?.map((s: any) => (
                <li key={s.priority} className="flex items-center justify-between text-sm">
                  <Badge label={s.priority} />
                  <span className="font-semibold text-slate-700 tabular-nums">{s.count}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      )}
    </div>
  );
};