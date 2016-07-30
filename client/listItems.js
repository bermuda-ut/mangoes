import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './templates/listItems.html';

Template.listItems.helpers({
	tempData() {
        return Template.instance().data
    }
});

Template.listItems.events({
    'click .delRecord'(event, instance) {
        var id = Template.instance().data._id;
        TempFridge.remove({'_id': id});
    }
});

Template.listItems.onCreated(function onCreated() {
    console.log(Template.instance().data);
});
