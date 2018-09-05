import express from 'express'
import Expense from '../models/expense'
import Campaign from '../models/campaign'
import Err from '../../services/errors'
import cors from 'cors'

let router = express.Router({mergeParams: true})

// TODO add Middleware for verifying API key and account
router.post('/', cors(), (req, res) => {
  // prepare to create event
  let expenseToCreate = {
    amount: Number(req.body.cost),
    date: req.body.date,
    title: req.body.title
  }
  // find corresponding campaign
  Campaign.findById(req.params.id, (err, foundCampaign) => {
    if (err) {
      // fix error handling
      res.send(err)
      Err.create(err)
    } else {
      // create expense
      Expense.create(expenseToCreate, (err, newExpense) => {
        if (err) {
          Err.create(err)
        } else {
          // add expense to corresponding campaign
          foundCampaign.expenses.push(newExpense)
          if (foundCampaign.statistics.total_expense) {
            foundCampaign.statistics.total_expense += newExpense.amount
          } else {
            foundCampaign.statistics.total_expense = newExpense.amount
          }
          foundCampaign.save()
          res.send(foundCampaign)
        }
      })
    }
  })
})

module.exports = router
