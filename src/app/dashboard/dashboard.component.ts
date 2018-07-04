import { Component, OnInit } from '@angular/core';
import { AssetTransfer } from '../types/assetTransfer.model';
import { FormGroup, FormControl } from '@angular/forms';
import { HyperledgerService } from '../services/Hyperledger.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  transactions: AssetTransfer[];
  sampleForm;
  constructor(private hyperLedgerService: HyperledgerService) {}

  ngOnInit() {
    this.loadData();
    this.sampleForm = new FormGroup({
      'assetId': new FormControl(),
      'ownerId': new FormControl()
    });
  }

  loadData(){
    this.hyperLedgerService.getAssetTransfer()
    .subscribe(
      (response) => {
        this.transactions = response.json()
        this.transactions.map(
          value => {
            value.newOwner = value.newOwner.substring(37);
            value.transactionId = value.transactionId.substring(0,10)+"..."
            value.commodity.forEach((commo, index, object)=>{
              object[index] = commo.substring(40);
            });
          }
        )
      },(error) => console.log(error)
    );
  }


  // save(){
  //   let assetId = this.sampleForm.controls.assetId.value;
  //   let assetIds: String[];
  //   let ownerId = this.sampleForm.controls.ownerId.value;
  //   let percentage = this.hyperLedgerService.callPercentage(assetIds);
  //   //how to get list of asset ids
  //   assetIds.forEach((assetId, index, object)=>{
  //     object[index] = "resource:org.example.mynetwork.Commodity#"+assetId;
  //   })
  //   ownerId = "resource:org.example.mynetwork.Trader#"+ownerId;

  //   let transaction= new AssetTransfer(assetIds, ownerId, null, null, percentage);

    
  //   this.hyperLedgerService.addAssetTransfer(transaction).subscribe(
  //     (response) => {
  //       this.loadData()
  //     },
  //     (error) => console.log(error)
  //   );
  // }
}
