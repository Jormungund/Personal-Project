SELECT p.*, u.username as author, u.id as user_id
FROM errors p
JOIN users u ON u.id = p.user_id;