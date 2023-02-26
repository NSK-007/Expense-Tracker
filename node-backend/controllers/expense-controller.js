const Expense = require("../models/expense")

exports.postaddExpense = (req, res, next) => {
    try{
        let asyncAddExpense = async () => {
            let expense = await Expense.create({
                amount: req.body.amount,
                type: req.body.type,
                description: req.body.description
            });
            console.log('inserted');
            res.send(expense);
        }
        asyncAddExpense();
    }
    catch(err){
        console.log(err)
    }
}

exports.getExpenses = (req, res, next) => {
    try{
        let asyncGetExpenses = async () => {
            let expenses = await Expense.findAll();
            console.log('fetched');
            res.send(expenses);
        }
        asyncGetExpenses();
    }
    catch(err){
        console.log(err)
    }
}

exports.getExpenseById = (req, res, next) => {
    const id = req.params.id;
    try{
        let asyncGetExpense = async () => {
            let expense = await Expense.findByPk(id);
            res.send(expense);
        }
        asyncGetExpense();
    }
    catch(err){
        console.log(err)
    }
}

exports.editExpense = (req, res, next) => {
    const id = req.params.id;
    try{
        let asyncEditExpense = async () => {
            let expense = await Expense.findByPk(id);
            expense.amount = req.body.amount;
            expense.type = req.body.type;
            expense.description = req.body.description;
            expense.save();
            res.send(expense);
        }
        asyncEditExpense();
    }
    catch(err){
        console.log(err)
    }
}

exports.deleteExpense = (req, res, next) => {
    const id = req.params.id;
    try{
        let asyncDeleteExpense  = async () => {
            let deletedExpense = await Expense.findByPk(id);
            deletedExpense.destroy();
        }
        asyncDeleteExpense();
    }
    catch(err){
        console.log(err);
    }
}
