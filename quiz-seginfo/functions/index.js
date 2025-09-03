const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

exports.createUserDocument = functions.auth.user().onCreate(async (user) => {
  console.log("Novo usuário criado:", user.uid, user.email);

  const userRef = db.collection("users").doc(user.uid);

  return userRef.set({
    email: user.email,
    pontos: 0,
    nivel: 1,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });
});
