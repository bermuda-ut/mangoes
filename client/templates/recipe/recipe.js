Template.recipe.events({
    'submit .recipe-form': function(event) {
        event.preventDefault();
        let ing = event.target.text.value;
        Meteor.call('getRecipe', ing, function(e, res) {
            let results = JSON.parse(res.content).results;
            for (let i = 0; i < results.length; i++) {
                console.log(results[i].title);
            }
        });
    }
});
