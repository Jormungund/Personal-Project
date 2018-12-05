INSERT INTO errors (user_id, content) 
VALUES (${user_id}, ${content});

SELECT p.*, u.username as author, u.id as userId
FROM errors p
JOIN users u ON u.id = p.user_id;