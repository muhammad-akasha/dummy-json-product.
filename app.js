window.addEventListener("load" , (event) => {
  fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      showCards(data.products);
    })
    .catch((err) => {
      console.log(err);
    });
})

function showCards(product) {
  let productContainer = document.querySelector(".product-container");
  console.log(product);
  for (let pro of product) {
    let productHtml = `
  <div class="product-div">
  <div class="card" style="width:18rem">
  <img src="${pro.thumbnail}" class="card-img-top" alt="...">
  <div class="card-body">
  <h5 class="card-title">Title : ${pro.title}</h5>
  <h5 class="card-text">Category : ${pro.category}</h5>
  <h5 class="card-text">${pro.returnPolicy}</h5>
  <div class="rating">
  ${generateRatingStars(pro.rating)}
</div>
  <p class="card-text"> Price : ${pro.price} $</p>
    <button type="button" class="btn btn-primary" onclick="showDetails(${
      pro.id
    })" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
    Show Details
  </button>
  </div>
</div>
</div>
  `;
    productContainer.innerHTML += productHtml;
  }
}
function showDetails(id) {
  let modalTitle = document.querySelector(".modal-title");
  let modalBody = document.querySelector(".modal-body");

  fetch(`https://dummyjson.com/products/${id}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      modalTitle.innerHTML = `${data.title}`;

      modalBody.innerHTML = `
          <div> 
            <div class="modal-img">
              <img src="${data.thumbnail}" alt="${data.title}">
            </div>
            <h5>Category: <strong>${data.category}</strong></h5>
            <h5>Description: <strong>${data.description}</strong></h5>
            <h5>Return Policy: <strong>${data.returnPolicy ||
              "N/A"}</strong></h5>
            <h5>Shipping Information: <strong>${data.shippingInformation ||
              "N/A"}</strong></h5>
            <h5>Warranty Information: <strong>${data.warrantyInformation ||
              "N/A"}</strong></h5>
            <div class="rating">
              ${generateRatingStars(data.rating)}
            </div>
            <h5>Price: <strong>${data.price} $</strong></h5>
          </div>
        `;
    })
    .catch((error) => {
      console.error("Error fetching product details:", error);
      modalTitle.innerHTML = "Error";
      modalBody.innerHTML =
        "<p>Unable to fetch product details. Please try again later.</p>";
    });
}

function generateRatingStars(rating) {
  let starsHTML = "";
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      starsHTML += '<span class="fa fa-star checked"></span>';
    } else if (rating >= i - 0.5) {
      starsHTML += '<span class="fa-solid fa-star-half-stroke checked"></span>';
    } else {
      starsHTML += '<span class="fa fa-star" style="color:#c1c1c0"></span>';
    }
  }
  return starsHTML;
}
