DELETE FROM errors
WHERE id = $1;

SELECT p.*, u.username as author, u.id as userId
FROM errors p
JOIN users u ON u.id = p.user_id;