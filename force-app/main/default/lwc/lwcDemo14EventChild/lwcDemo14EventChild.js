import { LightningElement ,track,api,wire} from 'lwc';
import {fireEvent} from 'c/pubsub';
import {CurrentPageReference} from 'lightning/navigation';


export default class LwcDemo14EventChild extends LightningElement {
    @api contactInfo = {id:"1",name:"Apoorv",email:"apoorvanand4@gmail.com"};

    @wire(CurrentPageReference) pageRef;

    tileClickHandler() {
        //var tileClicked = new CustomEvent('tileclick',{detail : this.contactInfo,bubbles : true});
        fireEvent(this.pageRef,'tileclick',this.contactInfo);
    }
}