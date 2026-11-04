import React, { useState } from 'react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { IncomingLetter } from '../../types';

interface Props {
  initial?: Partial<IncomingLetter>;
  onSubmit: (data: IncomingLetter) => void;
  onCancel: () => void;
}

const blank: IncomingLetter = {
  sender_name: '', sender_organization: '', recipient_name: '',
  department: '', subject: '', description: '',
  letter_date: new Date().toISOString().slice(0, 10),
  received_date: new Date().toISOString().slice(0, 10),
  status: 'received', priority: 'normal',
};

export const IncomingLetterForm: React.FC<Props> = ({ initial, onSubmit, onCancel }) => {
  const [form, setForm] = useState<IncomingLetter>({ ...blank, ...initial });
  const set = (k: keyof IncomingLetter, v: string) => setForm(f => ({ ...f, [k]: v }));

  return (
    <form
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
      onSubmit={(e) => { e.preventDefault(); onSubmit(form); }}
    >
      <Input label="Sender Name*" required value={form.sender_name} onChange={e => set('sender_name', e.target.value)} />
      <Input label="Sender Organization" value={form.sender_organization} onChange={e => set('sender_organization', e.target.value)} />
      <Input label="Recipient Name*" required value={form.recipient_name} onChange={e => set('recipient_name', e.target.value)} />
      <Input label="Department" value={form.department} onChange={e => set('department', e.target.value)} />
      <div className="md:col-span-2">
        <Input label="Subject*" required value={form.subject} onChange={e => set('subject', e.target.value)} />
      </div>
      <div className="md:col-span-2 flex flex-col gap-1">
        <label className="text-xs font-medium text-slate-600">Description</label>
        <textarea
          rows={3}
          className="px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.description}
          onChange={e => set('description', e.target.value)}
        />
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
      <div className="md:col-span-2 flex justify-end gap-2 pt-2">
        <Button variant="secondary" type="button" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};