let nextCursor = null;
let currentPage = 1;
let totalPages = 1;
const imagesPerPage = 12; // 4 columnas x 3 filas

function openImagePicker(modalId, inputId, previewContainerId) {
  const modalElement = document.getElementById(modalId);
  const inputElement = document.getElementById(inputId);
  
  // Usar Bootstrap para mostrar el modal
  if (typeof bootstrap !== 'undefined') {
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  } else {
    // Fallback si bootstrap no está disponible
    modalElement.style.display = "block";
  }

  // Configurar el botón de cierre
  const closeModalButton = modalElement.querySelector(".cancelar-galeria-create");
  if (closeModalButton) {
    closeModalButton.addEventListener("click", function () {
      if (typeof bootstrap !== 'undefined') {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) modal.hide();
      } else {
        modalElement.style.display = "none";
      }
    });
  }
  
  // Añadir botón de cierre (X) si no existe
  const modalHeader = modalElement.querySelector(".modal-header");
  if (modalHeader && !modalHeader.querySelector(".btn-close")) {
    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "btn-close";
    closeButton.setAttribute("data-bs-dismiss", "modal");
    closeButton.setAttribute("aria-label", "Close");
    closeButton.addEventListener("click", function() {
      if (typeof bootstrap !== 'undefined') {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) modal.hide();
      } else {
        modalElement.style.display = "none";
      }
    });
    modalHeader.appendChild(closeButton);
  }

  const imageGrid = modalElement.querySelector(".image-grid");
  
  // Limpiar el grid antes de cargar nuevas imágenes
  imageGrid.innerHTML = '';
  
  // Resetear variables de paginación
  nextCursor = null;
  currentPage = 1;
  
  // Crear contenedor de paginación dentro del container-fluid
  const containerFluid = modalElement.querySelector(".container-fluid");
  let paginationContainer = containerFluid.querySelector(".pagination-container");
  
  if (!paginationContainer) {
    paginationContainer = document.createElement("div");
    paginationContainer.className = "pagination-container";
    containerFluid.appendChild(paginationContainer);
  } else {
    paginationContainer.innerHTML = '';
  }
  
  loadImages(imageGrid, inputElement, modalElement, previewContainerId, paginationContainer);
}

