ALTER TABLE assets ADD COLUMN currency TEXT NOT NULL DEFAULT 'USD' CHECK (currency ~ '^[A-Z]{3}$');
