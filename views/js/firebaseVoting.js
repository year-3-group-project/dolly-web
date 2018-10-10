function addRestaurant() {
    var database = firebase.database();
    var restaurantRef = database.ref('/restaurants');
    const restaurantName = document.getElementById('addRestaurant').value;
    document.getElementById('addRestaurant').value = '';

    restaurantRef.push({name: restaurantName, votes: 0})
        .then(function () {
            window.location.reload();
        })
        .catch(function (error) {
            console.log(error);
        })
}

function upvote(key) {
    console.log(key);
    var database = firebase.database();
    var user = firebase.auth().currentUser;
    var userId = user.uid;
    var displayName = user.displayName;

    var restaurantVotesRef = database.ref('/restaurants/' + key + '/votes/' + userId);

    restaurantVotesRef.set(displayName)
        .then(function () {
            window.location.reload();
        }).catch(function (err) {
        console.log(err);
    })
}

function downvote(key) {
    console.log(key);
    var database = firebase.database();
    var user = firebase.auth().currentUser;
    var userId = user.uid;
    var displayName = user.displayName;

    var restaurantVotesRef = database.ref('/restaurants/' + key + '/votes')
        .remove()
        .then(function () {
            window.location.reload();
            }).catch(function (err) {
        console.log(err);
    })


    
}