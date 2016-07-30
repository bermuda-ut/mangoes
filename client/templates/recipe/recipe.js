import {Session} from 'meteor/session';

Template.recipe.events({
    'submit .recipe-form': function(event) {
        event.preventDefault();
        let ing = event.target.text.value;
        Meteor.call('getRecipe', ing, function(e, res) {
            let results = _.uniq(JSON.parse(res.content).results, function(p) {return p.title});
            results = _.filter(results, function(p) {return p.href.indexOf("kraft") == -1;});
            Session.set("loaded", true);
            Session.set("results", results);
        });
    }
});

Template.showRecipes.helpers({
    recipes() {
        return Session.get("results");       
    },

    canShow() {
        return Session.get("loaded");
    }
    
});

Template.showRecipes.onCreated(function() {
    Session.set("loaded", false);
    let ing = "chicken,avocado"; // TODO: this is hardcoded
    Meteor.call('getRecipe', ing, function(e, res) {
        let results = _.uniq(JSON.parse(res.content).results, function(p) {return p.title});
        results = _.filter(results, function(p) {return p.href.indexOf("kraft") == -1;});
        Session.set("loaded", true);
        Session.set("results", results);
    });
});