function loadImages(imageGrid, inputElement, modalElement, previewContainerId, paginationContainer) {
  // Mostrar un indicador de carga con clase mejorada
  const loadingDiv = document.createElement("div");
  loadingDiv.className = "loading-indicator col-12";
  loadingDiv.innerHTML = "<p>Cargando imágenes...</p>";
  imageGrid.innerHTML = '';
  imageGrid.appendChild(loadingDiv);

  // Usar la ruta pública en lugar de la protegida
  const url = nextCursor ? `/api/images?cursor=${nextCursor}` : "/api/images";
  
  // Obtener el token de la cookie
  const token = getCookie('token');
  
  const headers = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  fetch(url, {
    headers: headers,
    credentials: 'include' // Incluir cookies en la solicitud
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
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
      
      // Calcular el número total de páginas (aproximado)
      totalPages = Math.ceil(images.length / imagesPerPage);
      if (data.nextCursor) {
        totalPages += 1; // Añadir al menos una página más si hay más imágenes
      }
      
      // Crear un contenedor de fila para las imágenes
      const row = document.createElement("div");
      row.className = "row";
      
      images.forEach((image) => {
        const img = document.createElement("img");
        img.src = image.url;
        img.alt = image.public_id;
        img.className = "img-thumbnail w-100";
        img.style.height = "120px"; // Altura fija para todas las imágenes
        img.style.objectFit = "cover"; // Mantener proporción y recortar si es necesario
        
        // Mejorar la experiencia al hacer clic
        img.onclick = function () {
          // Añadir clase seleccionada a la imagen
          const selectedImages = imageGrid.querySelectorAll(".selected-image");
          selectedImages.forEach(img => img.classList.remove("selected-image"));
          img.classList.add("selected-image");
          
          // Establecer el valor en el input
          inputElement.value = image.url;
          
          // Código para la vista previa
          if (previewContainerId) {
            const previewContainer = document.getElementById(previewContainerId);
            if (previewContainer) {
              const previewImage = document.createElement("img");
              previewImage.src = image.url;
              previewImage.alt = "Vista previa";
              previewContainer.innerHTML = "";
              previewContainer.appendChild(previewImage);
            }
          }
          
          // Cerrar el modal después de un breve retraso
          setTimeout(() => {
            if (typeof bootstrap !== 'undefined') {
              const modal = bootstrap.Modal.getInstance(modalElement);
              if (modal) modal.hide();
            } else {
              modalElement.style.display = "none";
            }
          }, 300);
        };
        
        const col = document.createElement("div");
        col.className = "col-3 mb-3"; // Añadir margen inferior
        col.appendChild(img);
        row.appendChild(col);
      });
      
      imageGrid.appendChild(row);
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
  prevLink.setAttribute("aria-label", "Anterior");
  prevLink.onclick = function(e) {
    e.preventDefault();
    if (currentPage > 1) {
      currentPage--;
      // Volver a la primera página
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
  
  // Asegurar que se muestren al menos 5 páginas si es posible
  const minPagesToShow = 5;
  let adjustedStartPage = startPage;
  let adjustedEndPage = endPage;
  
  if (endPage - startPage + 1 < minPagesToShow) {
    const pagesShowing = endPage - startPage + 1;
    const pagesToAdd = minPagesToShow - pagesShowing;
    
    if (startPage > 1) {
      adjustedStartPage = Math.max(1, startPage - pagesToAdd);
    } else if (endPage < totalPages) {
      adjustedEndPage = Math.min(totalPages, endPage + pagesToAdd);
    }
  }
  
  // Añadir primera página y elipsis si es necesario
  if (adjustedStartPage > 1) {
    const firstPageLi = document.createElement("li");
    firstPageLi.className = "page-item";
    const firstPageLink = document.createElement("a");
    firstPageLink.className = "page-link";
    firstPageLink.href = "#";
    firstPageLink.textContent = "1";
    firstPageLink.onclick = function(e) {
      e.preventDefault();
      currentPage = 1;
      nextCursor = null;
      loadImages(imageGrid, inputElement, modalElement, previewContainerId, paginationContainer);
    };
    firstPageLi.appendChild(firstPageLink);
    ul.appendChild(firstPageLi);
    
    if (adjustedStartPage > 2) {
      const ellipsisLi = document.createElement("li");
      ellipsisLi.className = "page-item disabled";
      const ellipsisSpan = document.createElement("span");
      ellipsisSpan.className = "page-link";
      ellipsisSpan.textContent = "...";
      ellipsisLi.appendChild(ellipsisSpan);
      ul.appendChild(ellipsisLi);
    }
  }
  
  // Páginas numeradas
  for (let i = adjustedStartPage; i <= adjustedEndPage; i++) {
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
        // Si es una página posterior, cargamos más imágenes
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
  
  // Añadir última página y elipsis si es necesario
  if (adjustedEndPage < totalPages) {
    if (adjustedEndPage < totalPages - 1) {
      const ellipsisLi = document.createElement("li");
      ellipsisLi.className = "page-item disabled";
      const ellipsisSpan = document.createElement("span");
      ellipsisSpan.className = "page-link";
      ellipsisSpan.textContent = "...";
      ellipsisLi.appendChild(ellipsisSpan);
      ul.appendChild(ellipsisLi);
    }
    
    const lastPageLi = document.createElement("li");
    lastPageLi.className = "page-item";
    const lastPageLink = document.createElement("a");
    lastPageLink.className = "page-link";
    lastPageLink.href = "#";
    lastPageLink.textContent = totalPages;
    lastPageLink.onclick = function(e) {
      e.preventDefault();
      currentPage = totalPages;
      // Aquí necesitaríamos implementar la lógica para ir a la última página
      // Por ahora, simplemente cargamos más imágenes
      loadImages(imageGrid, inputElement, modalElement, previewContainerId, paginationContainer);
    };
    lastPageLi.appendChild(lastPageLink);
    ul.appendChild(lastPageLi);
  }
  
  // Botón siguiente
  const nextLi = document.createElement("li");
  nextLi.className = `page-item ${!nextCursor ? 'disabled' : ''}`;
  const nextLink = document.createElement("a");
  nextLink.className = "page-link";
  nextLink.href = "#";
  nextLink.textContent = "Siguiente";
  nextLink.setAttribute("aria-label", "Siguiente");
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
}

// Función auxiliar para obtener cookies
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}
