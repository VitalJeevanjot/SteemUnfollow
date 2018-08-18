$('document').ready(function() {

});

$('#searchbtn').click(function() {
  var searchname = $('#search_name').val();
  if (searchname === null || searchname === "") {
    M.toast({
      html: 'Enter a name!'
    })
  } else {
    steem.api.getFollowing(searchname, 0, null, 1000, function(err, result) {
      for (var i = 0; i < result.length; i++) {
        $('.collection').append("<li class='collection-item'> <div><a href='https://steemit.com/@" + result[i].following + "'>" + result[i].following + "</a><a href='#!' class='secondary-content' onClick='unfollow(\""+ result[i].following+ "\")'><i class='material-icons'>clear</i></a></div> </li>");
      }
    });
  }
});

function unfollow(name)
{
  //Your JavaScript Code Here...
  
  var follower = "genievot"; // Your username
  var following = 'steemjs'; // User to follow
  var json = JSON.stringify(
    ['follow', {
      follower: follower,
      following: following,
      what: []
    }]
  );
  var postingWif = "5JMSgaec4GEUpMVebrE9EtNRsgPQ8Yqi3XeVEMvjGUGUeQNKRgh"

    steem.broadcast.customJson(
    postingWif,
    [], // Required_auths
    [follower], // Required Posting Auths
    'follow', // Id
    json, //
    function(err, result) {
      console.log(err, result);
    }
  );
  console.log(name);
}
