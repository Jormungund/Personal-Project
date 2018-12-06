module.exports = {
    create: async (req, res) => {
      try {
        const db = req.app.get('db')
        
        let { id: user_id } = req.session.user
        let { team1prediction, team2prediction } = req.body;
    
        let predictions = await db.createPrediction({ user_id, team1prediction, team2prediction })
  
        res.send(predictions[0])
      } catch (error) {
        console.log('error creating predictions:', error)
        res.status(500).send(error)
      }
    },
  
    read: async (req, res) => {
      try {
        const db = req.app.get('db')
        
        let { id } = req.session.user
        let predictions = await db.getPredictions([id])
        res.send(predictions[0])
      } catch (error) {
        console.log('error fetching predictions:', error)
        res.status(500).send(error)
      }
    },
  
    update: async (req, res) => {
      try {
        const db = req.app.get('db')
        let { id } = req.params
        let { team1prediction, team2prediction } = req.body
  
        let predictions = await db.updatePredictions([id, team1prediction, team2prediction])
  
        res.send(predictions)
      } catch (error) {
        console.log('error updating predictions:', error)
        res.status(500).send(error)
      }
    }
}