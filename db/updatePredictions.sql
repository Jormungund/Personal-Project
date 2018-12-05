UPDATE predictions
SET team1Prediction = $2, team2Prediction = $3
WHERE id = $1;

SELECT p.*, u.username as author, u.id as userId
FROM predictions p
JOIN users u ON u.id = p.user_id;