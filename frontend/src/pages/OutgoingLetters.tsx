import { useEffect, useState } from 'react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { Badge } from '../components/ui/Badge';
import { DataTable } from '../components/ui/DataTable';
import { OutgoingLetterForm } from '../components/Outgoing/OutgoingLetterForm';
import { PlusIcon, PrintIcon } from '../components/ui/Icon';
import { outgoingApi } from '../services/api';
import { OutgoingLetter } from '../types';

export const OutgoingLetters = () => {
  const [rows, setRows] = useState<OutgoingLetter[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<OutgoingLetter | null>(null);
  const [preview, setPreview] = useState<OutgoingLetter | null>(null);

  const load = () => outgoingApi.list().then(setRows);
  useEffect(() => { load(); }, []);

  const handleSubmit = async (data: OutgoingLetter) => {
    if (editing?.id) await outgoingApi.update(editing.id, data);
    else await outgoingApi.create(data);
    setFormOpen(false); setEditing(null); load();
  };

  const handleDelete = async (r: OutgoingLetter) => {
    if (!r.id || !confirm(`Delete ${r.reference_no}?`)) return;
    await outgoingApi.remove(r.id); load();
  };

  const printLetter = (r: OutgoingLetter) => {
    const w = window.open('', '_blank');
    if (!w) return;
    w.document.write(`
      <html><head><title>${r.reference_no}</title>
      <style>body{font-family:Arial;padding:40px;max-width:800px;margin:auto}
      h1{font-size:22px;border-bottom:2px solid #333;padding-bottom:10px}
      table{width:100%;margin-top:20px;border-collapse:collapse}
      td{padding:8px;border-bottom:1px solid #ddd;font-size:14px}
      td:first-child{font-weight:bold;width:200px}</style></head><body>
      <h1>Outgoing Letter — ${r.reference_no}</h1>
      <table>
        <tr><td>Recipient</td><td>${r.recipient_name} (${r.recipient_organization})</td></tr>
        <tr><td>Sender</td><td>${r.sender_name}</td></tr>
        <tr><td>Department</td><td>${r.department}</td></tr>
        <tr><td>Subject</td><td>${r.subject}</td></tr>
        <tr><td>Remarks</td><td>${r.remarks || '—'}</td></tr>
        <tr><td>Letter Date</td><td>${r.letter_date}</td></tr>
        <tr><td>Delivery Channel</td><td>${r.delivery_channel}</td></tr>
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
          <h1 className="text-2xl font-bold text-slate-800">Outgoing Letters</h1>
          <p className="text-sm text-slate-500 mt-1">Compose, approve and distribute outgoing correspondence.</p>
        </div>
        <Button icon={<PlusIcon />} onClick={() => { setEditing(null); setFormOpen(true); }}>
          New Outgoing Letter
        </Button>
      </div>

      <Card className="p-0 overflow-hidden border-none shadow-sm">
        <DataTable
          data={rows}
          columns={[
            { header: 'Reference', accessor: r => <span className="font-mono text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded">{r.reference_no}</span> },
            { header: 'Recipient', accessor: r => <span className="font-medium text-slate-800">{r.recipient_name}<br /><span className="text-xs font-normal text-slate-500">{r.recipient_organization}</span></span> },
            { header: 'Subject', accessor: r => <span className="line-clamp-1 max-w-[200px]">{r.subject}</span> },
            { header: 'Channel', accessor: r => <span className="capitalize">{r.delivery_channel.replace('_', ' ')}</span> },
            { header: 'Status', accessor: r => <Badge label={r.status} /> },
            { header: 'Priority', accessor: r => <Badge label={r.priority} /> },
          ]}
          onPreview={setPreview}
          onEdit={r => { setEditing(r); setFormOpen(true); }}
          onPrint={printLetter}
          onDelete={handleDelete}
        />
      </Card>

      <Modal open={formOpen} title={editing ? `Edit ${editing.reference_no}` : 'New Outgoing Letter'} onClose={() => { setFormOpen(false); setEditing(null); }}>
        <OutgoingLetterForm initial={editing || undefined} onSubmit={handleSubmit} onCancel={() => { setFormOpen(false); setEditing(null); }} />
      </Modal>

      <Modal open={!!preview} title="Letter Preview" onClose={() => setPreview(null)}>
        {preview && (
          <div className="space-y-4 text-sm">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 grid grid-cols-2 gap-4">
              {[
                ['Reference', preview.reference_no],
                ['Recipient', `${preview.recipient_name} (${preview.recipient_organization})`],
                ['Sender', preview.sender_name],
                ['Department', preview.department],
                ['Subject', preview.subject],
                ['Letter Date', preview.letter_date],
                ['Delivery Channel', preview.delivery_channel.replace('_', ' ')],
                ['Status', preview.status],
                ['Priority', preview.priority],
              ].map(([k, v]) => (
                <div key={k}>
                  <span className="block text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-0.5">{k}</span>
                  <span className="text-slate-800 font-medium">{v || '—'}</span>
                </div>
              ))}
            </div>
            <div>
              <span className="block text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-1">Remarks</span>
              <p className="text-slate-700 bg-slate-50 p-3 rounded-md border border-slate-100">{preview.remarks || 'No remarks provided.'}</p>
            </div>
            <div className="flex justify-end pt-2">
              <Button icon={<PrintIcon size={16} />} onClick={() => printLetter(preview)}>Print Letter</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};