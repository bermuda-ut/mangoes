Template.cart.helpers({
    cart() {
        return Cart.find({}, {sort: {name: 1}});
    }
});
