import { LightningElement,track } from 'lwc';
import {convertctof} from 'c/ctof';


export default class LwcDemo15TempConverter extends LightningElement {
    @track convertedTemp;
    inputTemp;
    handleTempChange(event) {
        this.inputTemp = event.target.value;
    }

    convertTemp() {
        console.log(this.inputTemp);
        this.convertedTemp = convertctof(this.inputTemp);
    }
}