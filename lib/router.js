// home
HOME = "dailyRecipe";

FlowRouter.route('/', {
    action: function() {
        BlazeLayout.render("mainLayout", {
            content: HOME
        });
    },

    name: 'home'
});

FlowRouter.route('/add', {
    action() {
        BlazeLayout.render("mainLayout", {
            content: "foodCam"
        });
    },
    name: 'add'
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

FlowRouter.route('/cart', {
    action: function() {
        BlazeLayout.render("mainLayout", {
            content: "cart"
        });
    }
});
