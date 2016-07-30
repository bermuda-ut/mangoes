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
            width: 400,
            height: 720
        }, function (error, data) {
            if (!error) {
                this.$('.photo').attr('src', data); 

                Meteor.call('uploadImg', data, function(err, res) {
                    console.log(err);
                    console.log(res);
                });
            }
        })
  },
});

Template.foodCam.onCreated(function foodCamOnCreated() {
  // counter starts at 0
});

