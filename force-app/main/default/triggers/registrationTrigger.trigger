trigger registrationTrigger on Ecom_Registration__c (after insert) {

    //set<string> email = new set<string>();
    string email;
    for(Ecom_Registration__c rec : trigger.new){
        //email.add(rec.Email__c);
        email = rec.Email__c;
    }
    if(String.isNotBlank(email)){
        system.debug(email);
        utilityController con = new utilityController();
        con.sendEmailToRegisterUser(email);        
    }
}