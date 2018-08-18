var signedin;
$(document).ready(function() {
  $('.modal').modal();
});

$(document).ready(function() {
  if (localStorage.getItem("voter") === null || localStorage.getItem("pass") === null || localStorage.getItem("voter") === "" || localStorage.getItem("pass") === "") {
    signedin = false;
  } else {
    signedin = true;
  }

});

$('#searchbtn').click(function() {
  var searchname = $('#search_name').val();
  if (searchname === null || searchname === "") {
    M.toast({
      html: 'Enter a name!'
    })
  } else {
    steem.api.getFollowing(searchname, 0, null, 1000, function(err, result) {
      $('.collection').empty();
      for (var i = 0; i < result.length; i++) {
        $('.collection').append("<li class='collection-item'> <div><a href='https://steemit.com/@" + result[i].following + "'>" + result[i].following + "</a><a href='#!' class='secondary-content' onClick='unfollow(\"" + result[i].following + "\")'><i class='material-icons'>clear</i></a></div> </li>");
      }
    });
  }
});


function unfollow(name) {
  //Your JavaScript Code Here...
  if (localStorage.getItem("voter") === null || localStorage.getItem("pass") === null || localStorage.getItem("voter") === "" || localStorage.getItem("pass") === "") {
    $('.modal').modal('open');
  } else {
    var follower = localStorage.getItem("voter"); // Your username
    var following = name; // User to follow
    var json = JSON.stringify(
      ['follow', {
        follower: follower,
        following: following,
        what: []
      }]
    );
    var postingWif = steem.auth.toWif(localStorage.getItem("voter"), localStorage.getItem("pass"), 'posting');

    steem.broadcast.customJson(
      postingWif, [], // Required_auths
      [follower], // Required Posting Auths
      'follow', // Id
      json, //
      function(err, result) {
        console.log(err, result);
        if (err) {
          M.toast({
            html: 'Error! Make sure you entered right username and passowrd and retry again.'
          })
        }
        if (!err) {
          M.toast({
            html: 'Unfollowed!- ' + name
          })
        }
      }
    );
  }

}

function sign_show() {
  $('.modal').modal('open');
}

function sign_in() {
  localStorage.setItem("voter", $('#user_name').val());
  localStorage.setItem("pass", $('#password').val());
}
