import { useEffect, useState } from 'react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { Badge } from '../components/ui/Badge';
import { DataTable } from '../components/ui/DataTable';
import { IncomingLetterForm } from '../components/Incoming/IncomingLetterForm';
import { incomingApi } from '../services/api';
import { IncomingLetter } from '../types';

export const IncomingLetters = () => {
  const [rows, setRows] = useState<IncomingLetter[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<IncomingLetter | null>(null);
  const [preview, setPreview] = useState<IncomingLetter | null>(null);

  const load = () => incomingApi.list().then(setRows);
  useEffect(() => { load(); }, []);

  const handleSubmit = async (data: IncomingLetter) => {
    if (editing?.id) await incomingApi.update(editing.id, data);
    else await incomingApi.create(data);
    setFormOpen(false); setEditing(null); load();
  };

  const handleDelete = async (r: IncomingLetter) => {
    if (!r.id || !confirm(`Delete ${r.reference_no}?`)) return;
    await incomingApi.remove(r.id); load();
  };

  const printLetter = (r: IncomingLetter) => {
    const w = window.open('', '_blank');
    if (!w) return;
    w.document.write(`
      <html><head><title>${r.reference_no}</title>
      <style>body{font-family:Arial;padding:40px;max-width:800px;margin:auto}
      h1{font-size:22px;border-bottom:2px solid #333;padding-bottom:10px}
      table{width:100%;margin-top:20px;border-collapse:collapse}
      td{padding:8px;border-bottom:1px solid #ddd;font-size:14px}
      td:first-child{font-weight:bold;width:200px}</style></head><body>
      <h1>Incoming Letter — ${r.reference_no}</h1>
      <table>
        <tr><td>Sender</td><td>${r.sender_name} (${r.sender_organization})</td></tr>
        <tr><td>Recipient</td><td>${r.recipient_name}</td></tr>
        <tr><td>Department</td><td>${r.department}</td></tr>
        <tr><td>Subject</td><td>${r.subject}</td></tr>
        <tr><td>Description</td><td>${r.description}</td></tr>
        <tr><td>Letter Date</td><td>${r.letter_date}</td></tr>
        <tr><td>Received Date</td><td>${r.received_date}</td></tr>
        <tr><td>Status</td><td>${r.status}</td></tr>
        <tr><td>Priority</td><td>${r.priority}</td></tr>
      </table>
      <p style="margin-top:40px;font-size:12px;color:#777">Generated ${new Date().toLocaleString()}</p>
      </body></html>`);
    w.document.close();
    w.print();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
  <div>
    <h1 className="text-2xl font-bold text-slate-800">Incoming Letters</h1>
    <p className="text-sm text-slate-500 mt-1">
      Register, track and manage incoming correspondence.
    </p>
  </div>
  <Button icon="＋" onClick={() => { setEditing(null); setFormOpen(true); }}>
    New Incoming Letter
  </Button>
</div>

      <Card className="p-4">
        <DataTable
          data={rows}
          columns={[
            { header: 'Reference', accessor: r => <span className="font-mono text-xs">{r.reference_no}</span> },
            { header: 'Sender', accessor: r => <span>{r.sender_name}<br /><span className="text-xs text-slate-500">{r.sender_organization}</span></span> },
            { header: 'Subject', accessor: r => <span className="line-clamp-1">{r.subject}</span> },
            { header: 'Received', accessor: r => r.received_date },
            { header: 'Status', accessor: r => <Badge label={r.status} /> },
            { header: 'Priority', accessor: r => <Badge label={r.priority} /> },
          ]}
          onPreview={setPreview}
          onEdit={r => { setEditing(r); setFormOpen(true); }}
          onPrint={printLetter}
          onDelete={handleDelete}
        />
      </Card>

      <Modal
        open={formOpen}
        title={editing ? `Edit ${editing.reference_no}` : 'New Incoming Letter'}
        onClose={() => { setFormOpen(false); setEditing(null); }}
      >
        <IncomingLetterForm
          initial={editing || undefined}
          onSubmit={handleSubmit}
          onCancel={() => { setFormOpen(false); setEditing(null); }}
        />
      </Modal>

      <Modal open={!!preview} title="Letter Preview" onClose={() => setPreview(null)}>
        {preview && (
          <div className="space-y-3 text-sm">
            {[
              ['Reference', preview.reference_no],
              ['Sender', `${preview.sender_name} (${preview.sender_organization})`],
              ['Recipient', preview.recipient_name],
              ['Department', preview.department],
              ['Subject', preview.subject],
              ['Description', preview.description],
              ['Letter Date', preview.letter_date],
              ['Received Date', preview.received_date],
              ['Status', preview.status],
              ['Priority', preview.priority],
            ].map(([k, v]) => (
              <div key={k} className="grid grid-cols-3 gap-2 border-b border-slate-100 py-2">
                <span className="text-slate-500 font-medium">{k}</span>
                <span className="col-span-2 text-slate-800">{v || '—'}</span>
              </div>
            ))}
            <div className="flex justify-end pt-2">
              <Button onClick={() => printLetter(preview)}>🖨 Print</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};