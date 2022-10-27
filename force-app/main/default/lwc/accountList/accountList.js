import { LightningElement, wire} from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import { NavigationMixin } from 'lightning/navigation';
import searchAccounts from '@salesforce/apex/AccountDataController.searchAccounts'

export default class AccountList extends LightningElement {
	searchTerm = '';
    accounts;
    @wire(MessageContext) messageContext;
    @wire(searchAccounts, { searchTerm: '$searchTerm' })
    loadAccounts(result) {
        this.accounts = result;
        // if (result.data) {
        //     const message = {
        //         accounts: result.data
        //     };
        //     publish(this.messageContext, BEAR_LIST_UPDATE_MESSAGE, message);
        // }
    }
    
    handleSearchTermChange(event) {
        // Debouncing this method: do not update the reactive property as
        // long as this function is being called within a delay of 300 ms.
        // This is to avoid a very large number of Apex method calls.
        window.clearTimeout(this.delayTimeout);
        const searchTerm = event.target.value;
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        this.delayTimeout = setTimeout(() => {
            this.searchTerm = searchTerm;
        }, 300);
    }
    get hasResults() {
        return (this.accounts.data.length > 0);
    }
    handleAccountView(event) {
        // Get account record id from accountview event
        const accountId = event.detail;
        // Navigate to account record page
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: accountId,
                objectApiName: 'Account',
                actionName: 'view',
            },
        });
    }


    // searchTerm = '';
	// @wire(searchAccounts, {searchTerm: '$searchTerm'})
	// accounts;
	
	// handleSearchTermChange(event) {
	// 	// Debouncing this method: do not update the reactive property as
	// 	// long as this function is being called within a delay of 300 ms.
	// 	// This is to avoid a very large number of Apex method calls.
	// 	window.clearTimeout(this.delayTimeout);
	// 	const searchTerm = event.target.value;
	// 	// eslint-disable-next-line @lwc/lwc/no-async-operation
	// 	this.delayTimeout = setTimeout(() => {
	// 		this.searchTerm = searchTerm;
	// 	}, 300);
	// }
	// get hasResults() {
	// 	return (this.accounts.data.length > 0);
	// }

    // accounts;
	// error;
	
	// connectedCallback() {
	// 	this.loadAccounts();
	// }
	// loadAccounts() {
	// 	searchAccounts()
	// 		.then(result => {
	// 			this.accounts = result;
	// 		})
	// 		.catch(error => {
	// 			this.error = error;
	// 		});
	// }
    
}