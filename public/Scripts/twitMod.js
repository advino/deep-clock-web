//Setting up Twitter module, importing twit package and Twitter API keys
let twitMod = {
  Twit: require('twit'),
  config: require('./config'),
};

//Creating Twit Object
twitMod.T = new twitMod.Twit(twitMod.config);

//Query parameters
twitMod.params = {
  track: '#deepclock',
  language: 'en',
  include_entities: true,
}

//Exporting Twitter module
module.exports = twitMod;
