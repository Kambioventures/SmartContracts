import { Component, OnInit } from "@angular/core";
import { Asset } from "../types/asset.model";
import { HyperledgerService } from "../services/Hyperledger.service";
import { FormControl, FormGroup } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { AssetTransfer } from "../types/assetTransfer.model";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  assetsMap = new Map<string, Asset[]>();
  sampleForm;
  types: string[];
  selectedType: string;
  selectedAssets: Asset[];

  constructor(
    private hyperLedgerService: HyperledgerService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadData();
    this.sampleForm = new FormGroup({
      type: new FormControl(),
      count: new FormControl(),
      ownerId: new FormControl()
    });
  }

  loadData() {
    this.assetsMap.clear();
    this.hyperLedgerService.getAssetsByType().subscribe(
      response => {
        let assets = response.json();
        assets.forEach((asset, index, object) => {
          if (asset.owner.substring(38) == this.authService.getUser().traderId) {
            asset.owner = asset.owner.substring(37);
            if (this.assetsMap.has(asset.type)) {
              let assets = this.assetsMap.get(asset.type);
              assets.push(asset);
              this.assetsMap.set(asset.type, assets);
            } else {
              this.assetsMap.set(asset.type, [asset]);
            }
          }
        });
        this.types = Array.from(this.assetsMap.keys());
        this.selectedAssets = this.assetsMap.get(this.types[0]);
      },
      error => {
        console.log(error);
      }
    );
  }

  updateSelectedType(type) {
    this.selectedAssets = this.assetsMap.get(type);
  }

  enableSaveMode() {
    this.sampleForm.setValue({
      type: "",
      count: "",
      ownerId: ""
    });
  }

  save() {
    let type = this.sampleForm.controls.type.value;
    let count = this.sampleForm.controls.count.value;
    let ownerId = this.sampleForm.controls.ownerId.value;
    ownerId = "resource:org.example.mynetwork.Trader#" + ownerId;

    let allCount = 0;
    this.hyperLedgerService.getAssetsByType().subscribe(
      response => {
        let allAssets: Asset[] = response.json();
        allCount = 0;
        allAssets.forEach((asset, index, array) => {
          if (asset.type == type) allCount = allCount + 1;
        });
        let percentage = (count / allCount) * 100;
        console.log(percentage);
        let assets = this.assetsMap.get(type);
        let movingAssets: String[] = [];
        for (let i = 0; i < count; i++) {
          let assetId =
            "resource:org.example.mynetwork.Commodity#" +
            assets[i].tradingSymbol;
          movingAssets.push(assetId);
        }

        let transaction = new AssetTransfer(
          movingAssets,
          ownerId,
          null,
          null,
          percentage + ""
        );
        this.hyperLedgerService
          .addAssetTransfer(transaction)
          .subscribe(
            response => console.log(response),
            error => console.log(error)
          );
        this.loadData();
      },
      error => console.log(error)
    );
  }

  removeAsset(event, asset: Asset) {
    this.hyperLedgerService.removeAsset(asset).subscribe(
      response => {
        this.loadData();
      },
      error => console.log(error)
    );
  }
}
