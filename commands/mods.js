const Discord = require("discord.js");
const Items = require('warframe-items')
const dropRate = require('./dropRate/modLocations');


//return an array of objects according to key, value, or key and value matching
function getObjects(obj, key, val) {
  var objects = [];
  for (var i in obj) {
      if (!obj.hasOwnProperty(i)) continue;
      if (typeof obj[i] == 'object') {
          objects = objects.concat(getObjects(obj[i], key, val));    
      } else 
      //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
      if (i == key && (obj[i]) == val || i == key && val == '') { //
          objects.push(obj);
      } else if (obj[i].toString().toLowerCase() == val && key == ''){
          //only add if the object is not already in the array
         
          if (objects.lastIndexOf(obj) == -1){
              objects.push(obj);
          }
      }else if (obj[i].toString().toLowerCase().includes(val)){
        //only add if the object is not already in the array
       
        if (objects.lastIndexOf(obj) == -1){
            objects.push(obj);
        }
    }
  }
  return objects;
}

//return an array of values that match on a certain key
function getValues(obj, key) {
  var objects = [];
  for (var i in obj) {
      if (!obj.hasOwnProperty(i)) continue;
      if (typeof obj[i] == 'object') {
          objects = objects.concat(getValues(obj[i], key));
      } else if (i == key) {
          objects.push(obj[i]);
      }
  }
  return objects;
}

//return an array of keys that match on a certain value
function getKeys(obj, val) {
  var objects = [];
  for (var i in obj) {
      if (!obj.hasOwnProperty(i)) continue;
      if (typeof obj[i] == 'object') {
          objects = objects.concat(getKeys(obj[i], val));
      } else if (obj[i] == val) {
          objects.push(i);
      }
  }
  return objects;
}

function cleanArray(actual) {
  var newArray = new Array();
  for (var i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
}

//console.log(getObjects(dropRate,'',"Orokin Cell"));

module.exports.run = async (bot, message, args) => {

    //let options =  { category: [ 'Misc' ] } ;
   // const items = new Items();
    
  //  console.log(items);
    //if(args )
  //  console.log(dropRate.miscItems);
  
   
   let Item = cleanArray(args).join(" ").toLowerCase()
   let filteredItem = getObjects(dropRate,'',Item);
   //console.log(filteredItem);
   if(Item.length<2){
    const embed = new Discord.RichEmbed()
     .setColor("#ff9900")
     .setTitle("Drop Rate of item")
     .addField("Result","Please enter more than two characters")
     message.channel.send(embed);
   }else if(!Array.isArray(filteredItem) || !filteredItem.length){
    //console.log("Nothing found");
    const embed = new Discord.RichEmbed()
     .setColor("#ff9900")
     .setTitle("Drop Rate of item")
     .addField("Result","Nothing Found")
     message.channel.send(embed);
   } else{
     console.log(filteredItem);
    filteredItem.forEach(function(obj) {
     for(Key in  obj){
        if(Key)
        //console.log(filteredItem[Key]); 
        console.log( obj[Key]);
        var jsonstring = JSON.stringify( obj[Key]);
        var jsonPretty = JSON.stringify(JSON.parse(jsonstring ),null,2);  
        console.log( jsonPretty.length);
        // message.channel.send(jsonPretty);
        if(jsonPretty.length > 2000){
         checklength(jsonPretty.length);
        }else{
           message.channel.send(jsonPretty);
        }
        function checklength(length)
        {
          let innerLength = length;
       
          if(length>2000){
            
            message.channel.send(jsonPretty.substring(0,1999));
    
            innerLength -= 1999;
            if(innerLength > 0){
              message.channel.send(jsonPretty.substring(innerLength,innerLength+1999));
              checklength(innerLength);
            }
          }
        }
      
      }
    });
    

   }


   //console.log(Item);
  
  
/*
   const embed = new Discord.RichEmbed()
   .setColor("#ff9900")
   

   message.channel.send(embed);
   */
}

 
module.exports.help = {
  name: "mods"
}