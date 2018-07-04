import { Component, OnInit } from "@angular/core";
import { Asset } from "../types/asset.model";
import { HyperledgerService } from "../services/Hyperledger.service";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-document",
  templateUrl: "./document.component.html",
  styleUrls: ["./document.component.css"]
})
export class DocumentComponent implements OnInit {
  assetsMap = new Map<string, Asset[]>();
  sampleForm;
  isSaveMode = true;
  isEditMode = false;
  types: string[];
  selectedType: string;
  selectedAssets: Asset[];

  constructor(private hyperLedgerService: HyperledgerService) {}

  ngOnInit() {
    this.loadData();
    this.sampleForm = new FormGroup({
      count: new FormControl(),
      name: new FormControl(),
      description: new FormControl(),
      value: new FormControl(),
      owner: new FormControl(),
      type: new FormControl()
    });
  }

  loadData() {
    this.assetsMap.clear();
    this.hyperLedgerService.getAssetsByType().subscribe(
      response => {
        let assets = response.json();
        assets.forEach((asset, index, object) => {
          asset.owner = asset.owner.substring(37);
          if (this.assetsMap.has(asset.type)) {
            let assets = this.assetsMap.get(asset.type);
            assets.push(asset);
            this.assetsMap.set(asset.type, assets);
          } else {
            this.assetsMap.set(asset.type, [asset]);
          }
        });
        this.types = Array.from(this.assetsMap.keys());
        this.selectedAssets = this.assetsMap.get(this.types[0]);
        console.log(this.assetsMap);
        console.log(this.types);
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
      count: "",
      value: "",
      name: "",
      description: "",
      owner: "",
      type: ""
    });
    this.isSaveMode = true;
    this.isEditMode = false;
  }

  enableEditAsset(event, asset: Asset) {
    this.sampleForm.setValue({
      count: "",
      value: asset.value,
      name: asset.name,
      description: asset.description,
      owner: asset.owner,
      type: asset.type
    });
    this.isSaveMode = false;
    this.isEditMode = true;
  }

  save() {
    let count = this.sampleForm.controls.count.value;
    let description = this.sampleForm.controls.description.value;
    let name = this.sampleForm.controls.name.value;
    let value = this.sampleForm.controls.value.value;
    let owner = this.sampleForm.controls.owner.value;
    let type = this.sampleForm.controls.type.value;
    if (this.isSaveMode) {
      owner = "resource:org.example.mynetwork.Trader#" + owner;
      for (let i = 0; i < count; i++) {
        let tradingSymbol = this.randomInt(1000000000, 9999999999);
        let asset = new Asset(
          tradingSymbol,
          name,
          description,
          value,
          owner,
          type
        );
        this.hyperLedgerService.addAsset(asset).subscribe(
          response => {
            this.loadData();
          },
          error => console.log(error)
        );
      }
    } else {
      //   owner = "resource:org.example.mynetwork.Trader#" + owner.substring(1);
      //   let asset = new Asset(null, name, description, value, owner, type);
      //   this.hyperLedgerService.updateAsset(tradingSymbol, asset).subscribe(
      //     response => {
      //       this.loadData();
      //     },
      //     error => console.log(error)
      //   );
    }
  }

  removeAsset(event, asset: Asset) {
    this.hyperLedgerService.removeAsset(asset).subscribe(
      response => {
        this.loadData();
      },
      error => console.log(error)
    );
  }

  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
