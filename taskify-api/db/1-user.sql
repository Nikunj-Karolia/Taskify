CREATE TABLE users (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    email         TEXT NOT NULL UNIQUE,
    password      TEXT NOT NULL,
    phone_number  TEXT,
    date_of_birth DATE,
    
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    version       INTEGER NOT NULL DEFAULT 1
);

CREATE OR REPLACE FUNCTION create_user(
    p_email TEXT,
    p_password TEXT,
    p_phone_number TEXT,
    p_dob DATE
)
RETURNS TABLE (id UUID)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN QUERY
    INSERT INTO users (
        id,
        email,
        password,
        phone_number,
        date_of_birth
    ) VALUES(
        gen_random_uuid(),
        p_email,
        p_password,
        p_phone_number,
        p_dob
    )
    RETURNING users.id;
END;
$$;

CREATE OR REPLACE FUNCTION get_user(
    p_email TEXT
)
RETURNS TABLE (
    id UUID,
    password TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_user_id UUID;
    v_password TEXT;
BEGIN
    SELECT 
        u.id,
        u.password
    INTO 
        v_user_id,
        v_password
    FROM users u
    WHERE u.email = p_email;

    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'invalid email or password'
        USING errcode = '28000';
    END IF;

    RETURN QUERY SELECT v_user_id,v_password;
END;
$$;

CREATE TRIGGER trg_users_before_update
BEFORE INSERT OR UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION enforce_managed_columns();