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

Template.missingIngredients.events({
    'click .missing-ing'() {
        Cart.insert({
            name: String(this),
            createdAt: new Date()
        });
    }
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
        let myCart= Cart.find().fetch();
        let cart = [];
        for (let i = 0; i < Fridge.find().count(); i++) {
            ing.push(myIngredients[i].name);
        }
        for (let i = 0; i < Cart.find().count(); i++) {
            cart.push(myCart[i].name);
        }
        retVal = _.filter(ingredients, function(i) {
            return ing.indexOf(i) == -1;
        });
        return _.filter(retVal, function(i) {
            return cart.indexOf(i) == -1;
        });
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
            let diff = function(a, b) {
                let aingredients = a.ingredients.split(",");
                let aingre = [];
                for (let i = 0; i < aingredients.length; i++) {
                    aingre.push(aingredients[i].trim());
                }
                let bingredients = b.ingredients.split(",");
                let bingre = [];
                for (let i = 0; i < bingredients.length; i++) {
                    bingre.push(bingredients[i].trim());
                }
                let filtera = _.filter(aingre, function(i) {
                    return ing.indexOf(i) == -1;
                });
                let filterb = _.filter(bingre, function(i) {
                    return ing.indexOf(i) == -1;
                });
                filtera = filtera.length;
                filterb = filterb.length;
                return filtera-filterb;
            }
            results = results.sort(function(a, b) {
                return diff(a,b);
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
