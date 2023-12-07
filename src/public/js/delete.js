document.addEventListener("DOMContentLoaded", function () {
  const deleteButtons = document.querySelectorAll(".btn-danger");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const confirmation = confirm("Seguro quieres borrarlo?");
      if (confirmation) {
        const url = e.target.href;
        fetch(url, {
          method: "DELETE",
        }).then(() => {
          window.location.reload();
        });
      }
    });
  });
});
  