Template.dailyRecipe.events({
    'click .add-ing'() {
        FlowRouter.go('add');
    }
});


Template.dailyRecipe.helpers({
    ingredients() {
        return Fridge.find({}, {sort: {name: 1}});
    }
});
