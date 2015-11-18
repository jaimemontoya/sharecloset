$(document).ready(function(){
  // The value will be null if the user has not logged in.
  if (localStorage.getItem("userloggedin") === null) {
    //console.log("NOT logged in.");
  }else{
    //console.log("LOGGED IN successfully.");
    $("#loginbutton").html("Logout");
    $("#content").html("\
        <div id='leftCol' style='float: left; width: 30%; '>\
          <h1>My donations</h1>\
          <div id='mydonationslist'>"+updatemydonations()+"</div>\
          <button id='update' onclick='popup(mylink, windowname)'>New donation</button>\
          <div id='donateitems'></div>\
        </div>\
        <div id='rightCol' style='float: right; width: 70%; '>\
          <h1>my matches</h1>\
          <p> this is div 2</p>\
          <div id = 'item1' style='float:left; width =30%'>\
            <img src='elephant.jpe' width = '50px'>\
            <h4>Organization Name</h4>\
            <p>Here is information about this wonderful organization</p>\
            <button id='preview' onclick='popup(mylink2,windowname2)'>PREVIEW</button>\
          </div>\
          <button id = 'rematch'>REMATCH</button></div>\
        ");
  }
  $("#signupbutton").click(function(){
    $.ajax({
      success: function(){
        $("#content").html("\
          <div>Username: <input id='user_name' type='text' size='30' /></div>\
          <div>Password: <input id='user_password' type='password' size='30' /></div>\
          <div>Zipcode: <input id='user_zip' type='number' size='30' /></div>\
          <div><button id='signup'>Sign Up</button></div>\
        ");
      }
    })
  });  
  $("#loginbutton").click(function(){
    if($("#loginbutton").text() == 'Logout'){
      localStorage.removeItem("userloggedin");
      $("#loginbutton").html("Login");
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
        <div id='rightCol' style='float: right; width: 70%; '>\
          <h1>my matches</h1>\
          <p> this is div 2</p>\
          <div id = 'item1' style='float:left; width =30%'>\
            <img src='elephant.jpe' width = '50px'>\
            <h4>Organization Name</h4>\
            <p>Here is information about this wonderful organization</p>\
            <button id='preview' onclick='popup(mylink2,windowname2)'>PREVIEW</button>\
          </div>\
          <button id = 'rematch'>REMATCH</button></div>\
        ");        
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
        <div>\
          <span>Type:</span>\
          <select id='selecttype'>\
            <option value='0'>[Select type]</option>\
            "+selectoptiontype+"\
          </select>\
        </div>\
        <div>\
          <span>Item:</span>\
          <span id='spanselectsubtype'></span>\
        </div>\
        <div>\
          <span>Description:</span>\
          <input id='descriptioninput' type='text' size='40' />\
        </div>\
        <div>\
          <span>Quantity:</span>\
          <input id='quantityinput' type='text' size='10' />\
        </div>\
        <div><button id='donateitembutton'>Donate item</button></div>\
        ");            
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
        var donationstable = '<table><tr><th>Item name</th><th>Item description</th><th>Quantity</th><th>Actions</th></tr>';
        for (var number = 0; number < count; number++){              
          var user_donationsid = data[number]["user_donationsid"];
          var itemname = data[number]["itemname"];
          var description = data[number]["description"];
          var quantity = data[number]["quantity"];
          donationstable += "<tr><td>"+itemname+"</td><td>"+description+"</td><td>"+quantity+"</td><td><button class='deletedonationbutton' type='submit' name='"+user_donationsid+"'>Delete</button></td></tr>";
        }
        donationstable += '</table>';
        $("#mydonationslist").html(donationstable);
      }
    })
  };
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
      }
    });
    $.ajax({
      success: function(){
        //console.log("This is a message from AJAX.");            
        $("#mydonationslist").html("<ul><li>Item 1</li><li>Item 2</li></ul>");
      }
    });
  });
  $("#content").on("click", "#signup", function(){
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
        $("#content").html("Signed Up");
      }
    })
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
