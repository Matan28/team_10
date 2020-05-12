import firebase from "firebase";

const config = {
  apiKey: "AIzaSyAzbhIpVD6OhApa24g4ygQCrRt1x4ZX-ks",
  authDomain: "scesite-1bcb7.firebaseapp.com",
  databaseURL: "https://scesite-1bcb7.firebaseio.com/",
};
// var firebaseConfig = {
//   apiKey: "AIzaSyAzbhIpVD6OhApa24g4ygQCrRt1x4ZX-ks",
//   authDomain: "scesite-1bcb7.firebaseapp.com",
//   databaseURL: "https://scesite-1bcb7.firebaseio.com",
//   projectId: "scesite-1bcb7",
//   storageBucket: "scesite-1bcb7.appspot.com",
//   messagingSenderId: "278511076958",
//   appId: "1:278511076958:web:ef708ac1e9524dde4696cf",
//   measurementId: "G-LCL9G94T6Z",
// };

firebase.initializeApp(config);

export function firebaseListener(func) {
  firebase.auth().onAuthStateChanged(
    function(user) {
      if (user) {
        // console.log("User log in success", user);
        func(true, user);
      } else {
        // console.log("User log in failed", user);
        func(false);
      }
    },
    function(error) {
      console.log(error);
    }
  );
}

export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;
