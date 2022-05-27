import { LightningElement,track,api,wire } from 'lwc';
import { registerListener,unregisterAllListeners } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';

export default class Chechboxvalue extends LightningElement {
    @track value = false;
    @wire(CurrentPageReference) pageRef;

    onCheckboxSelectHandler(data) {
        console.log(JSON.stringify(data));
        this.value = data;
    }
    
    connectedCallback() {
        registerListener('tileclick',this.onCheckboxSelectHandler,this);
    
    }

    disconnectedCallback() {
        unregisterAllListeners(this);
    }
}