// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgb_sXXlFTp7FrUXY2mmhyMr3PhiFGUD4",
  authDomain: "ecom-e95f8.firebaseapp.com",
  projectId: "ecom-e95f8",
  storageBucket: "ecom-e95f8.appspot.com",
  messagingSenderId: "1090628222509",
  appId: "1:1090628222509:web:31e9b4388d7ad110d482a4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const uploadFile = (file) => {
  return new Promise((resolve, reject) => {
    const fileName = new Date().getTime() + file.name

    const storage = getStorage(app)
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        reject(error)
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        // setIsUploading(false)
        // SetProgress("Image uploaded")
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL)
        });
      }
    )
  })
}

export default uploadFile;