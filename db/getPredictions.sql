SELECT p.*, u.username as author, u.id as user_id
FROM predictions p
JOIN users u ON u.id = p.user_id;