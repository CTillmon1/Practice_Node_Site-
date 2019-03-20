const Profile = require("./profile.js");

function home (request, response){
  if(request.url === "/"){
      response.writeHead(200, {"Text-Context": "text/plain"});
      response.write("Header\n");
      response.write("Search\n");
      response.end("Footer\n");
  }

}

function user (request, response){
  let userName = request.url.replace("/","");
  if (userName.length > 0) {
      response.writeHead(200, {"Text-Context": "text/plain"});
      response.write("Header\n");
      let studentProfile = new Profile(userName);
      studentProfile.on("end", function(profileJSON){
        let values = {
                 avatarUrl: profileJSON.gravatar_url,
                 username: profileJSON.profile_name,
                 badges:profileJSON.badges.length, 
                 javascriptPoints: profileJSON.points.Javascript
                     }
          response.write(values.username + " has " + values.badges + " badge\(s\) \n");
          response.end("Footer\n");
      });
      studentProfile.on("error", function(error){
          response.end("Footer\n");
      });
      
  }

}


module.exports.home = home; 
module.exports.user = user; 