INSERT INTO users (username, email, password, isAdmin)
VALUES (${username}, ${email}, ${hash}, ${isAdmin})
RETURNING *;