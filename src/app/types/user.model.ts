export class User{
    traderId: String;
    firstName: String;
    lastName: String;
    balance: Number;
    password: String;
    
    constructor(traderId, firstName, lastName, balance){
        this.traderId = traderId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.balance = balance;
    }
}