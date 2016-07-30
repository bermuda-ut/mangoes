Template.addFridge.helpers({
    myArr() {
        return TempFridge.find({},{
            sort: {
                'name': 1
            }
        })
    }
});

Template.addFridge.events({
    'click .nowAdd': function() {
        console.log("adding!");
        var toAdd = TempFridge.find().fetch();

        for(i = 0; i < toAdd.length; i++) {
            var today = new Date();

            var exp = today.setDate(today.getDate() + Math.floor((Math.random() * 14) + 1));

            if(toAdd[i].doe)
                exp = toAdd[i].doe

            var doc = {
                name: toAdd[i].name,
                doe: exp
            }
            Meteor.call('addToFridge', doc);
        }

        Bert.alert('Added to Fridge!', 'success', 'growl-top-right');
        FlowRouter.go('/');
    }
});

Template.addFridge.onCreated(function addFridgeOnCreated() {
});
