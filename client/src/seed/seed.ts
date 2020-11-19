import { firestore } from "../lib/api/firebase";
import { defaultCategories } from "../lib/initialData";
import { Expense } from "../types";
import { dummyUserProfile, dummyIncomes, dummyExpenses, dummyBudget } from "./data";


class SeedFirestore {
  userUid: string;
  expensesConfiguration: { totalExpenses: number, totalIncomes: number }
  
  constructor(userUid: string) {
    this.userUid = userUid;
    this.expensesConfiguration = {
      totalExpenses: 20,
      totalIncomes: 3
    }
  }

  generateUserProfile = async () => {
    const uid = this.userUid
    const resettedUserProfile: any = dummyUserProfile;
    delete resettedUserProfile?.id;
    console.info('[SEED]=> Generating user profile --- START')
    try {
      await firestore.collection("users").doc(uid).collection('profile').add(dummyUserProfile)
    } catch (err) {
      console.error('[SEED]=> Generating user profile: ', err)
    } finally {
      console.info('[SEED]=> Generating user profile --- END')
    }
  }
  
  generateExpenses = async (expenses:Expense[]) => {
    const uid = this.userUid
    console.info('[SEED]=> Generating expenses --- START')
    try {
      expenses.forEach(async(expense) => {
        await firestore.collection("users").doc(uid).collection("expenses").add(expense);
      })
      console.info('[SEED]=> Generating expenses --- END')
    } catch (err) {
      console.error('[SEED]=> Generating expenses: ', err)
    }
  }

  generateBudget = async () => {
    const budget = dummyBudget;
    const uid = this.userUid
    console.info('[SEED]=> Generating budget --- START')
    try {
      await firestore.collection('users').doc(uid).collection('budget').add(budget);
    } catch(err) {
      console.error('[SEED]=> Generating budget: ', err)
    } finally {
      console.info('[SEED]=> Generating budget --- END')
    }
  }

  generateCategories = async () => {
    const categories = defaultCategories;
    const uid = this.userUid
    console.info('[SEED]=> Generating categories --- START')
    try {
      categories.forEach(async(category) => {
        await firestore.collection('users').doc(uid).collection('categories').add(category);
      })
    } catch(err) {
      console.error('[SEED]=> Generating categories: ', err)
    } finally {
      console.info('[SEED]=> Generating categories --- END')
    }
  }

  initGenerateIncomes = () => {
    const incomes = dummyIncomes;
    this.generateExpenses(incomes)
  }

  initGenerateExpenses = () => {
    const expenses = dummyExpenses;
    this.generateExpenses(expenses)
  }
  
}

export default SeedFirestore;