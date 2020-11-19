class SeedFirestore {
  generateExpenses: boolean;
  userUid: string;
  setupBudgetProfile: boolean;
  expensesConfiguration: { totalExpenses: number, totalIncomes: number }
  
  constructor(userUid: string, setupBudgetProfile: boolean, generateExpenses: boolean) {
    this.generateExpenses = generateExpenses;
    this.userUid = userUid;
    this.setupBudgetProfile = setupBudgetProfile;
    this.expensesConfiguration = {
      totalExpenses: 20,
      totalIncomes: 3
    }
  }

}

export default SeedFirestore;