import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
	apiKey: "AIzaSyCeQ1wsSiQGm-4YaMO-SsCZySxr54sIj5A",
	authDomain: "diplomprojekt-55fd4.firebaseapp.com",
	projectId: "diplomprojekt-55fd4",
	storageBucket: "diplomprojekt-55fd4.appspot.com",
	messagingSenderId: "439620596586",
	appId: "1:439620596586:web:127ef8b03a57e3df1e2b13",
	measurementId: "G-XVNYXE5W8V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

auth.onAuthStateChanged(user => {
	// TODO: userdata i context
	if (user) {
		console.log('logged in')
	} else {
		console.log('logged out')
	}
})
