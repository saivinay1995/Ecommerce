({
    doInit : function(component, event, helper) {
        component.get('v.RegistrationData');
        console.log(JSON.stringify(component.get('v.RegistrationData')));
    },

    handleSelect: function(component, event){        
        var selectedMenuItemValue = event.getParam("value");
        if(selectedMenuItemValue == 'Logout'){
            var navigateEvent = $A.get("e.force:navigateToComponent");
            navigateEvent.setParams({
                componentDef: "c:LoginComponent"
            });
            navigateEvent.fire();
        }
        else if(selectedMenuItemValue == 'Registration'){
            var navigateEvent = $A.get("e.force:navigateToComponent");
            navigateEvent.setParams({
                componentDef: "c:Registration",
                componentAttributes :{ RegistrationData : component.get('v.RegistrationData'),
                                        editUserRecor : true}
            });
            navigateEvent.fire();
        }
    },

    getToggleButtonValue:function(component,event,helper){
        var checkCmp = component.find("tglbtn").get("v.checked");
        console.log(checkCmp);
        if(checkCmp == true){
            alert('Selected only Veg!!');
        }
        else{
            alert('All Items');
        }
    },
    showSpinner : function(component,event,helper){
        component.set("v.toggleSpinner", true);  
    },
    hideSpinner : function(component,event,helper){
        component.set("v.toggleSpinner", false);
    },
})