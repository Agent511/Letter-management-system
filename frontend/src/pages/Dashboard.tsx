import { useEffect, useState } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { InboxIcon, OutboxIcon, CheckCircleIcon, ArchiveIcon } from '../components/ui/Icon';

export const Dashboard = () => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/analytics/summary')
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {
        // Fallback demo data if backend is down
        setStats({
          incoming_total: 124,
          outgoing_total: 86,
          pending_approvals: 12,
          archived_total: 45,
          incoming_by_status: [
            { status: 'received', count: 45 },
            { status: 'under_review', count: 30 },
            { status: 'approved', count: 40 },
            { status: 'archived', count: 9 },
          ],
          outgoing_by_priority: [
            { priority: 'urgent', count: 5 },
            { priority: 'high', count: 20 },
            { priority: 'normal', count: 50 },
            { priority: 'low', count: 11 },
          ]
        });
      });
  }, []);

  const cards = [
    { label: 'Incoming Letters', value: stats?.incoming_total ?? '—', icon: <InboxIcon size={24} />, color: 'from-blue-500 to-blue-600', bg: 'bg-blue-50', text: 'text-blue-600' },
    { label: 'Outgoing Letters', value: stats?.outgoing_total ?? '—', icon: <OutboxIcon size={24} />, color: 'from-emerald-500 to-emerald-600', bg: 'bg-emerald-50', text: 'text-emerald-600' },
    { label: 'Pending Approvals', value: stats?.pending_approvals ?? '—', icon: <CheckCircleIcon size={24} />, color: 'from-amber-500 to-amber-600', bg: 'bg-amber-50', text: 'text-amber-600' },
    { label: 'Archived Letters', value: stats?.archived_total ?? '—', icon: <ArchiveIcon size={24} />, color: 'from-violet-500 to-violet-600', bg: 'bg-violet-50', text: 'text-violet-600' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Overview Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">Central overview of letter activity and workflow metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {cards.map((c) => (
          <Card key={c.label} className="p-5 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-slate-500">{c.label}</p>
              <div className={`w-10 h-10 rounded-full ${c.bg} ${c.text} flex items-center justify-center`}>
                {c.icon}
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-800">{c.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card className="p-6">
          <h3 className="font-semibold text-slate-800 mb-6 flex items-center gap-2">
            Incoming by Status
          </h3>
          <div className="space-y-5">
            {stats?.incoming_by_status?.map((s: any) => (
              <div key={s.status}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <Badge label={s.status} />
                  <span className="font-semibold text-slate-700">{s.count}</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.min((s.count / (stats.incoming_total || 1)) * 100, 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-slate-800 mb-6 flex items-center gap-2">
            Outgoing by Priority
          </h3>
          <div className="space-y-5">
            {stats?.outgoing_by_priority?.map((s: any) => (
              <div key={s.priority}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <Badge label={s.priority} />
                  <span className="font-semibold text-slate-700">{s.count}</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${Math.min((s.count / (stats.outgoing_total || 1)) * 100, 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};