import { Request, Response } from 'express';
import { pool } from '../config/db';
import { generateReference } from '../utils/referenceNumber';

export const list = async (_req: Request, res: Response) => {
  const { rows } = await pool.query(
    'SELECT * FROM incoming_letters ORDER BY created_at DESC'
  );
  res.json(rows);
};

export const getById = async (req: Request, res: Response) => {
  const { rows } = await pool.query('SELECT * FROM incoming_letters WHERE id=$1', [
    req.params.id,
  ]);
  if (!rows[0]) return res.status(404).json({ error: 'Not found' });
  res.json(rows[0]);
};

export const create = async (req: Request, res: Response) => {
  const b = req.body;
  const reference_no = generateReference('IN');
  const { rows } = await pool.query(
    `INSERT INTO incoming_letters
     (reference_no, sender_name, sender_organization, recipient_name, department,
      subject, description, letter_date, received_date, status, priority, attachment_url)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`,
    [
      reference_no, b.sender_name, b.sender_organization, b.recipient_name,
      b.department, b.subject, b.description, b.letter_date, b.received_date,
      b.status || 'received', b.priority || 'normal', b.attachment_url || null,
    ]
  );
  await pool.query(
    `INSERT INTO audit_logs (entity_type, entity_id, action, performed_by, details)
     VALUES ('incoming', $1, 'create', $2, $3)`,
    [rows[0].id, b.performed_by || 'system', JSON.stringify({ reference_no })]
  );
  res.status(201).json(rows[0]);
};

export const update = async (req: Request, res: Response) => {
  const b = req.body;
  const { rows } = await pool.query(
    `UPDATE incoming_letters SET
      sender_name=$1, sender_organization=$2, recipient_name=$3, department=$4,
      subject=$5, description=$6, letter_date=$7, received_date=$8,
      status=$9, priority=$10, attachment_url=$11, updated_at=CURRENT_TIMESTAMP
     WHERE id=$12 RETURNING *`,
    [
      b.sender_name, b.sender_organization, b.recipient_name, b.department,
      b.subject, b.description, b.letter_date, b.received_date, b.status,
      b.priority, b.attachment_url, req.params.id,
    ]
  );
  if (!rows[0]) return res.status(404).json({ error: 'Not found' });
  await pool.query(
    `INSERT INTO audit_logs (entity_type, entity_id, action, performed_by)
     VALUES ('incoming', $1, 'update', $2)`,
    [req.params.id, b.performed_by || 'system']
  );
  res.json(rows[0]);
};

export const remove = async (req: Request, res: Response) => {
  await pool.query('DELETE FROM incoming_letters WHERE id=$1', [req.params.id]);
  await pool.query(
    `INSERT INTO audit_logs (entity_type, entity_id, action, performed_by)
     VALUES ('incoming', $1, 'delete', 'system')`,
    [req.params.id]
  );
  res.json({ success: true });
};