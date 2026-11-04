import React, { useState } from 'react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { OutgoingLetter } from '../../types';

interface Props {
  initial?: Partial<OutgoingLetter>;
  onSubmit: (data: OutgoingLetter) => void;
  onCancel: () => void;
}

const blank: OutgoingLetter = {
  recipient_name: '', recipient_organization: '', sender_name: '',
  department: '', subject: '', description: '',
  letter_date: new Date().toISOString().slice(0, 10),
  delivery_channel: 'email', status: 'draft', priority: 'normal',
};

export const OutgoingLetterForm: React.FC<Props> = ({ initial, onSubmit, onCancel }) => {
  const [form, setForm] = useState<OutgoingLetter>({ ...blank, ...initial });
  const set = (k: keyof OutgoingLetter, v: string) => setForm(f => ({ ...f, [k]: v }));

  return (
    <form
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
      onSubmit={(e) => { e.preventDefault(); onSubmit(form); }}
    >
      <Input label="Recipient Name*" required value={form.recipient_name} onChange={e => set('recipient_name', e.target.value)} />
      <Input label="Recipient Organization" value={form.recipient_organization} onChange={e => set('recipient_organization', e.target.value)} />
      <Input label="Sender Name*" required value={form.sender_name} onChange={e => set('sender_name', e.target.value)} />
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
      <Select
        label="Delivery Channel"
        value={form.delivery_channel}
        onChange={e => set('delivery_channel', e.target.value)}
        options={[
          { value: 'email', label: 'Email' },
          { value: 'portal', label: 'Portal' },
          { value: 'print_mail', label: 'Print & Mail' },
        ]}
      />
      <Select
        label="Status"
        value={form.status}
        onChange={e => set('status', e.target.value)}
        options={[
          { value: 'draft', label: 'Draft' },
          { value: 'pending_approval', label: 'Pending Approval' },
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