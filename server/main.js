import { Meteor } from 'meteor/meteor';
import gcloud from 'gcloud';

var config = {
    projectId: 'pokegomap-1383',
    keyFilename: '/home/bermudaut/Bermuda/pokegoMap-55c16092e5f7.json'
};

myVision = gcloud.vision(config);
var fs = Npm.require('fs');
__ROOT_APP_PATH__ = fs.realpathSync('.');
console.log(__ROOT_APP_PATH__);

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

        uploadImg: function(blob) {
            fs.writeFile('test22.jpg', blob, 'base64', function(err, text) {
                console.log(err);
                console.log(text);
            });
        }
    });
});
