({
    validateUser : function(component, event, helper) {
        var action = component.get('c.getLoginUser');
        action.setParams({
            userName : component.get('v.uName'),
            userPassword : component.get('v.uPassword')
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                if(response.getReturnValue().length>0){
                    component.set('v.userRecord',response.getReturnValue()[0]);
                    var navigateEvent = $A.get("e.force:navigateToComponent");
                    navigateEvent.setParams({
                        componentDef: "c:HomeComponent",
                        componentAttributes :{ RegistrationData : response.getReturnValue()[0]}
                    });
                    navigateEvent.fire();
                }
                else{
                    //alert('Please enter valid Username/Password');
                    var toastEvent=$A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title":"Login",
                        "message":"Please enter valid Username/Password",
                        "type":"error"      
                    });
                    toastEvent.fire();
                }                
            }
            else if (state === "INCOMPLETE") {
                // do something
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                 errors[0].message);
                        var toastEvent=$A.get("e.force:showToast");
                        toastEvent.setParams({
                            "title":"Login",
                            "message":errors[0].message,
                            "type":"error"      
                        });
                        toastEvent.fire();
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });

        $A.enqueueAction(action);
    },
    
    cancelForm:function(Component){
        Component.set('v.uName','');
        Component.set('v.uPassword','');
    }
})
