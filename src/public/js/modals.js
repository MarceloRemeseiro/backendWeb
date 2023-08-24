let nextCursor = null;

function openImagePicker(modalId, inputId, previewContainerId) {
  const modalElement = document.getElementById(modalId);
  const inputElement = document.getElementById(inputId);
  modalElement.style.display = "block";

  const closeModalButton = modalElement.querySelector(
    ".cancelar-galeria-create"
  );
  closeModalButton.addEventListener("click", function () {
    modalElement.style.display = "none";
  });

  const imageGrid = modalElement.querySelector(".image-grid");
  const loadMoreButton = modalElement.querySelector("#load-more-btn");

  loadImages(imageGrid, inputElement, modalElement,previewContainerId);

  loadMoreButton.addEventListener("click", function () {
    loadImages(imageGrid, inputElement, modalElement);
  });
}

function loadImages(imageGrid, inputElement, modalElement,previewContainerId) {
  const url = nextCursor ? `/api/images?cursor=${nextCursor}` : "/api/images";

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const images = data.images;
      images.forEach((image) => {
        const img = document.createElement("img");
        img.src = image.url;
        img.alt = image.public_id;
        img.className = "img-thumbnail w-100";
        img.onclick = function () {
          inputElement.value = image.url;
          modalElement.style.display = "none";
    
          // Código para la vista previa
          const previewContainer = document.getElementById(previewContainerId);
          const previewImage = document.createElement("img");
          previewImage.src = image.url;
          previewImage.alt = "Vista previa";
          previewImage.style.maxWidth = "100px";
          previewContainer.innerHTML = "";
          previewContainer.appendChild(previewImage);
        };
        const col = document.createElement("div");
        col.className = "col-3";
        col.appendChild(img);
        imageGrid.appendChild(col);
      });

      nextCursor = data.nextCursor;
    })
    .catch((error) => console.error("Error:", error));
}
