module.exports = {
    create: async (req, res) => {
      try {
        const db = req.app.get('db')
    
        let { content } = req.body;
        let { id: user_id } = req.session.user
    
        let predictions = await db.createPrediction({ user_id, content })
  
        res.send(predictions)
      } catch (error) {
        console.log('error creating post:', error)
        res.status(500).send(error)
      }
    },
  
    read: async (req, res) => {
      try {
        const db = req.app.get('db')
  
        let predictions = await db.getPredictions()
        res.send(predictions)
      } catch (error) {
        console.log('error fetching posts:', error)
        res.status(500).send(error)
      }
    },
  
    update: async (req, res) => {
      try {
        const db = req.app.get('db')
        let { id } = req.params
        let { team1Prediction, team2Prediction } = req.body
  
        let predictions = await db.updatePredictions([id, team1Prediction, team2Prediction])
  
        res.send(predictions)
      } catch (error) {
        console.log('error updating post:', error)
        res.status(500).send(error)
      }
    }
}