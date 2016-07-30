import {Session} from 'meteor/session';

Template.showRecipes.helpers({
    recipes() {
        let ingre = Fridge.find().fetch();
        let ing = [];
        for (let i = 0; i < Fridge.find().count(); i++) {
            ing.push(ingre[i].name);
        }
        ing = ing.join();
        Meteor.call('getRecipe', ing, function(e, res) {
            let results = _.uniq(JSON.parse(res.content).results, function(p) {return p.title});
            results = _.filter(results, function(p) {
                return p.thumbnail != "" && p.href.indexOf("kraft") == -1;
            });
            Session.set("results", results);
        });
        return Session.get("results");
    }
});

Template.singleRecipe.helpers({
    recipe() {
        let ingre = Fridge.find().fetch();
        let ing = [];
        for (let i = 0; i < Fridge.find().count(); i++) {
            ing.push(ingre[i].name);
        }
        ing = ing.join();
        Meteor.call('getRecipe', ing, function(e, res) {
            let results = _.uniq(JSON.parse(res.content).results, function(p) {return p.title});
            results = _.filter(results, function(p) {
                return p.thumbnail != "" && p.href.indexOf("kraft") == -1;
            });
            Session.set("results", results);
        });
        return Session.get("results")[0];
    }
});

Template.recipeOfTheDay.helpers({
	showAll() {
		return Session.get('showAll');
	}
});

Template.recipeOfTheDay.events({
    'click .show-all-btn': function() {
        Session.set('showAll', !Session.get('showAll'));
    }
});

Template.recipeOfTheDay.onCreated(function() {
    Session.set('showAll', false);
});
