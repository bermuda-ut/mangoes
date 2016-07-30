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
        console.log(Template.instance().data._id);
        var id = Template.instance().data._id;
        var name = Template.instance().data.name;
        if(TempFridge.findOne({'_id': id, 'name': name}))
            TempFridge.remove({'_id': id});
        else
            Fridge.remove({'_id': id});
    }
});

Template.listItems.onCreated(function onCreated() {
    console.log(Template.instance().data);
});
