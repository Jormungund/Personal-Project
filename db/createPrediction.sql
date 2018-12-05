INSERT INTO predictions (user_id, team1Prediction, team2Prediction) 
VALUES (${user_id}, ${team1Prediction}, ${team2Prediction});

SELECT p.*, u.username as author, u.id as userId
FROM predictions p
JOIN users u ON u.id = p.user_id;