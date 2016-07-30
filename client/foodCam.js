import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './templates/foodCam.html';

Template.foodCam.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.foodCam.events({
  'click .takePicture'(event, instance) {
        console.log("PICUTURE!");
        MeteorCameraUI.getPicture({
            quality: 100,
            width: 100,
            height: 100
        }, function (error, data) {
            if (!error) {
                template.$('.photo').attr('src', data); 
            }
        })
  },
});

Template.foodCam.onCreated(function foodCamOnCreated() {
  // counter starts at 0
});


