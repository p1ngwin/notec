export const firebaseConfig = {
  apiKey: "AIzaSyDtoLuSMXLKA_KD8aCVNiioX4Dnl_skUso",
  authDomain: "notec-app-ef5e3.firebaseapp.com",
  projectId: "notec-app-ef5e3",
  storageBucket: "notec-app-ef5e3.appspot.com",
  messagingSenderId: "694507045582",
  appId: "1:694507045582:web:3a6323f2f462f86355869f",
  measurementId: "G-RD96HZBXJH",
};

export const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: "https://www.notec-app-ef5e3.firebaseapp.com/",
  // This must be true.
  handleCodeInApp: true,
  iOS: {
    bundleId: "com.example.ios",
  },
  android: {
    packageName: "com.example.android",
    installApp: true,
    minimumVersion: "12",
  },
  dynamicLinkDomain: "example.page.link",
};
