({
    helperMethod : function(component, event, helper) {
        var action = component.get('c.retreiveAllProducts');
        var productCategory = component.get('v.toggleCategory');
        action.setParams({category: productCategory});
        action.setCallback(this,function(response) {
            var state=response.getState();
            if(state=='SUCCESS')
            {
                if(response.getReturnValue().length>0){
                    console.log(JSON.stringify(response.getReturnValue()));
                    component.set('v.itemsList',response.getReturnValue());
                    console.log(component.get('v.itemsList'));
                    console.log('with json-->'+JSON.stringify(component.get('v.itemsList')));
                }
                else{
                    console.log('No data');
                }
            }
        });
        $A.enqueueAction(action);
    }
})
