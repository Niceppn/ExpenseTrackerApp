const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const path = require('path')
const Expense = require('../models/expense')
const exp = require('constants')

router.post('/addExpensed',async(req,res,next)=>{
    try{
        const {date, category, description, amount} = req.body

        const newExpense = new Expense({
            date,
            category,
            description,
            amount
        })
        const savedExpense = await newExpense.save()
        res.redirect('/')
    }
    catch(err){
        console.error(err);
        res.status(500).json({error:'failed to save expense'})
        
    }
})

router.get('/',async(req,res)=>{
    try{
        const showExpense = await Expense.find()
        // console.log(showExpense);

       

        const totalAmount = showExpense.reduce((sum,expense)=> sum+expense.amount,0)
        const totalAmounttoString = totalAmount.toLocaleString()
        console.log(totalAmount);

        const count = showExpense.length
        console.log(count);


        const avgAmount = (totalAmount / count).toLocaleString()
        console.log(avgAmount);
        
        
        
        res.render('index',{showExpense,totalAmounttoString,count,avgAmount})
    }
    catch(err){
        console.error(err);
        res.status(500).json({error:'failed to show expense'})
        
    }
})

router.get('/addExpense',(req,res)=>{
    res.render('addExpense')
})

router.get('/filter',async(req,res)=>{
    try{
        
        const {category,date} = req.query;
        console.log({category,date});
        
        const filter = {};

        if(category){
            filter.category = category
        }
        if(date){
            filter.date = date
        }
        const expense = await Expense.find(filter)
        
        const total = expense.reduce((sum,e)=> sum + e.amount,0)
        const list = expense.length
        const avg = (total/list).toLocaleString()   

        res.render('filter',{expense,total,list,avg})
        // console.log(filter);
        
        // console.log(expense);
        
    }catch(err){
        console.log(err);
        res.status(500).json({error:'failed to filer expense'})
    }
})

router.get('/delete/:id',async(req,res)=>{
    try{
        const {id} = req.params
        const deleteExpense = await Expense.findByIdAndDelete(id)

        if(!deleteExpense){
            return res.status(404).json({error: 'expense not found'})
        }
        res.redirect('/')

    }catch(err){
        console.log(err);
        res.status(500).json({error:'Filed to Delete Expense'})
        
    }
})

router.get('/destroy',async (req,res)=>{
    try{
        await Expense.deleteMany({})
        res.redirect('/')
    }
    catch(err){
        res.status(500)
        console.log(err);

    }
})












module.exports = router

