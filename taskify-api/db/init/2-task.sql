CREATE TABLE tasks (
    id          SERIAL PRIMARY KEY,
    name        TEXT NOT NULL,
    description        TEXT,

    u_id        UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    active BOOLEAN DEFAULT TRUE,
    
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    version       INTEGER NOT NULL DEFAULT 1
);

CREATE OR REPLACE FUNCTION create_task(
    p_name TEXT,
    p_desc TEXT,
    p_u_id TEXT
)
RETURNS TABLE (id INTEGER)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_task_id INTEGER;
BEGIN
    INSERT INTO tasks (
        name,
        description,
        u_id
    )
    VALUES (
        p_name,
        p_desc,
        p_u_id::UUID
    )
    RETURNING tasks.id INTO v_task_id;

    RETURN QUERY SELECT v_task_id;
END;
$$;

CREATE OR REPLACE FUNCTION get_tasks_by_user(
    p_u_id TEXT
)
RETURNS TABLE (
    id INTEGER,
    name TEXT,
    description TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN QUERY
    SELECT
        t.id,
        t.name,
        t.description
    FROM tasks t
    WHERE t.u_id = p_u_id::UUID
    AND active = true
    ORDER BY t.created_at DESC;
END;
$$;

CREATE OR REPLACE FUNCTION update_task(
    p_id INTEGER,
    p_uid TEXT,
    p_name TEXT,
    p_desc TEXT
)
RETURNS TABLE(found BOOLEAN)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    UPDATE tasks
    SET
        name = p_name,
        description = p_desc
    WHERE id = p_id
    AND u_id = p_uid::UUID;

    RETURN QUERY SELECT FOUND;
END;
$$;

CREATE OR REPLACE FUNCTION delete_task(
    p_id INTEGER,
    p_uid TEXT
)
RETURNS TABLE(found BOOLEAN)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    UPDATE tasks
    SET
        active = false
    WHERE id = p_id
    AND u_id = p_uid::UUID;

    RETURN QUERY SELECT FOUND;
END;
$$;

CREATE TRIGGER trg_tasks_before_update
BEFORE INSERT OR UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION enforce_managed_columns();