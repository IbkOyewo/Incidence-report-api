const queries = {
    addNewUser: `
        INSERT INTO users (
            firstName,
            lastName,
            email,
            password
        ) VALUES ($1, $2, $3, $4)
        RETURNING *
    `,

    getUser: `
        SELECT * FROM users
        WHERE email=$1
    `,

    getUserById: `
    SELECT * FROM users
    WHERE id=$1
    `,

    addIncidentReport: `
    INSERT INTO incidentS(
        client_id, 
        incident_desc,
        city,
        country,
        weather_report
    )
    VALUES($1, $2, $3, $4, $5)
    RETURNING *
    `,

    getIncidents: `
        SELECT *
        FROM incidents
    `,

    getUserIncidents: `
        SELECT * 
        FROM incidents
        WHERE client_id=$1
    `,

    updatePassword: `
        UPDATE users
        SET password = $1,
        updated_at = NOW()
        WHERE id = $2
        RETURNING *
    `
    }

module.exports = queries