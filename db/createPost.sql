INSERT INTO posts (user_id, content) 
VALUES (${user_id}, ${content});

SELECT p.*, u.username as author, u.id as userId
FROM posts p
JOIN users u ON u.id = p.user_id;