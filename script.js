// إضافة تكوين Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBXXCR2jN8SOP_AamRaE0vkEliR_cnpLqY",
    authDomain: "backy-123.firebaseapp.com",
    projectId: "backy-123",
    storageBucket: "backy-123.appspot.com",
    messagingSenderId: "763792380953",
    appId: "1:763792380953:web:74e509e70ca36b94f80688",
    measurementId: "G-YP8852THBW"
};

// تهيئة Firebase
const app = firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

// دالة رفع الصورة
function uploadImage() {
    const imageUpload = document.getElementById('imageUpload').files[0];
    if (!imageUpload) {
        document.getElementById('uploadStatus').innerHTML = 'يرجى اختيار صورة.';
        return;
    }

    const storageRef = storage.ref('images/' + imageUpload.name);
    const uploadTask = storageRef.put(imageUpload);

    uploadTask.on('state_changed', 
        (snapshot) => {
            // تقدم رفع الصورة
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            document.getElementById('uploadStatus').innerHTML = 'جاري الرفع: ' + progress.toFixed(2) + '%';
        }, 
        (error) => {
            // خطأ أثناء الرفع
            document.getElementById('uploadStatus').innerHTML = 'حدث خطأ أثناء الرفع: ' + error.message;
        }, 
        () => {
            // نجاح الرفع
            document.getElementById('uploadStatus').innerHTML = 'تم رفع الصورة بنجاح!';
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log('رابط الصورة:', downloadURL);
            });
        }
    );
}
