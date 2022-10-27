import { LightningElement, api } from 'lwc';

export default class AccTile extends LightningElement {
    @api account;

    selectAccount() {
        const accountselect = new CustomEvent("accountselect", {
            detail: this.account.Id
        });
        console.log('>>>>>>>>>>>>>>>>>> Id ' + this.account.Id);
        this.dispatchEvent(accountselect);
    }
    
}