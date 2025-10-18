class Account {

constructor()
{
  this.accounts = []
  this.uniqueID = 1
}

createAccount(name)
{
   const nameNew = name.trim()

   const accountChecker = this.accounts.filter(function(account){
      return account.name == nameNew
   })

   if (accountChecker == 0)
   {
      const newAccount = {
         name: nameNew,
         id: this.uniqueID++
      }
      this.accounts = [...this.accounts, newAccount]
   }
   else
   {
     alert("This account name already exists")
   }

}

deleteAccount(accountID)
{
   this.accounts = this.accounts.filter(function(account)
   {
        return account.id != accountID
   })
}

getAccounts()
{
   return this.accounts
}

}

export default Account