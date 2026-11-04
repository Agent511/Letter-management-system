import { Request, Response } from 'express';
import { pool } from '../config/db';
import { generateReference } from '../utils/referenceNumber';

export const list = async (_req: Request, res: Response) => {
  const { rows } = await pool.query(
    'SELECT * FROM outgoing_letters ORDER BY created_at DESC'
  );
  res.json(rows);
};

export const getById = async (req: Request, res: Response) => {
  const { rows } = await pool.query('SELECT * FROM outgoing_letters WHERE id=$1', [
    req.params.id,
  ]);
  if (!rows[0]) return res.status(404).json({ error: 'Not found' });
  res.json(rows[0]);
};

export const create = async (req: Request, res: Response) => {
  const b = req.body;
  const reference_no = generateReference('OUT');
  const { rows } = await pool.query(
    `INSERT INTO outgoing_letters
     (reference_no, recipient_name, recipient_organization, sender_name, department,
      subject, description, letter_date, delivery_channel, status, priority, attachment_url)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`,
    [
      reference_no, b.recipient_name, b.recipient_organization, b.sender_name,
      b.department, b.subject, b.description, b.letter_date,
      b.delivery_channel || 'email', b.status || 'draft',
      b.priority || 'normal', b.attachment_url || null,
    ]
  );
  await pool.query(
    `INSERT INTO audit_logs (entity_type, entity_id, action, performed_by, details)
     VALUES ('outgoing', $1, 'create', $2, $3)`,
    [rows[0].id, b.performed_by || 'system', JSON.stringify({ reference_no })]
  );
  res.status(201).json(rows[0]);
};

export const update = async (req: Request, res: Response) => {
  const b = req.body;
  const { rows } = await pool.query(
    `UPDATE outgoing_letters SET
      recipient_name=$1, recipient_organization=$2, sender_name=$3, department=$4,
      subject=$5, description=$6, letter_date=$7, delivery_channel=$8,
      status=$9, priority=$10, attachment_url=$11, updated_at=CURRENT_TIMESTAMP
     WHERE id=$12 RETURNING *`,
    [
      b.recipient_name, b.recipient_organization, b.sender_name, b.department,
      b.subject, b.description, b.letter_date, b.delivery_channel,
      b.status, b.priority, b.attachment_url, req.params.id,
    ]
  );
  if (!rows[0]) return res.status(404).json({ error: 'Not found' });
  res.json(rows[0]);
};

export const remove = async (req: Request, res: Response) => {
  await pool.query('DELETE FROM outgoing_letters WHERE id=$1', [req.params.id]);
  res.json({ success: true });
};