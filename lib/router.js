// home
FlowRouter.route('/', {
    action: function() {
        BlazeLayout.render("mainLayout", {
            content: "foodCam"
        });
    }
});

FlowRouter.route('/test', {
    action() {
        BlazeLayout.render("mainLayout", {
            content: "recipe"
        });
    }
});
