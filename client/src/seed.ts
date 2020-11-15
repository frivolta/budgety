import faker from 'faker';
import { addExpense } from './lib/api/queries';
import { Expense } from './types';

function mockExpense(expensesNumber: number): Expense[] {
  const fakeExpenses = [...Array(expensesNumber)].map((_, index) => {
    return { 
      amount: faker.finance.amount(),
      date: faker.date.between(new Date(2020, 1, 1), new Date(2020, 12, 1)),
      description: faker.lorem.words(),
      expenseType: 1,
      categoryType: 1,
      category: "groceries"
    }
  })
  return fakeExpenses
}

async function executeSeed(userUid:string, expensesNumber:number, includeIncomes: boolean = false) {
  console.log('Executing seed')
  console.log('Including incomes? ',includeIncomes)
  const fakeExpenses = mockExpense(expensesNumber);
  try {
    let i = 0;
    while (i < expensesNumber) {
      await addExpense(userUid, fakeExpenses[i]);
      i++
    }
    console.log('Seed finished correctly')
  } catch (error) {
    console.error("Error seeding data: ", error)
  }
}

export {executeSeed}