import { useEffect, useState } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { incomingApi, outgoingApi } from '../services/api';

export const Archive = () => {
  const [incoming, setIncoming] = useState<any[]>([]);
  const [outgoing, setOutgoing] = useState<any[]>([]);
  const [q, setQ] = useState('');

  useEffect(() => {
    incomingApi.list().then(setIncoming);
    outgoingApi.list().then(setOutgoing);
  }, []);

  const filter = (arr: any[]) =>
    arr.filter(r =>
      [r.reference_no, r.subject, r.sender_name, r.recipient_name]
        .join(' ').toLowerCase().includes(q.toLowerCase())
    );

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-1">Archive & Audit Trail</h1>
      <p className="text-sm text-slate-500 mb-6">
        Searchable archive with compliance-ready history.
      </p>

      <div className="mb-4">
        <input
          className="w-full md:w-96 px-3 py-2 border border-slate-300 rounded-md text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Search by reference, subject, sender, recipient..."
          value={q}
          onChange={e => setQ(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-4">
          <h3 className="font-semibold text-slate-800 mb-3">📥 Incoming ({filter(incoming).length})</h3>
          <ul className="space-y-2 text-sm">
            {filter(incoming).slice(0, 30).map(r => (
              <li key={r.id} className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div>
                  <span className="font-mono text-xs text-slate-500">{r.reference_no}</span>
                  <p className="text-slate-700">{r.subject}</p>
                </div>
                <Badge label={r.status} />
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold text-slate-800 mb-3">📤 Outgoing ({filter(outgoing).length})</h3>
          <ul className="space-y-2 text-sm">
            {filter(outgoing).slice(0, 30).map(r => (
              <li key={r.id} className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div>
                  <span className="font-mono text-xs text-slate-500">{r.reference_no}</span>
                  <p className="text-slate-700">{r.subject}</p>
                </div>
                <Badge label={r.status} />
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
};