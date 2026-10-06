ALTER TABLE organizations ADD COLUMN default_currency TEXT NOT NULL DEFAULT 'USD' CHECK (default_currency ~ '^[A-Z]{3}$');
