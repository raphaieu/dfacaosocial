-- Create Campaigns table
CREATE TABLE IF NOT EXISTS campaigns (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT,
    category VARCHAR(100),
    thumbnail VARCHAR(255),
    gallery TEXT, -- JSON array of image URLs
    featured BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Contacts/Volunteers table
CREATE TABLE IF NOT EXISTS contacts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    message TEXT,
    is_volunteer BOOLEAN DEFAULT FALSE,
    status VARCHAR(50) DEFAULT 'pending', -- pending, contacted, archived
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Transparencies table
CREATE TABLE IF NOT EXISTS transparencies (
    id SERIAL PRIMARY KEY,
    campaign_id INTEGER REFERENCES campaigns(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    amount_collected DECIMAL(12, 2) DEFAULT 0.00,
    resources_collected TEXT,
    date_reported DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Transparency Files table
CREATE TABLE IF NOT EXISTS transparency_files (
    id SERIAL PRIMARY KEY,
    transparency_id INTEGER REFERENCES transparencies(id) ON DELETE CASCADE,
    file_url VARCHAR(255) NOT NULL,
    file_name VARCHAR(255),
    file_type VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for slug
CREATE INDEX IF NOT EXISTS idx_campaigns_slug ON campaigns(slug);

-- Insert dummy data for initialization (Optional, but helpful for testing)
INSERT INTO campaigns (title, slug, excerpt, content, category, thumbnail, featured) 
VALUES 
('Natal Solidário 2025', 'natal-solidario-2025', 'Distribuição de 500 cestas básicas e brinquedos.', 'Conteúdo completo aqui...', 'Alimentos', 'https://images.unsplash.com/photo-1543599553-294715494d40?q=80&w=600&h=400&auto=format&fit=crop', true),
('Campanha Volta às Aulas', 'volta-as-aulas', 'Entrega de kits escolares completos.', 'Conteúdo completo aqui...', 'Educação', 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600&h=400&auto=format&fit=crop', false)
ON CONFLICT (slug) DO NOTHING;
