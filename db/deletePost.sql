DELETE FROM posts
WHERE id = $1;

SELECT p.*, u.username as author, u.id as userId
FROM posts p
JOIN users u ON u.id = p.user_id;