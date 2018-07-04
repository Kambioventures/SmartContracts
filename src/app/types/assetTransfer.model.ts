export class AssetTransfer{
    commodity: String[];
    newOwner: String;
    transactionId: String;
    timestamp: String;
    percentage: String;

    constructor(assetId, ownerId, transactionId, timestamp, percentage){
        this.commodity = assetId;
        this.newOwner = ownerId;
        this.transactionId = transactionId;
        this.timestamp = timestamp;
        this.percentage = percentage;
    }
}