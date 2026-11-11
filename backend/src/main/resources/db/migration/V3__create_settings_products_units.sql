CREATE TABLE organization_settings (
    id BIGSERIAL PRIMARY KEY,
    organization_id BIGINT NOT NULL UNIQUE,
    low_stock_alert_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_settings_organization
        FOREIGN KEY (organization_id)
        REFERENCES organizations(id)
        ON DELETE CASCADE
);

CREATE TABLE units (
    id BIGSERIAL PRIMARY KEY,
    code VARCHAR(10) NOT NULL UNIQUE,
    name VARCHAR(50) NOT NULL,
    allows_fraction BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id BIGSERIAL PRIMARY KEY,
    organization_id BIGINT NOT NULL,
    unit_id BIGINT NOT NULL,
    name VARCHAR(150) NOT NULL,
    sku VARCHAR(80) NOT NULL,
    description VARCHAR(500),
    minimum_stock NUMERIC(15,3) NOT NULL DEFAULT 0,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_products_organization
        FOREIGN KEY (organization_id)
        REFERENCES organizations(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_products_unit
        FOREIGN KEY (unit_id)
        REFERENCES units(id),

    CONSTRAINT uq_products_organization_sku
        UNIQUE (organization_id, sku),

    CONSTRAINT chk_products_minimum_stock
        CHECK (minimum_stock >= 0)
);

CREATE INDEX idx_products_organization
    ON products(organization_id);

CREATE INDEX idx_products_unit
    ON products(unit_id);

CREATE INDEX idx_products_active
    ON products(active);

INSERT INTO units (code, name, allows_fraction)
VALUES
    ('UN', 'Unidade', FALSE),
    ('KG', 'Quilograma', TRUE),
    ('G', 'Grama', TRUE),
    ('L', 'Litro', TRUE),
    ('ML', 'Mililitro', TRUE);