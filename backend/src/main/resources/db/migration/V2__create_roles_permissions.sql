CREATE TABLE roles (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE permissions (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(80) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE role_permissions (
    role_id BIGINT NOT NULL,
    permission_id BIGINT NOT NULL,

    CONSTRAINT pk_role_permissions
        PRIMARY KEY (role_id, permission_id),

    CONSTRAINT fk_role_permissions_role
        FOREIGN KEY (role_id)
        REFERENCES roles(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_role_permissions_permission
        FOREIGN KEY (permission_id)
        REFERENCES permissions(id)
        ON DELETE CASCADE
);

CREATE INDEX idx_role_permissions_role
    ON role_permissions(role_id);

CREATE INDEX idx_role_permissions_permission
    ON role_permissions(permission_id);

INSERT INTO roles (name)
VALUES
    ('OWNER'),
    ('EMPLOYEE');

INSERT INTO permissions (name)
VALUES
    ('PRODUCT_CREATE'),
    ('PRODUCT_READ'),
    ('PRODUCT_UPDATE'),
    ('PRODUCT_DELETE'),
    ('STOCK_ENTRY'),
    ('STOCK_EXIT'),
    ('TEAM_MANAGE'),
    ('SETTINGS_MANAGE');
