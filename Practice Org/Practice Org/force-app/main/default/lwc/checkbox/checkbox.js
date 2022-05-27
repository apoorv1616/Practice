import { LightningElement,track,wire } from 'lwc';
import {fireEvent} from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';

export default class Checkbox extends LightningElement {
    @track valueOfChechbox = false;
    @wire(CurrentPageReference) pageRef;

    handleData(event) {
        this.valueOfChechbox = event.target.checked;
        console.log(this.valueOfChechbox);
        this.fireEventFunc();
    }
    
    fireEventFunc(){
        fireEvent(this.pageRef,'tileclick',this.valueOfChechbox);
    } 
}