import {HTTP} from 'meteor/http';

Template.recipe.events({
    'submit .recipe-form': function(event) {
        event.preventDefault();
        let ing = event.target.text.value;
        Meteor.call('getRecipe', ing, function(e, res) {
            console.log(res);
        });
    }
});

Meteor.methods({
    'getRecipe': function(ing) {
        this.unblock();
        let page = "http://www.recipepuppy.com/api?i=eggs,garlic";//+ing;
        console.log(HTTP.call("GET", page));
        HTTP.call("GET", page, {}, function(e, res) {
            if (e) {
                console.log(e);
            } else {
                console.log(res);
                return res;
            }
        });
    }
});

