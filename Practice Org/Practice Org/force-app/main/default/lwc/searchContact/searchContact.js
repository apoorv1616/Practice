import { LightningElement, track } from 'lwc';
import findContactName from '@salesforce/apex/SearchContactName.findContactName';
import increaseSearchCount from '@salesforce/apex/SearchContactName.increaseSearchCount';

export default class SearchContact extends LightningElement {
    @track searchName;
    @track showDidYouMean = false;
    @track contact = {};
    @track showResult = false;
    @track result = {};

    connectedCallback() {
        this.result['isExactMatch'] = true;
    }
    handleKeyUp(evt) {
        const isEnterKey = evt.keyCode === 13;
        if (isEnterKey) {
            this.searchName = evt.target.value;
            if(!this.searchName) {
                this.showResult=false;
                this.contact.Name = null;
                return;
            }
            this.findContactName();
        }
    }

    findContactName() {
        findContactName({
            seachName : this.searchName
        })
        .then(result => {
            if(result) {
                this.contact = JSON.parse(JSON.stringify(result.contactList[0]));
                this.result = JSON.parse(JSON.stringify(result));
                console.log('this.contact',JSON.stringify(this.contact));
            }
        })
        .catch(error => {
            console.log('error => ',JSON.stringify(error));
        });
    }

    increaseSearchCount() {
        increaseSearchCount({
            con : this.contact
        })
        .then(result => {
            this.showResult = true;
        })
        .catch(error => {
            console.log('error => ',JSON.stringify(error));
        });
    }
}