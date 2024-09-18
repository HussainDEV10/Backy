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
const db = firebase.firestore();

// دالة رفع الخلفية
function uploadBackground() {
    const fileInput = document.getElementById('background-file');
    const titleInput = document.getElementById('background-title');
    const file = fileInput.files[0];
    const title = titleInput.value;

    if (file && title) {
        const storageRef = storage.ref('backgrounds/' + file.name);
        const uploadTask = storageRef.put(file);

        uploadTask.on('state_changed', 
            (snapshot) => {
                // تقدم التحميل (يمكنك إضافة مؤشر تقدم هنا)
            }, 
            (error) => {
                alert('خطأ أثناء رفع الملف: ' + error.message);
            }, 
            () => {
                // عند اكتمال التحميل
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    db.collection('backgrounds').add({
                        title: title,
                        url: downloadURL
                    }).then(() => {
                        alert('تم رفع الخلفية بنجاح!');
                        displayBackgrounds();
                    }).catch((error) => {
                        alert('خطأ أثناء حفظ البيانات في Firestore: ' + error.message);
                    });
                }).catch((error) => {
                    alert('خطأ أثناء الحصول على رابط التحميل: ' + error.message);
                });
            }
        );
    } else {
        alert('يرجى اختيار ملف وإدخال اسم الخلفية.');
    }
}

// دالة عرض الخلفيات
function displayBackgrounds() {
    const backgroundsList = document.getElementById('backgrounds-list');
    backgroundsList.innerHTML = '';

    db.collection('backgrounds').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const backgroundItem = document.createElement('div');
            backgroundItem.classList.add('background-item');

            const img = document.createElement('img');
            img.src = data.url;
            img.alt = data.title;

            const title = document.createElement('p');
            title.textContent = data.title;

            backgroundItem.appendChild(img);
            backgroundItem.appendChild(title);
            backgroundsList.appendChild(backgroundItem);
        });
    }).catch((error) => {
        alert('خطأ أثناء عرض الخلفيات: ' + error.message);
    });
}

// تحميل الخلفيات عند فتح الصفحة
displayBackgrounds();
