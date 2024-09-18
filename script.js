document.getElementById('uploadForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const imageInput = document.getElementById('imageInput');
    const titleInput = document.getElementById('titleInput');
    const postsContainer = document.getElementById('postsContainer');

    if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const postDiv = document.createElement('div');
            postDiv.classList.add('post');

            const img = document.createElement('img');
            img.src = e.target.result;
            postDiv.appendChild(img);

            const title = document.createElement('h2');
            title.textContent = titleInput.value;
            postDiv.appendChild(title);

            postsContainer.appendChild(postDiv);

            // Reset form
            imageInput.value = '';
            titleInput.value = '';
        };
        reader.readAsDataURL(imageInput.files[0]);
    }
});
