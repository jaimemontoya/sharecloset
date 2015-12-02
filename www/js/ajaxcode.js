$(document).ready(function(){
  // The value will be null if the user has not logged in.
  if (localStorage.getItem("userloggedin") === null) {
    //console.log("NOT logged in.");
    // Show this button only to authenticated users.
    $(".profilebutton").hide();
  }else{
    // Show this button only to authenticated users.
        $(".profilebutton").show(); 
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
        $("#content").html("Welcome to the About!");
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
        // If at least one organization match was found.
        if(count > 0){
          var donationstable = '<table class="t01"><tr><th>Item name</th><th>Item description</th><th>Quantity</th><th>Actions</th></tr>';
        }
        for (var number = 0; number < count; number++){              
          var user_donationsid = data[number]["user_donationsid"];
          var itemname = data[number]["itemname"];
          var description = data[number]["description"];
          var quantity = data[number]["quantity"];
          donationstable += "<tr><td>"+itemname+"</td><td>"+description+"</td><td>"+quantity+"</td><td><button class='deletedonationbutton' type='submit' name='"+user_donationsid+"'>Delete</button></td></tr>";
        }
        // If at least one organization match was found.
        if(count > 0){
          donationstable += '</table>';
        }
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
        // If at least one organization match was found.
        if(count > 0){
          var orgtable = '<table class="t01"><tr><th>Organization Name</th><th></th></tr>';
        }
        for (var number = 0; number < count; number++){              
          var orgname = data[number]["org_name"];
          var orgid = data[number]["org_id"];

          if (orgtable.indexOf(orgname) == -1)
          { //meaning not already in there- will have to change this if we want to show HOW they match 
            orgtable += "<tr><td>"+orgname+"</td><td><button class='more' id = "+orgid+">More Info</button></td></tr>";
          } 
        }
        // If at least one organization match was found.
        if(count > 0){
          //something with organization ID!!!!
          orgtable += '</table>';
        }
        $("#mymatcheslist").html(orgtable);
        $(".more").button();
      }
    })
  };

  // adapted from following .deletedonationbutton function
  $("#content").on("click", ".more", function(){ //when "Tell me more" is pressed
    // The variable "user_donationsid" will capture the id of the donation that will be deleted.
//    console.log("MORE");
    var organizationid = $(this).attr('id'); 
  //  console.log(organizationid);
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
      <button id = "hide">hide</button></h3><a target= "_blank" href="' +org_site+'">Organization site</a><h4>Address: '+org_address+' Zipcode: ' +org_zip+'</h4><div id="loc">Google Maps Geocoding:<input id="text_address" type="text" size="10" value= "'+org_zip+'"></div><div id="map_canvas"></div><h4>Matches:</h4><ul>';
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
    $.ajax({
      url: "cgi-bin/crud.py",
      type: "POST",
      dataType: "json",
      data: {
        usernameValue: $("#user_name").val(),
        passwordValue: $("#user_password").val(),
        zipcodeValue: $("#user_zip").val()
      },
      success: function(data){
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
      }
    })
  }else{ // Invalid ZIP code.
      // Code from https://jqueryui.com/tooltip/#forms
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
