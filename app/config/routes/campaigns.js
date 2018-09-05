import cors from 'cors'
import express from 'express'
import campaignServices from '../../services/services_campaigns'
import errorHandler from '../../services/errors'
// Hardcoded details
import currentUser from '../currentUser'

// configure variables
const router = express.Router()

// Get Campaigns
router.get('/', cors(), (req, res, next) => {
  campaignServices.fetchCampaigns(currentUser)
  .then((response) => {
    res.json(response)
  })
  .catch(errorHandler)
})

// Create Campaign
router.post('/', (req, res) => {
  campaignServices.create(req.body, currentUser, (err, success) => {
    if (err) {
      errorHandler(err)
    } else {
      res.send(success)
      console.log(success)
    }
  })
})

router.get('/:id', cors(), (req, res) => {
  campaignServices.fetchCampaign(req.params.id)
  .then((response) => {
    res.json(response)
  })
  .catch(errorHandler)
})

router.put('/:id', (req, res) => {
  // TODO Update Campaign
  res.send('Sorry, no way to update a campaign has been implemented yet')
})

router.delete('/:id', (req, res) => {
  // TODO Delete a campaign
  res.send('Sorry, a way to delete campaigns hsa not been implemented yet')
})

module.exports = router
