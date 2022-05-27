import {LightningElement,track,wire} from 'lwc';
import { registerListener,unregisterAllListeners } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';


export default class LwcDemo14EventOtherCmp extends LightningElement {
    @track selectedContactInfo;
    @wire(CurrentPageReference) pageRef;

    onContactSelectHandler(data) {
        this.selectedContactInfo = data.name;
    }

    connectedCallback() {
        registerListener('tileclick',this.onContactSelectHandler,this);
    }

    disconnectedCallback() {
        unregisterAllListeners(this);
    }
}