import { LightningElement } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import signaturePadURL from '@salesforce/resourceUrl/signature_pad';

export default class SignaturePad extends LightningElement {
    sigPadInitialized = false;
    canvasWidth = 400;
    canvasHeight = 200;

    renderedCallback() {
        if (this.sigPadInitialized) {
            return;
        }
        this.sigPadInitialized = true;

        Promise.all([
            loadScript(this, signaturePadURL)
        ])
            .then(() => {
                this.initialize();
            })
            .catch(error => {
                console.log(error);
            });
    }

    initialize() {
        const canvas = this.template.querySelector('canvas.signature-pad');
        this.signaturePad = new window.SignaturePad(canvas);
    }

    handleClick() {
        console.log(this.signaturePad.toDataURL());
        var data = this.signaturePad.toDataURL();
        var a = document.createElement("a"); //Create <a>
        a.href = data; //Image Base64 Goes here
        a.download = "Image.jpg"; //File name Here
        a.click();
    }
}