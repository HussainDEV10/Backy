// Firebase configuration (انسخ إعدادات Firebase الخاصة بك هنا)
const firebaseConfig = {
  apiKey: "AIzaSyBXXCR2jN8SOP_AamRaE0vkEliR_cnpLqY",
  authDomain: "backy-123.firebaseapp.com",
  projectId: "backy-123",
  storageBucket: "backy-123.appspot.com",
  messagingSenderId: "763792380953",
  appId: "1:763792380953:web:74e509e70ca36b94f80688",
  measurementId: "G-YP8852THBW"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
const db = firebase.firestore();

document.getElementById('uploadForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const imageInput = document.getElementById('imageInput');
    const titleInput = document.getElementById('titleInput');
    const postsContainer = document.getElementById('postsContainer');

    if (imageInput.files && imageInput.files[0]) {
        const file = imageInput.files[0];
        const storageRef = storage.ref('images/' + file.name);
        const uploadTask = storageRef.put(file);

        uploadTask.on('state_changed', 
            (snapshot) => {
                // يمكنك إضافة مؤشر التحميل هنا إذا أردت
            }, 
            (error) => {
                console.error('فشل في رفع الصورة:', error);
            }, 
            () => {
                // احصل على رابط الصورة
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    const title = titleInput.value;

                    // حفظ البيانات في Firestore
                    db.collection("posts").add({
                        title: title,
                        imageUrl: downloadURL
                    })
                    .then(() => {
                        // عرض الصورة والعنوان في الصفحة
                        const postDiv = document.createElement('div');
                        postDiv.classList.add('post');

                        const img = document.createElement('img');
                        img.src = downloadURL;
                        postDiv.appendChild(img);

                        const titleElem = document.createElement('h2');
                        titleElem.textContent = title;
                        postDiv.appendChild(titleElem);

                        postsContainer.appendChild(postDiv);

                        // إعادة تعيين النموذج
                        imageInput.value = '';
                        titleInput.value = '';
                    })
                    .catch((error) => {
                        console.error('خطأ في حفظ البيانات:', error);
                    });
                });
            }
        );
    }
});
