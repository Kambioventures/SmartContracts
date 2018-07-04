import { Injectable } from '@angular/core';
import { User } from '../types/user.model';
import { Asset } from '../types/asset.model';
import { Http, Headers } from '@angular/http';
import { AssetTransfer } from '../types/assetTransfer.model';
import { FirebaseService } from './firebase.service';
import { AssetMap } from '../types/assetMap.model';
@Injectable({
    providedIn: 'root'
})
export class HyperledgerService {
    users: User[];
    assets: Asset[];
    verified: boolean = false;
    a = 2;
    constructor(private http: Http, private firebaseService: FirebaseService) { }

    verify() {
        this.verified = true;
    }
    // authenticateUser(){
    //     const file = new File([cardData], 'myCard.card', {type: 'application/octet-stream', lastModified: Date.now()});
    //     const formData = new FormData();
    //     formData.append('card', file);
    //     const headers = new HttpHeaders();
    //     headers.set('Content-Type', 'multipart/form-data');
    //     return this.httpClient.post('http://173.193.79.254:31090/api/wallet/import', formData, {withCredentials: true, headers}).toPromise();
    // }

    getUsers() {
        return this.http.get('http://173.193.79.254:31090/api/Trader');
    }

    updateUser(traderId: String, user: User) {
        return this.http.put('http://173.193.79.254:31090/api/Trader/' + traderId, user, );
    }

    addUser(user: User) {
        this.firebaseService.add_user(user).subscribe(
            response => console.log(response),
            error => console.log(error)
        );
        return this.http.post('http://173.193.79.254:31090/api/Trader', user);
    }

    removeUser(user: User) {
        return this.http.delete('http://173.193.79.254:31090/api/Trader/' + user.traderId);
    }

    ////////////////////////////////////////////////
    ///////////   Asset  Functions   ///////////////
    ////////////////////////////////////////////////
    getAssets() {
        return this.http.get('http://173.193.79.254:31090/api/Commodity');
    }

    updateAsset(tradingSymbol: String, asset: Asset) {
        return this.http.put('http://173.193.79.254:31090/api/Commodity/' + tradingSymbol, asset);
    }


    addAsset(asset: Asset) {
        return this.http.post('http://173.193.79.254:31090/api/Commodity', asset);
    }

    removeAsset(asset: Asset) {
        return this.http.delete('http://173.193.79.254:31090/api/Commodity/' + asset.tradingSymbol);
    }


    
    getAssetTransfer() {
        return this.http.get('http://173.193.79.254:31090/api/Trade');
    }

    addAssetTransfer(transaction: AssetTransfer) {
        return this.http.post('http://173.193.79.254:31090/api/Trade', transaction);
    }

    /******/

    //TODO check this
    getAssetsByType(){
        return this.http.get('http://173.193.79.254:31090/api/Commodity');
    }
}