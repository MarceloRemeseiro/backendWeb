let nextCursor = null;
let currentPage = 1;
let totalPages = 1;
const imagesPerPage = 12; // 4 columnas x 3 filas

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
  
  // Limpiar el grid antes de cargar nuevas imágenes
  imageGrid.innerHTML = '';
  
  // Resetear variables de paginación
  nextCursor = null;
  currentPage = 1;
  
  // Crear contenedor de paginación si no existe
  let paginationContainer = modalElement.querySelector(".pagination-container");
  if (!paginationContainer) {
    paginationContainer = document.createElement("div");
    paginationContainer.className = "pagination-container d-flex justify-content-center mt-3";
    const modalFooter = modalElement.querySelector(".modal-footer");
    modalFooter.insertBefore(paginationContainer, modalFooter.firstChild);
  } else {
    paginationContainer.innerHTML = '';
  }
  
  loadImages(imageGrid, inputElement, modalElement, previewContainerId, paginationContainer);
}

function loadImages(imageGrid, inputElement, modalElement, previewContainerId, paginationContainer) {
  // Mostrar un indicador de carga
  const loadingDiv = document.createElement("div");
  loadingDiv.className = "col-12 text-center";
  loadingDiv.innerHTML = "<p>Cargando imágenes...</p>";
  imageGrid.innerHTML = '';
  imageGrid.appendChild(loadingDiv);

  // Usar la ruta pública en lugar de la protegida
  const url = nextCursor ? `/api/images?cursor=${nextCursor}` : "/api/images";
  console.log("Fetching images from:", url);

  // Obtener el token de la cookie
  const token = getCookie('token');
  console.log("Token encontrado:", token ? "Sí" : "No");
  
  const headers = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  console.log("Headers:", headers);
  
  fetch(url, {
    headers: headers,
    credentials: 'include' // Incluir cookies en la solicitud
  })
    .then((response) => {
      console.log("Status de respuesta:", response.status);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Received data:", data);
      
      // Eliminar el indicador de carga
      imageGrid.removeChild(loadingDiv);
      
      if (!data.images || data.images.length === 0) {
        const noImagesDiv = document.createElement("div");
        noImagesDiv.className = "col-12 text-center";
        noImagesDiv.innerHTML = "<p>No se encontraron imágenes</p>";
        imageGrid.appendChild(noImagesDiv);
        return;
      }

      const images = data.images;
      console.log("Número de imágenes recibidas:", images.length);
      
      // Calcular el número total de páginas (aproximado)
      totalPages = Math.ceil(images.length / imagesPerPage);
      if (data.nextCursor) {
        totalPages += 1; // Añadir al menos una página más si hay más imágenes
      }
      
      images.forEach((image) => {
        const img = document.createElement("img");
        img.src = image.url;
        img.alt = image.public_id;
        img.className = "img-thumbnail w-100";
        img.style.height = "120px"; // Altura fija para todas las imágenes
        img.style.objectFit = "cover"; // Mantener proporción y recortar si es necesario
        img.onclick = function () {
          inputElement.value = image.url;
          modalElement.style.display = "none";
    
          // Código para la vista previa
          if (previewContainerId) {
            const previewContainer = document.getElementById(previewContainerId);
            if (previewContainer) {
              const previewImage = document.createElement("img");
              previewImage.src = image.url;
              previewImage.alt = "Vista previa";
              previewImage.style.maxWidth = "100px";
              previewContainer.innerHTML = "";
              previewContainer.appendChild(previewImage);
            }
          }
        };
        const col = document.createElement("div");
        col.className = "col-3 mb-3"; // Añadir margen inferior
        col.appendChild(img);
        imageGrid.appendChild(col);
      });

      nextCursor = data.nextCursor;
      
      // Actualizar la paginación
      updatePagination(paginationContainer, imageGrid, inputElement, modalElement, previewContainerId);
    })
    .catch((error) => {
      console.error("Error al cargar imágenes:", error);
      
      // Eliminar el indicador de carga
      if (loadingDiv.parentNode === imageGrid) {
        imageGrid.removeChild(loadingDiv);
      }
      
      // Mostrar mensaje de error
      const errorDiv = document.createElement("div");
      errorDiv.className = "col-12 text-center text-danger";
      errorDiv.innerHTML = `<p>Error al cargar imágenes: ${error.message}</p>`;
      imageGrid.appendChild(errorDiv);
    });
}

function updatePagination(paginationContainer, imageGrid, inputElement, modalElement, previewContainerId) {
  paginationContainer.innerHTML = '';
  
  const nav = document.createElement("nav");
  nav.setAttribute("aria-label", "Navegación de imágenes");
  
  const ul = document.createElement("ul");
  ul.className = "pagination";
  
  // Botón anterior
  const prevLi = document.createElement("li");
  prevLi.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
  const prevLink = document.createElement("a");
  prevLink.className = "page-link";
  prevLink.href = "#";
  prevLink.textContent = "Anterior";
  prevLink.onclick = function(e) {
    e.preventDefault();
    if (currentPage > 1) {
      currentPage--;
      // Aquí necesitaríamos implementar la lógica para ir a la página anterior
      // Por ahora, simplemente recargamos la primera página
      nextCursor = null;
      loadImages(imageGrid, inputElement, modalElement, previewContainerId, paginationContainer);
    }
  };
  prevLi.appendChild(prevLink);
  ul.appendChild(prevLi);
  
  // Números de página
  // Mostrar solo un rango de páginas alrededor de la página actual
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);
  
  for (let i = startPage; i <= endPage; i++) {
    const pageLi = document.createElement("li");
    pageLi.className = `page-item ${i === currentPage ? 'active' : ''}`;
    const pageLink = document.createElement("a");
    pageLink.className = "page-link";
    pageLink.href = "#";
    pageLink.textContent = i;
    pageLink.onclick = function(e) {
      e.preventDefault();
      if (i !== currentPage) {
        currentPage = i;
        // Aquí necesitaríamos implementar la lógica para ir a la página específica
        // Por ahora, si es una página posterior, cargamos más imágenes
        if (i > 1 && nextCursor) {
          loadImages(imageGrid, inputElement, modalElement, previewContainerId, paginationContainer);
        } else {
          nextCursor = null;
          loadImages(imageGrid, inputElement, modalElement, previewContainerId, paginationContainer);
        }
      }
    };
    pageLi.appendChild(pageLink);
    ul.appendChild(pageLi);
  }
  
  // Botón siguiente
  const nextLi = document.createElement("li");
  nextLi.className = `page-item ${!nextCursor ? 'disabled' : ''}`;
  const nextLink = document.createElement("a");
  nextLink.className = "page-link";
  nextLink.href = "#";
  nextLink.textContent = "Siguiente";
  nextLink.onclick = function(e) {
    e.preventDefault();
    if (nextCursor) {
      currentPage++;
      loadImages(imageGrid, inputElement, modalElement, previewContainerId, paginationContainer);
    }
  };
  nextLi.appendChild(nextLink);
  ul.appendChild(nextLi);
  
  nav.appendChild(ul);
  paginationContainer.appendChild(nav);
  
  // Ocultar el botón "Cargar más" ya que ahora usamos paginación
  const loadMoreButton = modalElement.querySelector("#load-more-btn");
  if (loadMoreButton) {
    loadMoreButton.style.display = "none";
  }
}

// Función auxiliar para obtener cookies
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}
