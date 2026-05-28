CREATE OR REPLACE FUNCTION enforce_managed_columns()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        NEW.version := 1;
        NEW.created_at := clock_timestamp();
        NEW.updated_at := NEW.created_at;
        RETURN NEW;
    END IF;

    IF TG_OP = 'UPDATE' THEN
        -- Prevent manual changes
        IF NEW.version IS DISTINCT FROM OLD.version THEN
            RAISE EXCEPTION 'version is managed by the database';
        END IF;

        IF NEW.created_at IS DISTINCT FROM OLD.created_at THEN
            RAISE EXCEPTION 'created_at is managed by the database';
        END IF;

        -- Auto-update
        NEW.version := OLD.version + 1;
        NEW.updated_at := clock_timestamp();

        RETURN NEW;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;