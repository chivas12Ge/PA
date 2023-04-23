const express = require('express');
const router = express.Router();
const Transaction=require('../models/transaction');



isLoggedIn = (req,res,next) => {
    if (res.locals.loggedIn) {
      next()
    } else {
      res.redirect('/login')
    }
  }

router.get("/transaction",isLoggedIn,async (req,res,next)=>{
    const { sortBy } = req.query;
    let items;
    if (sortBy === 'category') {
      items = await Transaction.find().sort({ category: 1 });
    } else if (sortBy === 'amount') {
      items = await Transaction.find().sort({ amount: 1 });
    } else if (sortBy === 'date') {
      items = await Transaction.find().sort({ date: 1 });
    } else {
      items = await Transaction.find();
    }
    res.render('transaction',{items})
})

router.post("/transaction",isLoggedIn,async (req,res,next)=>{
  const transactionItem=new Transaction({
    description:req.body.description,
    amount:req.body.amount,
    date:req.body.date,
    category:req.body.category,
    userId: req.user._id
  })
  await transactionItem.save()
  res.redirect('/transaction')
})

router.get('/transaction/remove/:itemId',
  isLoggedIn,
  async (req, res, next) => {
      console.log("inside /transaction/remove/:itemId")
      await Transaction.deleteOne({_id:req.params.itemId});
      res.redirect('/transaction')
});

router.get('/transaction/edit/:itemId',isLoggedIn,
 
  async (req, res, next) => {
      const item = 
       await Transaction.findById(req.params.itemId);
      
      res.locals.item = item
      res.render('editTransaction')
    
});
router.post('/transaction/updateTransaction',
  isLoggedIn,
  async (req, res, next) => {
    console.log(req.body)
      const {itemId,description,amount,category,date} = req.body;
      await Transaction.findOneAndUpdate(
        {_id:itemId},
        {$set: {description,amount,category,date}} );
      res.redirect('/transaction')
});

router.get('/transaction/byCategory',isLoggedIn,async (req,res,next)=>{
  const items=await Transaction.aggregate([{"$group":{_id:"$category",count:{$sum:'$amount'}}}])
  res.render("groupBy",{items})
})
module.exports = router;