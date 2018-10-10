function checkIfLoggedIn() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log('User signed in');
            console.log(user);

            document.getElementById('google-displayName').innerHTML = user.displayName;
            document.getElementById('google-pic').src = user.photoURL;
            document.getElementById('google-email').innerHTML = user.email;
            document.getElementById('google-signin').setAttribute('style', 'display: none; visibility: hidden');
            document.getElementById('signout').setAttribute('style', 'display: inline-block; visibility: visible');
        } else {
            console.log('User not signed in');
            document.getElementById('google-signin').setAttribute('style', 'display: inline-block; visibility: visible');
            document.getElementById('signout').setAttribute('style', 'display: none; visibility: hidden');
        }
    });

}
window.onload = function() {
    checkIfLoggedIn();
};

function signOut() {
    firebase.auth().signOut();

    document.getElementById('google-displayName').innerHTML = '';
    document.getElementById('google-pic').setAttribute('src', '');
    document.getElementById('google-email').innerHTML = '';

    checkIfLoggedIn();
}

function signInWithGoogle() {
    var googleAuthProvider = new firebase.auth.GoogleAuthProvider;
    firebase.auth().signInWithPopup(googleAuthProvider)
        .then(function (data) {
            console.log(data);

            var idToken = data.credential.idToken;


            document.getElementById('google-displayName').innerHTML = data.user.displayName;
            document.getElementById('google-pic').src = data.user.photoURL;
            document.getElementById('google-email').innerHTML = data.user.email;

            checkIfLoggedIn();
        })
        .catch(function (error) {
            console.log(error);
        })
}