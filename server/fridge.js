if (Meteor.isServer) {
    Meteor.startup(() => {
        if (Fridge.find().count() < 1) {
            let today = new Date();
            Fridge.insert({
                name: "chicken",
                amount: "2kg",
                doe: today.setDate(today.getDate() + 10)   // expires 10 days from now
            });
            Fridge.insert({
                name: "apple",
                amount: "500g",
                doe: today.setDate(today.getDate() + 20)   // expires 20 days from now
            });
            Fridge.insert({
                name: "avocado",
                amount: "1kg",
                doe: today.setDate(today.getDate() + 5)   // expires 5 days from now
            });
            Fridge.insert({
                name: "butter",
                amount: "800g",
                doe: today.setDate(today.getDate() + 100)   // expires 100 days from now
            });
            Fridge.insert({
                name: "yogurt",
                amount: "1kg",
                doe: today.setDate(today.getDate() + 7)   // expires 10 days from now
            });
        }
    });
}
