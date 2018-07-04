export class Asset{
    tradingSymbol: String;
    name: String;
    description: String;
    value: Number;
    owner: String;
    type: String;

    constructor(tradingSymbol, name, description, value, owner, type){
        this.tradingSymbol = tradingSymbol;
        if(value < 100000000)
            this.value = value;
        this.name = name;
        this.description = description;
        this.owner = owner;
        this.type = type;
    }
}