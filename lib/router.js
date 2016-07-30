// home
HOME = "foodCam";

FlowRouter.route('/', {
    action: function() {
        BlazeLayout.render("mainLayout", {
            content: HOME
        });
    },

    name: 'home'
});

FlowRouter.route('/recipe', {
    action() {
        BlazeLayout.render("mainLayout", {
            content: "dailyRecipe"
        });
    }
});

FlowRouter.route('/test2', {
    action() {
        BlazeLayout.render("mainLayout", {
            content: "listItems"
        });
    }
});

FlowRouter.route('/test', {
    action: function() {
        BlazeLayout.render("mainLayout", {
            content: "addFridge"
        });
    }
});
