import { useEffect, useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { workflowApi } from '../services/api';

export const Approvals = () => {
  const [rows, setRows] = useState<any[]>([]);
  const load = () => workflowApi.list().then(setRows);
  useEffect(() => { load(); }, []);

  const act = async (id: number, action: 'approved' | 'rejected') => {
    await workflowApi.approve(id, { action, comments: '', approver_name: 'Manager' });
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-1">Approval Workflow</h1>
      <p className="text-sm text-slate-500 mb-6">Review and e-sign letters before distribution.</p>

      <div className="grid grid-cols-1 gap-3">
        {rows.length === 0 && (
          <Card className="p-6 text-center text-slate-400">No approval tasks yet.</Card>
        )}
        {rows.map(r => (
          <Card key={r.id} className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-800">
                {r.letter_type} letter #{r.letter_id}
              </p>
              <p className="text-xs text-slate-500">
                Approver: {r.approver_name} • Step {r.approval_order}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge label={r.status} />
              {r.status === 'pending' && (
                <>
                  <Button onClick={() => act(r.id, 'approved')}>Approve</Button>
                  <Button variant="danger" onClick={() => act(r.id, 'rejected')}>Reject</Button>
                </>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};