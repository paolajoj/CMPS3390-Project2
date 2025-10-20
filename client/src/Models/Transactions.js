class Transactions{

   constructor()
   {
      this.transactions = []
      this.uniqueID = 1
   }

   createTransaction(amount, name, type)
   {
      const newName = name.trim()

      const newTransaction =
      {
         id: this.uniqueID++,
         amount: amount,
         name: newName,
         type: type

      }

      this.transactions = [...this.transactions, newTransaction]

   }


   deleteTransaction(id)
   {
      this.transactions = this.transactions.filter(function (transaction) {
          return transaction.id != id
      })
   }

   getTransactions()
   {
      return this.transactions
   }

}

export default Transactions