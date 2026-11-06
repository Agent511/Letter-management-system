import React, { useState } from 'react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { FileUpload } from '../ui/FileUpload';
import { IncomingLetter } from '../../types';

interface Props {
  initial?: Partial<IncomingLetter>;
  onSubmit: (data: IncomingLetter) => void;
  onCancel: () => void;
}

const blank: IncomingLetter = {
  sender_name: '', sender_organization: '', recipient_name: '',
  department: '', subject: '', remarks: '',
  letter_date: new Date().toISOString().slice(0, 10),
  received_date: new Date().toISOString().slice(0, 10),
  status: 'received', priority: 'normal',
};

// Dummy options for dropdowns
const orgOptions = [
  { value: '', label: 'Select Organization' },
  { value: 'Acme Corp', label: 'Acme Corp' },
  { value: 'Globex', label: 'Globex' },
  { value: 'Initech', label: 'Initech' },
  { value: 'Ministry of Finance', label: 'Ministry of Finance' },
];
const deptOptions = [
  { value: '', label: 'Select Department' },
  { value: 'HR', label: 'Human Resources' },
  { value: 'Finance', label: 'Finance' },
  { value: 'IT', label: 'IT' },
  { value: 'Legal', label: 'Legal' },
];
const personOptions = [
  { value: '', label: 'Select Person' },
  { value: 'John Doe', label: 'John Doe' },
  { value: 'Jane Smith', label: 'Jane Smith' },
  { value: 'Alice Johnson', label: 'Alice Johnson' },
];

export const IncomingLetterForm: React.FC<Props> = ({ initial, onSubmit, onCancel }) => {
  const [form, setForm] = useState<IncomingLetter>({ ...blank, ...initial });
  const [file, setFile] = useState<File | null>(null);

  const set = (k: keyof IncomingLetter, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would append the file to FormData here before sending to API
    console.log('Submitting with file:', file);
    onSubmit(form);
  };

  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-5" onSubmit={handleSubmit}>
      <Select label="Sender Name*" required value={form.sender_name} onChange={e => set('sender_name', e.target.value)} options={personOptions} />
      <Select label="Sender Organization*" required value={form.sender_organization} onChange={e => set('sender_organization', e.target.value)} options={orgOptions} />
      <Select label="Recipient Name*" required value={form.recipient_name} onChange={e => set('recipient_name', e.target.value)} options={personOptions} />
      <Select label="Department" value={form.department} onChange={e => set('department', e.target.value)} options={deptOptions} />
      
      <div className="md:col-span-2">
        <Input label="Subject*" required value={form.subject} onChange={e => set('subject', e.target.value)} placeholder="Enter letter subject" />
      </div>

      <div className="md:col-span-2">
        <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Attachment (Letter File)</label>
        <FileUpload onChange={setFile} />
      </div>

      <Input label="Letter Date*" type="date" required value={form.letter_date} onChange={e => set('letter_date', e.target.value)} />
      <Input label="Received Date*" type="date" required value={form.received_date} onChange={e => set('received_date', e.target.value)} />
      
      <Select
        label="Status"
        value={form.status}
        onChange={e => set('status', e.target.value)}
        options={[
          { value: 'received', label: 'Received' },
          { value: 'under_review', label: 'Under Review' },
          { value: 'approved', label: 'Approved' },
          { value: 'distributed', label: 'Distributed' },
          { value: 'archived', label: 'Archived' },
        ]}
      />
      <Select
        label="Priority"
        value={form.priority}
        onChange={e => set('priority', e.target.value)}
        options={[
          { value: 'low', label: 'Low' },
          { value: 'normal', label: 'Normal' },
          { value: 'high', label: 'High' },
          { value: 'urgent', label: 'Urgent' },
        ]}
      />

      <div className="md:col-span-2 flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-slate-600">Remarks</label>
        <textarea
          rows={3}
          className="px-3 py-2 border border-slate-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 hover:border-slate-400 transition-all"
          value={form.remarks}
          onChange={e => set('remarks', e.target.value)}
          placeholder="Add any internal remarks here..."
        />
      </div>

      <div className="md:col-span-2 flex justify-end gap-3 pt-4 border-t border-slate-100">
        <Button variant="secondary" type="button" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save Letter</Button>
      </div>
    </form>
  );
};