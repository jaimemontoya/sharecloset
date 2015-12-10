$(document).ready(function(){
  // The value will be null if the user has not logged in.
  if (localStorage.getItem("userloggedin") === null) {
    //console.log("NOT logged in.");
    // Show this button only to authenticated users.
    $(".profilebutton").hide();
    $("#deleteAccButton").hide();
  }else{
    // Show this button only to authenticated users.
        $(".profilebutton").show(); 
         $("#deleteAccButton").show();
    //console.log("LOGGED IN successfully.");
    $("#loginbutton").html("Logout");
    $("#content").html("\
        <div id='leftCol' style='float: left; width: 30%; '>\
          <h1>My donations</h1>\
          <div id='mydonationslist'>"+updatemydonations()+"</div>\
          <button id='update' onclick='popup(mylink, windowname)'>New donation</button>\
          <div id='donateitems'></div>\
        </div>\
        <div id='rightCol' style='float: left; width: 30%; '>\
          <h1>My matches</h1>\
          <div id = 'mymatcheslist' style='float:left; width =30%'>"+updatematches()+"</div></div>\
          <div id='farRight' style='float:left; width: 40%; '><p>new div</p></div>\
        ");
      $("#farRight").hide();  
  }
  $("#signupbutton").click(function(){
    $.ajax({
      success: function(){
        $("#content").html("\
          <p id='message'>User already exits</p>\
          <div id='name_div'>Username: <input id='user_name' type='text' size='30' /></div>\
          <div>Password: <input id='user_password' type='password' size='30' /></div>\
            <div id='address_div'>Address: <input id='user_address' type='text' size='100' /></div>\
          <div id='zip_div'>Zipcode: <input id='user_zip' type='number' size='30' title='Invalid ZIP code.' /></div>\
          <div><button id='signup'>Sign Up</button></div>\
        ");
        $("#signup").button();
        $("#message").hide();

      }
    })
  });  
  $("#loginbutton").click(function(){
    if($("#loginbutton").text() == 'Logout'){
      localStorage.removeItem("userloggedin");
      $("#loginbutton").html("Login");
      // Show this button only to authenticated users.
     $(".profilebutton").hide();
     $("#deleteAccButton").hide();
    }
    $.ajax({
      success: function(){
        $("#content").html("\
          <div>\
            <div>Username: <input id='usernameBox' type='text' size='20' /></div>\
            <div>Password: <input id='passwordBox' type='password' size='20' /></div>\
            <div><button id='loginButtonOnForm'>Login</button></div>\
          </div>\
        ");
        $("#loginButtonOnForm").button();
      }
    })
  });
  $("#deleteAccButton").click(function(){
    console.log("You tried to delete!");
    $.ajax({
      success: function(){
        $("#content").html("\
          <div>\
            <div>Sorry to see you go! By clicking yes, all your data will be delete from Sharitable. Are you sure you want to delete your account?</div>\
            <div><button id='confirmDelete'>Yes</button></div>\
          </div>\
        ");
        $("#loginButtonOnForm").button();
      }
    })
  });  
  $(".homebutton").click(function(){
    $.ajax({      
      success: function(){
        $("#content").html("Welcome to the Home page!");
      }
    })
  });
  $(".aboutbutton").click(function(){
    $.ajax({      
      success: function(){
        $("#content").html("\
         <div>\
            <p><b>What is it?</b></p>\
            <p>Sharitable is a web application through which individuals can connect with organizations like the Goodwill, homeless shelters, Boys and Girls Club, and more in order to donate certain items they have, or schedule pick-ups online. The objective is this web application is to create a centralized place where organizations and donors can connect.</p>\
            <p><b>Who is our target?</b></p>\
            <li>Local community service organizations: the place that needs the donation</li>\
            <li>Individual donors: the people giving the donation</li>\
            <p><b>What problem are we trying to solve?</b></p>\
            <p>Individuals don't always know which organizations have a use for or are accepting the items they wish to donate. Smaller or newer organizations don't always have a large platform to disclose their needs. For larger organizations, it helps reduce getting donations that cannot be put to use. All organizations, large and small, can be found in one convenient application.</p>\
          </div>\
        ");
      }
    })
  });
  $(".contactbutton").click(function(){
    $.ajax({
      success: function(){
        $("#content").html("Welcome to the Contact page!");
      }
    });
  });
  // References used to fix issue when jQuery events were not responding for AJAX-generated HTML: 
  // http://stackoverflow.com/questions/17206805/jquery-does-not-work-on-ajax-generated-html
  // http://stackoverflow.com/questions/9344306/jquery-click-doesnt-work-on-ajax-generated-content
  $("#content").on("click", "#confirmDelete", function(){
    console.log("You confirmed delete!");
     // var user_id = localStorage['userloggedin'];
    $.ajax({
      url: "cgi-bin/deleteAccount.py",
      type: "POST",
      dataType: "json",
      // Data that will be sent as an input to the deletedonation.py script.
      data: {
        user_idValue: localStorage['userloggedin']
      },
      success: function(data){
        console.log("Clicked the delete button.");
        $(".profilebutton").hide();
        $("#deleteAccButton").hide(); 

        $("#content").html("\
          <div>\
            <div>Username: <input id='usernameBox' type='text' size='20' /></div>\
            <div>Password: <input id='passwordBox' type='password' size='20' /></div>\
            <div><button id='loginButtonOnForm'>Login</button></div>\
          </div>\
        ");
      },
      error: function(){
        $("#content").html("CAN'T DELETE!");
      }
    })
  });


  $(".profilebutton").click(function(){
      console.log("profile fcn called" + localStorage['userloggedin']);   
        if (localStorage['userloggedin'] == null){
          console.log("inside if");
      $("#content").html("<p>Sign up, Login, or get out. K thanks.</p>");  
        } else {
          console.log("in else");
        $("#loginbutton").html("Logout");
        $("#content").html("Welcome "+ localStorage.getItem("userloggedin")+"!"+"\
        <div id='leftCol' style='float: left; width: 30%; '>\
          <h1>My donations</h1>\
          <div id='mydonationslist'>"+updatemydonations()+"</div>\
          <button id='update' onclick='popup(mylink, windowname)'>New donation</button>\
          <div id='donateitems'></div>\
        </div>\
        <div id='rightCol' style='float: left; width: 30%; '>\
          <h1>My matches</h1>\
          <div id = 'mymatcheslist' style='float:left; width =30%'>"+updatematches()+"</div></div>\
          <div id='farRight' style='float:left; width: 40%; '><p>new div</p></div>\
        "); 
        $("#farRight").hide();  
        }     
    });
 $("#content").on("click", "#loginButtonOnForm", function(){
    $.ajax({
      url: "cgi-bin/log.py",
      // Data that will be sent as an input to the log.py script.
      data: {
        usernameValue: $("#usernameBox").val(),
        passwordValue: $("#passwordBox").val(),
        // zipcodeValue: 999999 //just to make it work, never used
      },
      type: "GET",
      dataType: "json",
      success: function(data){
        // Show this button only to authenticated users.
        $(".profilebutton").show();
        $("#deleteAccButton").show(); 
        localStorage['userloggedin'] = data.myUsername;
        // $("#content").html("Logged in"+data.myUsername + "password" + data.myPassword);
        $("#loginbutton").html("Logout");
        $("#content").html("Welcome "+ data.myUsername+"!"+"\
        <div id='leftCol' style='float: left; width: 30%; '>\
          <h1>My donations</h1>\
          <div id='mydonationslist'>"+updatemydonations()+"</div>\
          <button id='update' onclick='popup(mylink, windowname)'>New donation</button>\
          <div id='donateitems'></div>\
        </div>\
        <div id='rightCol' style='float: left; width: 30%; '>\
          <h1>My matches</h1>\
          <div id = 'mymatcheslist' style='float:left; width =30%'>"+updatematches()+"</div></div>\
        <div id='farRight' style='float:left; width: 40%; '><p>new div</p></div>\
        ");
        $("#farRight").hide();  
        $("#update").button();    
      }, 
      error: function(){
        $("#content").html("Not Found!");
      }
    })
  });


  $("#content").on("click", "#update", function(){
    $.ajax({
      url: "cgi-bin/gettypes.py",
      type: "GET",
      dataType: "json",
      success: function(data){
        $("#donateitems").show();
        var count = Object.keys(data).length;
        var selectoptiontype = '';
        for (var number = 0; number < count; number++){
          //selectoptiontype += "<option value="+number+">"+data[1]+"</option>";
        }
        $.each(data, function(key, value){
          //console.log("Key: "+key+" Value:"+value);
          selectoptiontype += "<option value="+key+">"+value+"</option>";
        });
        $("#donateitems").html("\
        <div id='donateitemdiv'>\
        <div>\
          <label>Type:</label>\
          <select id='selecttype'>\
            <option value='0'>[Select type]</option>\
            "+selectoptiontype+"\
          </select>\
        </div>\
        <div>\
          <label>Item:</label>\
          <span id='spanselectsubtype'></span>\
        </div>\
        <div>\
          <label>Description:</label>\
          <input id='descriptioninput' type='text' size='20' />\
        </div>\
        <div>\
          <label>Quantity:</label>\
          <input id='quantityinput' type='text' size='10' />\
        </div>\
        <div><button id='donateitembutton'>Donate item</button></div>\
        </div>\
        ");            
        $("#donateitembutton").button();
      }
    })     
  });
  $("#content").on("change", "#selecttype", function(){
    $.ajax({
      url: "cgi-bin/getsubtypes.py",
      // Data that will be sent as an input to the log.py script.
      data: {
        selecttypeValue: $("#selecttype").val()
        // zipcodeValue: 999999 //just to make it work, never used
      },
      type: "GET",
      dataType: "json",
      success: function(data){
        var selectoptionsubtype = '';
        for (var number = 0; number < 3; number++){
          //selectoptionsubtype += "<option value=0"+number+">0"+$("#selecttype").val()+"</option>";
        }
        $.each(data, function(key, value){
          selectoptionsubtype += "<option value="+key+">"+value+"</option>";
        });
        $("#spanselectsubtype").html("\
        <select id='selectsubtype'>\
          <option value='0'>[Select type]</option>\
          "+selectoptionsubtype+"\
        </select>\
        ");
      }
    })
  });
  function updatemydonations(){
    $.ajax({
      url: "cgi-bin/listmydonations.py",
      // Data that will be sent as an input to the log.py script.
      data: {
        // Get it from the session (cookies or localStorage).        
        //usernameValue: 'jaimemontoya',
        usernameValue: localStorage.getItem("userloggedin")
      },
      type: "GET",
      dataType: "json",
      success: function(data){
        var count = Object.keys(data).length;
        console.log(count);
        var donationstable = '<table class="t01"><tr><th>Item name</th><th>Item description</th><th>Quantity</th><th>Actions</th></tr>';
        for (var number = 0; number < count; number++){              
          var user_donationsid = data[number]["user_donationsid"];
          var itemname = data[number]["itemname"];
          var description = data[number]["description"];
          var quantity = data[number]["quantity"];
          donationstable += "<tr><td>"+itemname+"</td><td>"+description+"</td><td>"+quantity+"</td><td><button class='deletedonationbutton' type='submit' name='"+user_donationsid+"'>Delete</button></td></tr>";
        }
        donationstable += '</table>';
        $("#mydonationslist").html(donationstable);
        $("#donateitembutton").button();
        $("#update").button();
        $(".deletedonationbutton").button();
      }
    })
  };

  function updatematches(){ //modeled after previous function
    $.ajax({
      url: "cgi-bin/match.py",
      // Data that will be sent as an input to the log.py script.
      data: {
        // Get it from the session (cookies or localStorage).        
        //usernameValue: 'jaimemontoya',
        usernameValue: localStorage.getItem("userloggedin")
      },
      type: "GET",
      dataType: "json",
      success: function(data){
        $("#farRight").hide();//because might be irrelevant or outdated now
        console.log("in suceess of update matches");
        //START HERE! "org_name"
        var count = Object.keys(data).length;
        var orgtable = '<table class="t01"><tr><th>Organization Name</th><th></th></tr>';
        console.log("FIRST " + orgtable);
        var useraddress = data[0];
        var userzip = data[1];
        var addressArray = new Array();
        var nameArray = new Array();
        var idArray = new Array();
        var destination = useraddress + " " + userzip;
        for (var number = 2; number < count; number++){              
          var orgname = data[number]["org_name"];
          var orgid = data[number]["org_id"];
          var orgaddress = data[number]["org_address"];
          var orgzip = data[number]["org_zip"];
          console.log("ORGNAME: " + orgname);

          
          addressArray[number - 2] = orgaddress + " " +orgzip;
          
          nameArray[number -2 ] = orgname;

          idArray[number - 2] = orgid;
        } //end of for loop
          //NOW do distance matrix stuff 

     //          var source = "59 Evelyn Ave, West Seneca, NY 14224";
     //  var source2 = "117 Susan Lane, Cheektowaga, NY 14225";

        
//    var name2 = orgname;
  //  console.log(orgaddress + " " + orgzip);
   // console.log(useraddress + " " + userzip);
 /*   var request = {
        origin: source,
        destination: destination    
    }; */

//so if address[i] is valid, then get orgname[i]
//then do if statement after getting all data 
//could put this in a function and make it return results! 
//http://stackoverflow.com/questions/7421442/how-to-calculate-distance-between-two-cities-using-google-maps-api-v3
//function stuff(){
    var service = new google.maps.DistanceMatrixService();
    var distanceArray = new Array();
    service.getDistanceMatrix({
      //  origins: [source, source2],
        origins: addressArray,
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL,
      //  unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
    }, function (response, status) {
      console.log("response");
        if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {
        //https://developers.google.com/maps/documentation/javascript/distancematrix
        console.log("first if");
        var origins = response.originAddresses;
        for (var i = 0; i < origins.length; i++){
          console.log("for..");
          var temp_dist = response.rows[i].elements[0].distance.value;
          var dist_text = response.rows[i].elements[0].distance.text;
          console.log("temp_dist: " + temp_dist);
          if (temp_dist < 33000 && orgtable.indexOf(nameArray[i]) == -1){ //< 33 km and not already listed
            console.log("inside inside if");
            console.log(nameArray[i] + " " + idArray[i]);
              orgtable += "<tr><td>"+nameArray[i]+"</td><td><button class='more' id = "+idArray[i]+" dist = '"+dist_text+"'>More Info</button></td></tr>";
              console.log("UPDATED " + orgtable);
          }
        }

          orgtable += '</table>';
         console.log("SEE");
         console.log("FINAL: " + orgtable);
         $("#mymatcheslist").html(orgtable);
        $(".more").button();


        /*    var distance = response.rows[0].elements[0].distance.text;
            var dist2 = response.rows[0].elements[0].distance.value; //in meters!
            var duration = response.rows[0].elements[0].duration.text;
            var dvDistance = document.getElementById("dvDistance"); //what is this?
            console.log("THIS:");
            console.log(response.rows[0].elements[0].distance.value);
            console.log(response.rows[1].elements[0].distance.value)
           */
     /*       console.log("distance to " + orgname+ ": " + distance + " val: " + dist2);
            if(dist2 < 33000){
              console.log("IF");
              really();
          //    orgtable += "<tr><td>"+orgname+"</td><td><button class='more' id = "+orgid+">More Info</button></td></tr>";
            } //within 33 km aka 20 miles
 */
        } else {
            alert("Unable to find the distance via road.");
        }
        return orgtable;
    });
       //   }

         // stuff();
         // console.log(A);
          //for some reason can't reach this code! 
     //     orgtable += '</table>';
   //       console.log("SEE");
    //      console.log("FINAL: " + orgtable);
  



     //       $("#mymatcheslist").html(orgtable);
       //     $(".more").button();
          } //success 
     //   }
    //  }
    })
};


       //   if (orgtable.indexOf(orgname) == -1)
      //    { //meaning not already in there- will have to change this if we want to show HOW they match 

/*
            function matchLocation() {

          //http://stackoverflow.com/questions/7421442/how-to-calculate-distance-between-two-cities-using-google-maps-api-v3
          var origin = useraddress+ " " + userzip,
          destination = orgaddress + " " + orgzip,
          service = new google.maps.DistanceMatrixService();

          service.getDistanceMatrix(
        {
          origins: [origin],
          destinations: [destination],
          travelMode: google.maps.TravelMode.DRIVING,
          avoidHighways: false,
          avoidTolls: false
        }, 
      callback
      );

    function callback(response, status) {
      //  var orig = document.getElementById("orig"),
        //    dest = document.getElementById("dest"),
        //    dist = document.getElementById("dist");

        if(status=="OK") {
          var distance = response.rows[0].elements[0].distance.text;
          console.log("Distance " + distance);
          return distance;
        //    orig.value = response.destinationAddresses[0];
          //  dest.value = response.originAddresses[0];
           // dist.value = response.rows[0].elements[0].distance.text;
        } else {
            alert("Error: " + status);
        }
        
     }            
         var found_distance = matchLocation();
        */
        //  if (found_distance <= 33){  //33 KM!

       //Code from http://www.aspsnippets.com/Articles/Google-Maps-V3-API-Calculate-distance-between-two-addresses-points-locations.aspx
       //api documentation https://developers.google.com/maps/documentation/distance-matrix/intro?hl=en
/*    var source = orgaddress + " " + orgzip;
    var destination = useraddress + " " + userzip;
    var name2 = orgname;
    console.log(orgaddress + " " + orgzip);
    console.log(useraddress + " " + userzip);
    var request = {
        origin: source,
        destination: destination    
    };
    //*********DISTANCE AND DURATION**********************
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
        origins: [source],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
    }, function (response, status) {
        if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {
            var distance = response.rows[0].elements[0].distance.text;
            var dist2 = response.rows[0].elements[0].distance.value; //in meters!
            var duration = response.rows[0].elements[0].duration.text;
            var dvDistance = document.getElementById("dvDistance"); //what is this?
           
            console.log("distance to " + orgname+ ": " + distance + " val: " + dist2);
            if(dist2 < 33000){
              console.log("IF");
              really();
              orgtable += "<tr><td>"+orgname+"</td><td><button class='more' id = "+orgid+">More Info</button></td></tr>";
            } //within 33 km aka 20 miles
 
        } else {
            alert("Unable to find the distance via road.");
        }
    }); */
//end of distance matrix stuff 
    //      function really(){
      //          console.log("really" + orgname);
       //   }


            //    orgtable += "<tr><td>"+orgname+"</td><td><button class='more' id = "+orgid+">More Info</button></td></tr>";
         //     }
                //console.log("should be " + orgid)
         //   } */
            //something with organization ID!!!!
   //       }
   //     }
        //end of for loop. 


      

 // adapted from following .deletedonationbutton function
  $("#content").on("click", ".more", function(){ //when "Tell me more" is pressed
    // The variable "user_donationsid" will capture the id of the donation that will be deleted.
//    console.log("MORE");
    var organizationid = $(this).attr('id'); 
    var distance = $(this).attr('dist');
    console.log(organizationid);

    $.ajax({
      url: "cgi-bin/more.py",
      type: "GET",
      dataType: "json",
      data: {
        usernameValue: localStorage['userloggedin'],
        organizationidValue: organizationid
      },
      success: function(data){
        console.log("in sucess of more");
        console.log(data);
      //  console.log(data[0]["a"]);
      //  console.log(data[1]["a"]);
      var count = Object.keys(data).length;
      //org info in data[0]. matches start in data[1]
      //"org_name": r[0], "org_photo": r[1], "org_site":r[2], "org_address": r[3], "org_zip": r[4]}
      var org_name = data[0]["org_name"];
      var org_photo = data[0]["org_photo"]; //amvets.jpg or something
      var org_site = data[0]["org_site"];
      var org_address = data[0]["org_address"];
      var org_zip = data[0]["org_zip"];
      console.log(org_address + " " + org_zip);
      //http://stackoverflow.com/questions/15551779/open-link-in-new-tab
      //http://www.sitepoint.com/web-foundations/href-html-attribute/
      var temp = '<h1>Organization</h1><img src = "photos/'+org_photo+'" height = "50" width = "50"><h3>Information about '+org_name+'\
      <button id = "hide">hide</button></h3><a target= "_blank" href="' +org_site+'">Organization site</a><h4>Address: '+org_address+' ' +org_zip+'\
      </h4><h5>Distance: '+distance+'</h5><div id="loc">Google Maps Geocoding:<input id="text_address" type="text" size="10" value= "'+org_address+' '+org_zip+'"></div><div id="map_canvas"></div><h4>Matches:</h4><ul>';
        for (var number = 1; number < count; number++){  
          var itemname = data[number]["itemname"];
         if (temp.indexOf(itemname) == -1)
          { //meaning not already in there
            temp+="<li>"+itemname+"</li>";
          }
        }
        temp+='</ul>';  
     //   console.log(temp);
        $("#farRight").html(temp);
        $("#farRight").show(); 
        $("#hide").button();
        // Code for The Google Maps Geocoding API, from http://jsfiddle.net/4QGKq/1/
      var map;
      var geocoder;
      var markers = new Array();
      var firstLoc;
      var marker;

      function myGeocodeFirst() {
        geocoder = new google.maps.Geocoder();
        geocoder.geocode( {'address': document.getElementById("text_address").value },
          function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              firstLoc = results[0].geometry.location;
              map = new google.maps.Map(document.getElementById("map_canvas"),
              {
                center: firstLoc,
                zoom: 12,
                mapTypeId: google.maps.MapTypeId.ROADMAP
              });
                //Code to adding a marker to map from https://developers.google.com/maps/documentation/javascript/markers
                marker = new google.maps.Marker({
                position: firstLoc,
                map: map,
                title: org_name
             });          
            } 
            else {
              document.getElementById("text_status").value = status;
            }
          }
        );
      }
      myGeocodeFirst();
      

      }, error: function(){
        console.log("error of more");
      }
    })
  });

  $("#content").on("click", "#hide", function(){
    //to hide the additional info provided by "tell me more"
    $("#farRight").hide();
  });


  // Solution to delete entry found at http://stackoverflow.com/questions/31644525/delete-entry-from-database-using-ajax-and-jquery.
  $("#content").on("click", ".deletedonationbutton", function(){
    // The variable "user_donationsid" will capture the id of the donation that will be deleted.
    var user_donationsid = $(this).attr('name');
    $.ajax({
      url: "cgi-bin/deletedonation.py",
      type: "POST",
      dataType: "json",
      // Data that will be sent as an input to the deletedonation.py script.
      data: {
        user_donationsidValue: user_donationsid
      },
      success: function(data){
        console.log("Clicked the delete button. The name is: "+data);
        updatemydonations();
        updatematches();
      }
    })
  });

  $("#content").on("click", "#donateitembutton", function(){
    $.ajax({
      url: "cgi-bin/donate.py",
      type: "POST",
      dataType: "json",
      data: {
        usernameValue: localStorage.getItem("userloggedin"),
        itemidValue: $("#selectsubtype").val(),
        descriptionValue: $("#descriptioninput").val(),
        quantityValue: $("#quantityinput").val()
      },
      success: function(data){
        updatemydonations();
        updatematches();
         $("#donateitems").hide();
      }
    });
   /* $.ajax({
      success: function(){
        //console.log("This is a message from AJAX.");            
        $("#mydonationslist").html("<ul><li>Item 1</li><li>Item 2</li></ul>");
      }
    }); */
  });

  // Code from http://www.devcurry.com/2010/07/validate-us-zip-code-using-javascript.html
  function IsValidZipCode(zip) {
    var isValid = /^[0-9]{5}(?:-[0-9]{4})?$/.test(zip);
    if (isValid)
      //Valid ZipCode
      return 0;
    else {
      //Invalid ZipCode
      return -1;
    }
  }

  $("#content").on("click", "#signup", function(){
    //valid zipcode:
    console.log("SIGNUP clicked");
    $("#message").hide();
    if(IsValidZipCode($("#user_zip").val()) == 0){
      console.log("valid zip");
    $.ajax({
      url: "cgi-bin/crud.py",
      type: "POST",
      dataType: "json",
      data: {
        usernameValue: $("#user_name").val(),
        passwordValue: $("#user_password").val(),
        zipcodeValue: $("#user_zip").val(),
        addressValue: $("#user_address").val()
      },
      success: function(data){
        console.log("in success");
        if (data=="already there"){
          console.log("IF");
           $("#message").show();
    //      $("#content").html("User already exists");
       /*     var tooltips = $( "[title]" ).tooltip({
             position: {
              my: "left top",
              at: "right+5 top-5"
            }
          });
            $('*[title]').tooltip('enable');
         $('#zip_div *[title]').tooltip('disable');
           tooltips.tooltip("open");  */
        } else{
          $("#content").html("Signed Up");
        }
      },
      error: function(){
        console.log("ajax error!");
      }
    })
  }else{ // Invalid ZIP code.
      // Code from https://jqueryui.com/tooltip/#forms
      console.log("invalid zip");
      var tooltips = $( "[title]" ).tooltip({
      position: {
        my: "left top",
        at: "right+5 top-5"
      }
    });
  //    $('*[title]').tooltip('enable');
   // $('#name_div *[title]').tooltip('disable');
    tooltips.tooltip( "open" );
  }
  });
  var mylink = "addItems.html";
  var windowname = "Bob";
  var mylink2 = "preview.html";
  var windowname2 = "Preview";

  function popup(mylink, windowname) { 
    if (! window.focus)return true; 
      var href;
    if (typeof(mylink) == 'string') 
      href=mylink;
    else 
      href=mylink.href; 
      window.open(href, windowname, 'width=400,height=200,scrollbars=yes'); 
      return false; 
  }
});
