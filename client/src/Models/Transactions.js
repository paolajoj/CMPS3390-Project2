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
   updateTrasactions(id, data) {
     this.transactins = this.transactins.map((t) => {
	if(t.id === id) {
	  return {
	     ...t,
	     amount: data.amount,
	     name: data.name.trim(),
	     type: data.type,
	     };
}	
	return t; 
});
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
