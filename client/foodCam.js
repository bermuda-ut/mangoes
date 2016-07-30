import { Template } from 'meteor/templating';
import {Bert} from 'meteor/themeteorchef:bert';
import { ReactiveVar } from 'meteor/reactive-var';

import './templates/foodCam.html';

Template.foodCam.helpers({
    getTempFridgeStatus() {
        if(TempFridge.find().count())
            return true;
        return false;
    },
    gotPhoto() {
      filename = Template.instance().Test.get();
      if(filename)
          return true;
      return false;
    },
    getStatus() {
        return Template.instance().status.get();
    }
});

Template.foodCam.events({
    'click .takePicture'(event, instance) {
        console.log("PICUTURE!");
        Template.instance().Test.set(1);
        Template.instance().status.set("Loading..");
        MeteorCameraUI.getPicture({
            quality: 100
        }, function (error, data) {
            if (!error) {
                this.$('.photo').attr('src', data); 
                Bert.alert('Picture captured!', 'success', 'growl-top-right');
                Meteor.call('uploadImg', data, function(err, res) {
                    console.log(res);
                });
            }
        });
    }, 'change .filePath'(event, instant) {
        filename = $('.filePath').val().split('\\')[2];
        Template.instance().Test.set(1);
        Template.instance().status.set("Loading..");
        Bert.alert('Uploaded receipt!', 'success', 'growl-top-right');
        Meteor.call('imgToText', '/home/bermudaut/Bermuda/' + filename, function(err,res) {
           console.log(res);
        });
  },

  'click .submitTemp'(event, instant) {
    BlazeLayout.render("mainLayout", {
        content: "addFridge"
    });
  }
});

Template.foodCam.onCreated(function foodCamOnCreated() {
    Meteor.call('resetTemp');
    Template.instance().Test = new ReactiveVar(0);
    Template.instance().status = new ReactiveVar("No Ingredients to Add");
    Template.instance().cursorTempFridge = TempFridge.find();
});

