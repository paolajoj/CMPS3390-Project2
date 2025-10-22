class Account
{
  async getAccounts(){
    const res = await fetch("http://localhost:3001/api/accounts");
    const data = await res.json();
    return data;
  }


  async createAccount(name) {
    const res = await fetch("http://localhost:3001/api/accounts",{
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({name}),
    }
   );
    return await res.json();
  }


  async deleteAccount(id){
    await fetch("http://localhost:3001/api/accounts/${id}",{
      method: "DELETE",
    });
  }
}

export default Account;