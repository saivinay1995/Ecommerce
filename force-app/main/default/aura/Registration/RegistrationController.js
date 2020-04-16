({
    signUp : function(component, event, helper) {
        console.log(JSON.stringify(component.get("v.RegistrationData")));
        var action=component.get("c.ecomRegistration");
        action.setParams({"e":component.get("v.RegistrationData")});
        action.setCallback(this,function(response) {
           var state=response.getState();
           if(state=='SUCCESS')
           {
               var toastEvent=$A.get("e.force:showToast");
               toastEvent.setParams({
                   "title":"Registration",
                   "message":response.getReturnValue(),
                   "type":"Success"
               });
               toastEvent.fire();
           }
           else
           {
               var errors=response.getError();
                var toastEvent=$A.get("e.force:showToast");
                toastEvent.setParams({
                    "title":"Registration",
                    "message":errors[0].message,
                    "type":"error"      
                });
                toastEvent.fire();
           } 
        });

        $A.enqueueAction(action);

    },

    emailvalidation : function(cmp,evt,helper) {
        console.log('inside');
        var action=cmp.get("c.validateUserEmail");
      	debugger;
        action.setParams({email:evt.getParam('value')});
        action.setCallback(this,function(response){
            var state=response.getState();
            if(state=='SUCCESS')
            {
                if(response.getReturnValue()>0)
                    cmp.set("v.emailerrorBoolean",true);
                else
                    cmp.set("v.emailerrorBoolean",false);
            }
        });

        $A.enqueueAction(action);
    },
    
    saveRecord : function(component,event,helper)
    {
        var action=component.get("c.updateUser");
        action.setParams({"e":component.get("v.RegistrationData")});
        action.setCallback(this,function(response) {
           var state=response.getState();
           if(state=='SUCCESS')
           {
               var toastEvent=$A.get("e.force:showToast");
               toastEvent.setParams({
                   "title":"Registration",
                   "message":response.getReturnValue(),
                   "type":"Success"
               });
               toastEvent.fire();
           }
           else
           {
               var errors=response.getError();
                var toastEvent=$A.get("e.force:showToast");
                toastEvent.setParams({
                    "title":"Registration",
                    "message":errors[0].message,
                    "type":"error"      
                });
                toastEvent.fire();
           } 
        });

        $A.enqueueAction(action);

    }
})