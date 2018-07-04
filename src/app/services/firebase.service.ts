import {Injectable} from '@angular/core';
import { User } from '../types/user.model';
import { Http } from '@angular/http';

@Injectable({
    providedIn: 'root'
})
export class FirebaseService{
    public items: any;
    public item: any;

    constructor(private http:Http) { }

    add_user(user: User) {
        return this.http.put('https://stock-network.firebaseio.com/Trader/'+user.traderId+'.json', user);
    }

    get_users(){
        return this.http.get('https://stock-network.firebaseio.com/Trader.json');
    }
}