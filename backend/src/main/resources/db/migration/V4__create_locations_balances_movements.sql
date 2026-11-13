CREATE TABLE locations (
    id BIGSERIAL PRIMARY KEY,
    organization_id BIGINT NOT NULL,
    name VARCHAR(120) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_locations_organization
        FOREIGN KEY (organization_id)
        REFERENCES organizations(id)
        ON DELETE CASCADE,

    CONSTRAINT uq_locations_organization_name
        UNIQUE (organization_id, name)
);

CREATE TABLE stock_balances (
    id BIGSERIAL PRIMARY KEY,
    product_id BIGINT NOT NULL,
    location_id BIGINT NOT NULL,
    quantity NUMERIC(15,3) NOT NULL DEFAULT 0,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_stock_balances_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_stock_balances_location
        FOREIGN KEY (location_id)
        REFERENCES locations(id)
        ON DELETE CASCADE,

    CONSTRAINT uq_stock_balances_product_location
        UNIQUE (product_id, location_id),

    CONSTRAINT chk_stock_balances_quantity
        CHECK (quantity >= 0)
);

CREATE TABLE stock_movements (
    id BIGSERIAL PRIMARY KEY,
    organization_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    location_id BIGINT NOT NULL,
    user_id BIGINT,
    movement_type VARCHAR(20) NOT NULL,
    quantity NUMERIC(15,3) NOT NULL,
    reason VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_stock_movements_organization
        FOREIGN KEY (organization_id)
        REFERENCES organizations(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_stock_movements_product
        FOREIGN KEY (product_id)
        REFERENCES products(id),

    CONSTRAINT fk_stock_movements_location
        FOREIGN KEY (location_id)
        REFERENCES locations(id),

    CONSTRAINT fk_stock_movements_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE SET NULL,

    CONSTRAINT chk_stock_movements_quantity
        CHECK (quantity > 0),

    CONSTRAINT chk_stock_movements_type
        CHECK (
            movement_type IN (
                'ENTRY',
                'EXIT',
                'ADJUSTMENT_IN',
                'ADJUSTMENT_OUT'
            )
        )
);

CREATE INDEX idx_locations_organization
    ON locations(organization_id);

CREATE INDEX idx_stock_balances_product
    ON stock_balances(product_id);

CREATE INDEX idx_stock_balances_location
    ON stock_balances(location_id);

CREATE INDEX idx_stock_movements_organization
    ON stock_movements(organization_id);

CREATE INDEX idx_stock_movements_product
    ON stock_movements(product_id);

CREATE INDEX idx_stock_movements_location
    ON stock_movements(location_id);

CREATE INDEX idx_stock_movements_created_at
    ON stock_movements(created_at);
