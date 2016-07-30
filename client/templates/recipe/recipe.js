import {Session} from 'meteor/session';
import {Bert} from 'meteor/themeteorchef:bert';

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
                return p.thumbnail != "" && p.href.indexOf("kraft") == -1 && p.href.indexOf("cookeatshare") == -1;
            });
            Session.set("results", results);
            Session.set("ingredientsCount", results.length);
        });
        return Session.get("results")[Session.get("showIndex")];
    }
});


Template.recipeOfTheDay.events({
    'click .show-next-btn': function() {
        if (Session.get('showIndex') + 1 < Session.get('ingredientsCount'))
            Session.set('showIndex', Session.get('showIndex') + 1);
    },
    'click .show-prev-btn': function() {
        if (Session.get('showIndex') - 1 >= 0)
            Session.set('showIndex', Session.get('showIndex') - 1);
    }
});

Template.recipeOfTheDay.helpers({
    canClickPrev() {
        return Session.get('showIndex') > 0
                ? ""
                : "disabled";
    },
    canClickNext() {
        return Session.get('showIndex') 
        < Session.get("ingredientsCount")-1
            ? ""
            : "disabled";
    }
});

Template.recipeOfTheDay.onCreated(function() {
    Session.setDefault('showIndex', 0);
});

Template.missingIngredients.helpers({
    diffIngredients (ingre) {
        ingre= ingre.split(",");
        let ingredients = [];
        for (let i = 0; i < ingre.length; i++) {
            ingredients.push(ingre[i].trim());
        }
        let myIngredients = Fridge.find().fetch();
        let ing = [];
        for (let i = 0; i < Fridge.find().count(); i++) {
            ing.push(myIngredients[i].name);
        }
        console.log(ingredients);
        console.log(ing);
        return _.filter(ingredients, function(i) {
            return ing.indexOf(i) == -1;
        });
    } 
});
