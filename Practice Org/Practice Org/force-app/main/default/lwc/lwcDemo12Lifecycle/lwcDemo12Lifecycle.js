import { LightningElement } from 'lwc';

export default class LwcDemo12Lifecycle extends LightningElement {
    
    constructor() {
        super(); //all methods of parent are called and it's mandatory as we don't want to change the functionality

        console.log("Constructor is called");
    }

    connectedCallback() {
        console.log("connected callback method is called");
    }

    renderedCallback() {
        console.log("rerendered callback is called");
    }

    disconnectedCallback() {
        console.log("disconnected callback is called");
    }
}