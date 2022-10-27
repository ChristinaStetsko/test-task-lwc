import { LightningElement, api } from 'lwc';

export default class AccountTile extends LightningElement {
    @api account;
    @api selectedAccountId;

    // Fires event with the Id of the account that has been selected.
    selectAccount() {
        const accountselect = new CustomEvent("accountselect", {
            detail: {
                accountId: this.account.Id
            }
        });
        this.dispatchEvent(accountselect);
    }
}