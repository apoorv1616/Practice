import { LightningElement ,track} from 'lwc';

export default class LwcDemo2JavascriptBinding extends LightningElement {
    @track dynamicGreeting = "World From Js";

    greetingChangeHandler(event) {
        this.dynamicGreeting = event.target.value;   
    }
}