import { LightningElement } from 'lwc';

export default class LwcDemo6NonReactivePrivateProperty extends LightningElement {
    nonReactivePrivateProp = "Demo 6 Non Reactive Priavte Property";

    handleClick() {
        this.nonReactivePrivateProp = "Property value changed";
        console.log(">>>>>"+this.nonReactivePrivateProp);
    }
}