import * as firebase from "firebase";

export function pushArtistToFirebase(artistData) {
  const database = firebase.database();
  var ref = database.ref("artists");
  // this new, empty ref only exists locally
  var newChildRef = ref.push();
  // we can get its id using key()
  console.log('my new shiny id is ' + newChildRef.key);
  // now it is appended at the end of data at the server
  newChildRef.set({id: newChildRef.key, firstName: artistData.name, profilePicture: artistData.picture, bio: artistData.description, style: 'Sculpteur'});

};

export function createReferences(artists) {
  artists.map((artist) => {
    console.log(artist);
    pushArtistToFirebase(artist);
    return 'OK'
  });
};

export function readUserData(callback) {
  const rootRef = firebase.database().ref();
  const artistRef = rootRef.child("artists");
  const artists = [0];
  artistRef.on("value", snap => {
    snap.forEach((child) => {
      artists.push(child.val());
    });
    callback(artists);
  });
};
