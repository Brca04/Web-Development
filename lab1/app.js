function updateProductImages(brand) {
    const cars = carData[brand];
    const productElements = document.querySelectorAll(".ProdajaEl");
  
    productElements.forEach((el, index) => {
      const imgBox = el.querySelector(".SlikaProdaja");
      const nameBox = el.querySelector(".Proizvod");
      const categoryBox = el.querySelector(".KategorijaEl") || el.querySelector(".KategorijaE");
  
      if (cars && cars[index]) {
        const car = cars[index];
        imgBox.innerHTML = `<img src="images/auti/${car.image}" alt="${car.name}" style="width:100%">`;
        nameBox.textContent = car.name;
        if (categoryBox) categoryBox.textContent = car.category;
      } else {
        imgBox.innerHTML = "";
        nameBox.textContent = "";
        if (categoryBox) categoryBox.textContent = "";
      }
    });
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const brandItems = document.querySelectorAll(".Kategorije ul li");
    brandItems.forEach(item => {
      item.addEventListener("click", () => {
        const brand = item.textContent.trim();
        updateProductImages(brand);
      });
    });
  });
  