@isTest
public with sharing class AccountDataControllerTest {
    
    @testSetup
    static void setup() {
        List<User> users = [SELECT Id, Name FROM User];
        List<Account> newAccounts = new List<Account>();
        for (Integer i = 0; i < 3; i++) {
            newAccounts.add(
                new Account(Name = 'Account ' + i,
                            OwnerID = users[0].Id,
                            Number_of_Employees__c = 12, 
                            Budget__c = 3500, 
                            Type = 'Prospect'
                            )
            );
        }
        insert newAccounts;
    }


    @isTest
    static void testGetAccountsWithoutAccountId(){
        List<Account> accountsToTest = AccountDataController.getAccountList();
        List<Account> accountsWithIdExpected = [SELECT Id FROM Account];
        System.assertEquals(accountsWithIdExpected.size(), accountsToTest.size(), 'The account query did not return the right about of accounts');

    }

    

}
