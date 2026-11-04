import { useEffect, useState } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

export const Dashboard = () => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    // Python service for analytics (heavy math lives there)
    fetch('http://localhost:8000/api/analytics/summary')
      .then(r => r.json())
      .then(setStats)
      .catch(() => setStats(null));
  }, []);

  const cards = [
    { label: 'Incoming Letters', value: stats?.incoming_total ?? '—', icon: '📥', color: 'from-blue-500 to-blue-600' },
    { label: 'Outgoing Letters', value: stats?.outgoing_total ?? '—', icon: '📤', color: 'from-emerald-500 to-emerald-600' },
    { label: 'Pending Approvals', value: stats?.pending_approvals ?? '—', icon: '⏳', color: 'from-amber-500 to-amber-600' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-1">Dashboard</h1>
      <p className="text-sm text-slate-500 mb-6">Central overview of letter activity.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {cards.map(c => (
          <Card key={c.label} className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide">{c.label}</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{c.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${c.color} flex items-center justify-center text-2xl`}>
                {c.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-5">
            <h3 className="font-semibold text-slate-800 mb-3">Incoming by Status</h3>
            <ul className="space-y-2">
              {stats.incoming_by_status?.map((s: any) => (
                <li key={s.status} className="flex items-center justify-between text-sm">
                  <Badge label={s.status} />
                  <span className="font-medium text-slate-700">{s.count}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card className="p-5">
            <h3 className="font-semibold text-slate-800 mb-3">Outgoing by Priority</h3>
            <ul className="space-y-2">
              {stats.outgoing_by_priority?.map((s: any) => (
                <li key={s.priority} className="flex items-center justify-between text-sm">
                  <Badge label={s.priority} />
                  <span className="font-medium text-slate-700">{s.count}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      )}
    </div>
  );
};