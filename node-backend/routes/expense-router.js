const express = require('express');
const router = express.Router();
const ExpenseController = require('../controllers/expense-controller');

router.get('/', ExpenseController.getExpenses);

router.get('/:id', ExpenseController.getExpenseById)

router.post('/add-expense',ExpenseController.postaddExpense);

router.put('/edit-expense/:id', ExpenseController.editExpense);

router.delete('/delete-expense/:id', ExpenseController.deleteExpense);

module.exports = router;
