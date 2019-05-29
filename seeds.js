const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");
const data = [{
    name: "Cloud's Rest",
    image: "https://farm3.staticflickr.com/2512/5733464781_8787e851b0.jpg",
    description: "Brisket ground round leberkas pork pig tongue porchetta tri-tip filet mignon. Salami hamburger cow jerky picanha, ground round chuck buffalo. Shank flank venison, buffalo bacon bresaola pork chop burgdoggen tongue. Jerky brisket pork chop, chuck boudin turducken fatback kielbasa pastrami prosciutto pork loin landjaeger tail meatball andouille. Tail andouille tongue capicola corned beef filet mignon drumstick kevin ham meatball sausage pork belly bresaola meatloaf. Ball tip flank ham hock bacon shoulder meatloaf brisket capicola picanha swine drumstick kielbasa filet mignon porchetta prosciutto. Buffalo porchetta shankle ground round frankfurter. Brisket ground round ham hock bresaola. Spare ribs bresaola ham leberkas alcatra cow chuck rump tongue drumstick. Ribeye tail flank, ham hock pig drumstick turducken spare ribs pork chop."
  },
  {
    name: "Desert Mesa",
    image: "https://farm6.staticflickr.com/5204/5315979822_3591b6509f.jpg",
    description: "Brisket ground round leberkas pork pig tongue porchetta tri-tip filet mignon. Salami hamburger cow jerky picanha, ground round chuck buffalo. Shank flank venison, buffalo bacon bresaola pork chop burgdoggen tongue. Jerky brisket pork chop, chuck boudin turducken fatback kielbasa pastrami prosciutto pork loin landjaeger tail meatball andouille. Tail andouille tongue capicola corned beef filet mignon drumstick kevin ham meatball sausage pork belly bresaola meatloaf. Ball tip flank ham hock bacon shoulder meatloaf brisket capicola picanha swine drumstick kielbasa filet mignon porchetta prosciutto. Buffalo porchetta shankle ground round frankfurter. Brisket ground round ham hock bresaola. Spare ribs bresaola ham leberkas alcatra cow chuck rump tongue drumstick. Ribeye tail flank, ham hock pig drumstick turducken spare ribs pork chop."
  },
  {
    name: "Canyon Floor",
    image: "https://farm3.staticflickr.com/2885/10628400193_5154fae5e5.jpg",
    description: "Brisket ground round leberkas pork pig tongue porchetta tri-tip filet mignon. Salami hamburger cow jerky picanha, ground round chuck buffalo. Shank flank venison, buffalo bacon bresaola pork chop burgdoggen tongue. Jerky brisket pork chop, chuck boudin turducken fatback kielbasa pastrami prosciutto pork loin landjaeger tail meatball andouille. Tail andouille tongue capicola corned beef filet mignon drumstick kevin ham meatball sausage pork belly bresaola meatloaf. Ball tip flank ham hock bacon shoulder meatloaf brisket capicola picanha swine drumstick kielbasa filet mignon porchetta prosciutto. Buffalo porchetta shankle ground round frankfurter. Brisket ground round ham hock bresaola. Spare ribs bresaola ham leberkas alcatra cow chuck rump tongue drumstick. Ribeye tail flank, ham hock pig drumstick turducken spare ribs pork chop."
  }
];

function seedDB() {
  // Remove all campgrounds
  Campground.remove({}, function(err) {
    if (err) {
      console.log(err);
    }
    console.log("removed campgrounds!");
    // Add a few campgrounds
    data.forEach(function(seed) {
      Campground.create(seed, function(err, campground) {
        if (err) {
          console.log(err);
        } else {
          console.log("added a campground");
          //create a comment
          Comment.create({
            text: "This place is great, but I wish there was internet",
            author: "Homer"
          }, function(err, comment) {
            if (err) {
              console.log(err);
            } else {
              campground.comments.push(comment);
              campground.save();
              console.log("Created new comment");
            }
          });
        }
      });
    });
  });
}

module.exports = seedDB;
