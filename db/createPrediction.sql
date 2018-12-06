INSERT INTO predictions ( user_id, team1prediction, team2prediction) 
VALUES (${user_id}, ${team1prediction}, ${team2prediction});

SELECT *
FROM predictions
Where user_id = ${user_id}