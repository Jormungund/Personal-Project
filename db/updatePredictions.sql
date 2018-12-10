UPDATE predictions
SET team1prediction = $2, team2prediction = $3
WHERE user_id = $1;

SELECT *
FROM predictions
Where user_id = $1