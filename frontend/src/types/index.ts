export interface IncomingLetter {
  id?: number;
  reference_no?: string;
  sender_name: string;
  sender_organization: string;
  recipient_name: string;
  department: string;
  subject: string;
  description: string;
  letter_date: string;
  received_date: string;
  status: string;
  priority: string;
  attachment_url?: string;
  created_at?: string;
}

export interface OutgoingLetter {
  id?: number;
  reference_no?: string;
  recipient_name: string;
  recipient_organization: string;
  sender_name: string;
  department: string;
  subject: string;
  description: string;
  letter_date: string;
  delivery_channel: string;
  status: string;
  priority: string;
  attachment_url?: string;
  created_at?: string;
}