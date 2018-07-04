/**
 * Created by Fabian on 19/10/2016.
 */
import { Component, ElementRef, Input } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HyperledgerService } from '../services/Hyperledger.service';
@Component({
    selector: 'file-upload',
    template: '<input type="file" [attr.multiple]="multiple ? true : null" (change)="upload()" >'
})
export class FileUploadComponent {
    constructor(private http: Http,
                private el: ElementRef,
                private hyperledgerService: HyperledgerService
    ) {}
    
    @Input() multiple: boolean = false;

    upload() {
        let inputEl = this.el.nativeElement.firstElementChild;
        if (inputEl.files.length == 0) return;

        let files :FileList = inputEl.files;
        const formData = new FormData();
        for(var i = 0; i < files.length; i++){
            formData.append('card', files[i]);
        }
        // const headers = new Headers();
        // headers.set('Content-Type', 'multipart/form-data');

        this.http
            .post('http://173.193.79.254:31090/api/wallet/import', formData, {withCredentials: true})
            .subscribe(
              res =>{
                console.log(res);
                alert("thanks for uploading the business network card, now you can sign execute and sign your transactions")
                this.hyperledgerService.verify()
              },
              err => {
                console.log(err);
              }
            );

        

    }
}