import { LightningElement ,api} from 'lwc';

export default class LwcDemo7PublicPropertyChild extends LightningElement {
    @api contactInfo = {id:"1",name:"Apoorv",email:"apoorvanand4@gmail.com"};
}