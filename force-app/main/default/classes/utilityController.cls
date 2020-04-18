public with sharing class utilityController {
    

    @AuraEnabled
    public static string ecomRegistration(Ecom_Registration__c e){
        try{
            e.Is_Active__c=true;
            upsert e;
            return 'Registration Successfull';
        }
        catch(Exception exp)
        {

            throw new AuraHandledException(exp.getMessage().split(',')[1].split(':')[1]); 
        }

        
    }

    @AuraEnabled
    public static list<Ecom_Registration__c> getLoginUser(string userName, string userPassword){
        list<Ecom_Registration__c> ecomList = [SELECT Id, Is_Active__c, Gender__c, Mobile__c, 
                                Email__c, User_Name__c, Last_Name__c, First_Name__c 
                                FROM Ecom_Registration__c where User_Name__c=: userName
                                and Password__c =: userPassword and Is_Active__c = true] ;
                                
        list<Ecom_Registration__c> ecomUser = new list<Ecom_Registration__c>();
        if(ecomList.size()==1){
            ecomUser = ecomList;
        }
        return ecomUser;
    }


    @AuraEnabled
    public static string updateUser(Ecom_Registration__c e){
        try{
           
            update e;
            return 'updated Successfull';
        }
        catch(Exception exp)
        {

            throw new AuraHandledException(exp.getMessage().split(',')[1].split(':')[1]); 
        }
    }

    @AuraEnabled
    public static Integer validateUserEmail(String email){
        System.debug(email);
        List<Ecom_Registration__c> er=[select id,Email__c from Ecom_Registration__c where Email__c =: email];
        return er.size();
    }

    public void sendEmailToRegisterUser(string email){
        system.debug(email);
        EmailTemplate et=[Select id from EmailTemplate where name = 'EmailTemplatename' limit 1];
        Messaging.SingleEmailMessage message = new Messaging.SingleEmailMessage();
        message.toAddresses = new String[] { email};
        //message.toAddresses = email;
        message.optOutPolicy = 'FILTER';
        message.subject = 'Opt Out Test Message';
        message.plainTextBody = 'This is the message body.';
        Messaging.SingleEmailMessage[] messages =   new List<Messaging.SingleEmailMessage> {message};
        Messaging.SendEmailResult[] results = Messaging.sendEmail(messages);        
        //Messaging.setTemplateId(et.id);
        if (results[0].success) 
        {
            System.debug('The email was sent successfully.');
        } else 
        {
            System.debug('The email failed to send: ' + results[0].errors[0].message);
        }   
    }

    @AuraEnabled
    public static list<EcomProduct__c> retreiveAllProducts(string category){
        list<EcomProduct__c> lstProducts = new list<EcomProduct__c>();
        if(String.isBlank(category)){
           lstProducts = [SELECT Id, Name, Product_Name__c, Product_Price__c, 
                                Product_Picture__c, Product_Category__c FROM EcomProduct__c];
        }
        else{
            lstProducts = [SELECT Id, Name, Product_Name__c, Product_Price__c, 
                                Product_Picture__c, Product_Category__c FROM EcomProduct__c 
                                where Product_Category__c =: category];
        }        
        return lstProducts;
    }
}