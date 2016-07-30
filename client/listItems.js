import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './templates/listItems.html';

Template.listItems.helpers({
	ingredients: [
		{ name: 'Chicken'},
		{ name: 'Milk'},
		{ name: 'Onions'},
	],
});