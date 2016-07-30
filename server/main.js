import { Meteor } from 'meteor/meteor';
import gcloud from 'gcloud';

var fs = Npm.require('fs');
var path = Npm.require('path');
var basePath = path.resolve('.').split('.meteor')[0];

var config = {
    projectId: 'pokegomap-1383',
    keyFilename: basePath + '/pokegoMap-55c16092e5f7.json'
};

myVision = gcloud.vision(config);


/*
myVision.detectText('/home/bermudaut/Bermuda/recipt.png', function(err, text) {
    console.log(text);
    console.log(err);
});
*/

Meteor.startup(() => {
    Meteor.methods({
        imgToText: function(img) {
            myVision.detectText(img, function(err, text) {
                console.log(text);
            })
        },

        uploadImg: function(data) {
            base64Data  =   data.replace(/^data:image\/jpeg;base64,/, "");
            base64Data  +=  base64Data.replace('+', ' ');
            binaryData  =   new Buffer(base64Data, 'base64').toString('binary');

            fs.writeFileSync(basePath + 'fuckme.jpeg', binaryData, 'binary');

            myVision.detectText(basePath + 'fuckme.jpeg', function(err, text) {
                console.log(text);
            })
        }
    });
});
