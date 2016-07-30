import { Meteor } from 'meteor/meteor';
import gcloud from 'gcloud';
import {HTTP} from 'meteor/http';

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
        imgToText: function(path) {
            imgToTextLocal(path);
        },

        uploadImg: function(data) {
            base64Data  =   data.replace(/^data:image\/jpeg;base64,/, "");
            base64Data  +=  base64Data.replace('+', ' ');
            binaryData  =   new Buffer(base64Data, 'base64').toString('binary');

            fs.writeFileSync(basePath + 'fuckme.jpeg', binaryData, 'binary');

            imgToTextLocal(basePath + 'fuckme.jpeg');
        },

        getRecipe: function(ing) {
            this.unblock();
            let page = "http://www.recipepuppy.com/api?i="+ing;
            return HTTP.call("GET", page);
        },

        resetTemp: function() {
            TempFridge.remove({});
        }
    });
});

function imgToTextLocal(path) {
    console.log(path);
    var simple = true;

    myVision.detectText(path, function(err, text) {
        console.log(err);
        console.log(text);
        if(!text)
            return 0;

        if(simple) {
            for(i=1; i < text.length-1; i++) {
                t = text[i].toLowerCase();
                var Fiber = Npm.require('fibers');
                Fiber(function () {
                    var found = Ingredients.findOne({'name': t});
                    if(found) {
                        console.log(found.name);
                        let today = new Date();
                        TempFridge.insert({
                            'name': found.name,
                            'quantity': 1,
                            'doe': today.setDate(today.getDate() + 1)
                        });
                    }
                }).run();
            }
        } else {
            var arr = text[0].split('\n');

            for(i = 0; i < arr.length; i++) {
                var itemName = arr[i];
                var quantity = '1';

                if(itemName.match(/[0-9]+/g)) {
                    // this is a kg or multiple item
                    splitted = arr[i].split(' ');

                    if(/[0-9]+/g.test(splitted[splitted.length-2])) {
                        itemName = splitted.slice(0, splitted.length-2).join();
                        quantity = splitted[splitted.length-2] + splitted[splitted.length-1];
                    } else {
                        itemName = splitted.slice(0, splitted.length-1).join();
                        quantity = splitted[splitted.length-1];
                    }
                }

                console.log("ITEM : " + itemName);
                console.log("Quantity : " + quantity);

                var found = Ingredients.findOne({'name': itemName});
                var tick = 0;

                while(!found) {
                    found = Ingredients.find({
                        'name': {$regex: itemName}
                    }, {
                        sort: {
                            'name': 1
                        }
                    });

                    if(found) {
                        found = found.fetch()[0]
                    }

                    if(tick) {
                        itemName = itemName.slice(1, itemName.length);
                        tick = 0
                    } else {
                        itemName = itemName.slice(0, itemName.length-1);
                        tick = 1
                    }
                }

                console.log("NAME : " + found.name);
            }
        }
    });
}
