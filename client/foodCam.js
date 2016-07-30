import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './templates/foodCam.html';

Template.foodCam.helpers({
    test() {
        return Template.instance().Test.get();
    },
});

Template.foodCam.events({
  'click .takePicture'(event, instance) {
        console.log("PICUTURE!");
        MeteorCameraUI.getPicture({
            quality: 100
        }, function (error, data) {
            if (!error) {
                this.$('.photo').attr('src', data); 

                Meteor.call('uploadImg', data, function(err, res) {
                    console.log(res);
                });
            }
        })
  },

  'click .uploadPicture'(event, instant) {
      filename = $('.filePath').val().split('\\')[2];
      Template.instance().Test.set(12);

      Meteor.call('imgToText', '/home/bermudaut/Bermuda/' + filename, function(err,res) {
          console.log(res);
      })
  }
});

Template.foodCam.onCreated(function foodCamOnCreated() {
    Template.instance().Test = new ReactiveVar(0);
    Template.instance().cursorTempFridge = TempFridge.find();
});

