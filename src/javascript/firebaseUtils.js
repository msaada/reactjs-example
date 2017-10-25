//@flow

import type { ArtistType, ArtPieceType, ArtTypeType } from "../types/types";
import artistModel from "../models/artist";
import artPieceModel from "../models/artPiece";
import artTypeModel from "../models/artType";

import * as firebase from "firebase";

export let app = null;
export let database = null;
export let auth = null;
export let storage = null;

export const init = () => {
  const config = {
    apiKey: "AIzaSyCVHvfzWzV5p2G8VkXW7k_3ALHLuS_m-WQ",
    authDomain: "ohmyart-ee13a.firebaseapp.com",
    databaseURL: "https://ohmyart-ee13a.firebaseio.com",
    storageBucket: "ohmyart-ee13a.appspot.com",
    messagingSenderId: "564094140683.4"
  };
  app = firebase.initializeApp(config);
  database = app.database();
  auth = app.auth();
  storage = app.storage();
};

// add new section
export const addToFirebase = (
  root: string,
  element: ArtistType | ArtPieceType | ArtTypeType
) => {
  const key = database ? database.ref(root).push().key : null;
  let model;
  console.log(element);
  if (element.weight) {
    model = key
      ? artPieceModel(key, element, firebase.database.ServerValue.TIMESTAMP)
      : null;
  } else if (element.lastName) {
    model = key
      ? artistModel(key, element, firebase.database.ServerValue.TIMESTAMP)
      : null;
  } else {
    model = key
      ? artTypeModel(key, element, firebase.database.ServerValue.TIMESTAMP)
      : null;
  }
  return database && key ? database.ref(root + "/" + key).set(model) : null;
};

export function getArtPieces(callback: (Array<ArtPieceType>) => void) {
  const artPiecesRef = database ? database.ref("/artpieces") : null;
  const artPieces: Array<ArtPieceType> = [];
  if (artPiecesRef) {
    artPiecesRef.on("value", snap => {
      snap.forEach(child => {
        artPieces.push(child.val());
      });
      callback(artPieces);
    });
  }
}

export function getArtPiece(
  artpieceId: string,
  callback: ArtPieceType => void
) {
  const artPiecesRef = database
    ? database.ref("/artpieces/" + artpieceId)
    : null;
  if (artPiecesRef) {
    artPiecesRef.on("value", snap => {
      snap.forEach(child => {
        callback(child.val());
      });
    });
  }
}
export async function getArtPiece2(artpieceId: string) {
  const artPiecesRef = database
    ? database.ref(`/artpieces/${artpieceId}`)
    : null;
  if (artPiecesRef) {
    const artPieceSnapshot = await artPiecesRef.once("value");
    return artPieceSnapshot.val();
  }
}

export async function getArtist2(artistId: string) {
  console.log(artistId);
  const artistRef = database ? database.ref(`/artists/${artistId}`) : null;
  console.log(artistRef);
  if (artistRef) {
    const artistSnapshot = await artistRef.once("value");
    return artistSnapshot.val();
  }
}

export function getArtist(artistId: string, callback: ArtistType => void) {
  const artistRef = database ? database.ref("/artists/" + artistId) : null;
  if (artistRef) {
    artistRef.on("value", snap => {
      snap.forEach(child => {
        callback(child.val());
      });
    });
  }
}
export function getArtists(callback: (Array<ArtistType>) => void) {
  const artistRef = database ? database.ref("/artists") : null;
  const artists: Array<ArtistType> = [];
  if (artistRef) {
    artistRef.on("value", snap => {
      snap.forEach(child => {
        artists.push(child.val());
      });
      callback(artists);
    });
  }
}

export function getLastArtist(callback: ArtistType => void) {
  const artistRef = database ? database.ref("/artists") : null;
  if (artistRef) {
    artistRef.on("child_added", snap => {
      console.log(snap.val());
      callback(snap.val());
    });
  } else {
    console.log("database not initiated");
  }
}

export function getLastArtPiece(callback: ArtPieceType => void) {
  const artPieceRef = database ? database.ref("/artpieces") : null;
  if (artPieceRef) {
    artPieceRef.on("child_added", snap => {
      console.log(snap.val());
      callback(snap.val());
    });
  } else {
    console.log("database not initiated");
  }
}

export function getLastArtType(callback: ArtTypeType => void) {
  const artTypeRef = database ? database.ref("/arttypes") : null;
  if (artTypeRef) {
    artTypeRef.on("child_added", snap => {
      console.log(snap.val());
      callback(snap.val());
    });
  } else {
    console.log("database not initiated");
  }
}

export function getUserExtraInfos(key: string, callback: any) {
  if (database) {
    const ref = database.ref("/userdatas/" + key);

    // Attach an asynchronous callback to read the data at our posts reference
    ref.on(
      "value",
      function(snapshot) {
        callback(snapshot.val());
      },
      function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      }
    );
  }
}
