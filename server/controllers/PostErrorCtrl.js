module.exports = {
    create: async (req, res) => {
      try {
        const db = req.app.get('db')
    
        let { content } = req.body;
        let { id: user_id } = req.session.user
    
        let errors = await db.createError({ user_id, content })
  
        res.send(errors)
      } catch (error) {
        console.log('error creating post:', error)
        res.status(500).send(error)
      }
    },
  
    read: async (req, res) => {
      try {
        const db = req.app.get('db')
  
        let errors = await db.getErrors()
        res.send(errors)
      } catch (error) {
        console.log('error fetching posts:', error)
        res.status(500).send(error)
      }
    },
  
    update: async (req, res) => {
      try {
        const db = req.app.get('db')
        let { id } = req.params
        let { content } = req.body
  
        let errors = await db.updateError([id, content])
  
        res.send(errors)
      } catch (error) {
        console.log('error updating post:', error)
        res.status(500).send(error)
      }
    },
  
    delete: async (req, res) => {
      try {
        const db = req.app.get('db')
        let { id } = req.params
  
        let errors = await db.deleteError(id)
        res.send(errors)
      } catch (error) {
        console.log('error deleting post:', error)
        res.status(500).send(error)
      }
    }
  }