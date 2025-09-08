document
  .getElementById("product-form")
  .addEventListener("submit", createProduct)

function createProduct(event) {
  event.preventDefault()

  const formData = new FormData()
  formData.append("name", document.getElementById("name").value)
  formData.append("price", document.getElementById("price").value)
  formData.append("description", document.getElementById("description").value)

  const imageFile = document.getElementById("image").files[0]
  if (imageFile) {
    formData.append("image", imageFile)
  }

  fetch("http://localhost:5080/products", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Product created:", data)
      document.getElementById("product-form").reset()
    })
    .catch((error) => console.error("Error:", error))
}
