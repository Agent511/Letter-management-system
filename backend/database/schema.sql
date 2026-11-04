CREATE TABLE incoming_letters (
    id SERIAL PRIMARY KEY,
    reference_no VARCHAR(50) UNIQUE NOT NULL,
    sender_name VARCHAR(255) NOT NULL,
    sender_organization VARCHAR(255),
    recipient_name VARCHAR(255) NOT NULL,
    department VARCHAR(100),
    subject VARCHAR(500) NOT NULL,
    description TEXT,
    letter_date DATE NOT NULL,
    received_date DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'received', -- received, under_review, approved, distributed, archived
    priority VARCHAR(20) DEFAULT 'normal',   -- low, normal, high, urgent
    attachment_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE outgoing_letters (
    id SERIAL PRIMARY KEY,
    reference_no VARCHAR(50) UNIQUE NOT NULL,
    recipient_name VARCHAR(255) NOT NULL,
    recipient_organization VARCHAR(255),
    sender_name VARCHAR(255) NOT NULL,
    department VARCHAR(100),
    subject VARCHAR(500) NOT NULL,
    description TEXT,
    letter_date DATE NOT NULL,
    delivery_channel VARCHAR(50) DEFAULT 'email', -- email, portal, print_mail
    status VARCHAR(50) DEFAULT 'draft', -- draft, pending_approval, approved, distributed, archived
    priority VARCHAR(20) DEFAULT 'normal',
    attachment_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE approval_workflow (
    id SERIAL PRIMARY KEY,
    letter_type VARCHAR(20) NOT NULL, -- incoming / outgoing
    letter_id INTEGER NOT NULL,
    approver_name VARCHAR(255) NOT NULL,
    approval_order INTEGER NOT NULL,
    status VARCHAR(50) DEFAULT 'pending', -- pending, approved, rejected
    comments TEXT,
    signed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE audit_logs (
    id SERIAL PRIMARY KEY,
    entity_type VARCHAR(50) NOT NULL,
    entity_id INTEGER NOT NULL,
    action VARCHAR(50) NOT NULL,
    performed_by VARCHAR(255),
    details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_incoming_ref ON incoming_letters(reference_no);
CREATE INDEX idx_outgoing_ref ON outgoing_letters(reference_no);
CREATE INDEX idx_audit_entity ON audit_logs(entity_type, entity_id);