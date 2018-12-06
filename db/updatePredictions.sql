UPDATE predictions
SET team1prediction = $2, team2prediction = $3
WHERE id = $1;

SELECT p.*, u.id as userId
FROM predictions p
JOIN users u ON u.id = p.user_id;