import { Request, Response } from 'express';
import { pool } from '../config/db';

export const listApprovals = async (_req: Request, res: Response) => {
  const { rows } = await pool.query(
    `SELECT * FROM approval_workflow ORDER BY created_at DESC`
  );
  res.json(rows);
};

export const approveStep = async (req: Request, res: Response) => {
  const { action, comments, approver_name } = req.body;
  const { rows } = await pool.query(
    `UPDATE approval_workflow SET status=$1, comments=$2, signed_at=CURRENT_TIMESTAMP
     WHERE id=$3 RETURNING *`,
    [action, comments || null, req.params.id]
  );
  if (!rows[0]) return res.status(404).json({ error: 'Not found' });
  await pool.query(
    `INSERT INTO audit_logs (entity_type, entity_id, action, performed_by)
     VALUES ('approval', $1, $2, $3)`,
    [rows[0].id, action, approver_name || 'system']
  );
  res.json(rows[0]);
};

export const createStep = async (req: Request, res: Response) => {
  const { letter_type, letter_id, approver_name, approval_order } = req.body;
  const { rows } = await pool.query(
    `INSERT INTO approval_workflow (letter_type, letter_id, approver_name, approval_order)
     VALUES ($1,$2,$3,$4) RETURNING *`,
    [letter_type, letter_id, approver_name, approval_order]
  );
  res.status(201).json(rows[0]);
};