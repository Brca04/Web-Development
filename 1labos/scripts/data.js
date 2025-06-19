const data = {
  website: "AutiG",
  categories: [
    {
      name: "Audi",
      products: [
        { name: "A5", image: "images/autiG/a5.jpg" },
        { name: "R8", image: "images/autiG/r8.jpg" },
        { name: "TTRS", image: "images/autiG/tt.jpg" },
        { name: "RS6", image: "images/autiG/rs6.jpg" },
        { name: "RS3", image: "images/autiG/rs3.jpg" },
      ],
    },
    {
      name: "Alfa&Romeo",
      products: [
        { name: "Gulia Plava", image: "images/autiG/gulia1.jpg" },
        { name: "Gulia Crna", image: "images/autiG/gulia2.jpg" },
        { name: "Spyder Bijeli", image: "images/autiG/spyder.jpg" },
        { name: "Spyder Crveni", image: "images/autiG/spyder2.jpg" },
        { name: "Mito", image: "images/autiG/mito.jpg" },
      ],
    },
    {
      name: "BMW",
      products: [
        { name: "320d", image: "images/autiG/320d.jpg" },
        { name: "520d", image: "images/autiG/520d.jpg" },
        { name: "M3", image: "images/autiG/m3.jpg" },
        { name: "M4", image: "images/autiG/m4.jpg" },
        { name: "X5", image: "images/autiG/x5.jpg" },
      ],
    },
    {
      name: "Ferrari",
      products: [
        { name: "360 Modena", image: "images/autiG/ferrari1.jpg" },
        { name: "458 Italia", image: "images/autiG/ferrari2.jpg" },
        { name: "496 GTB", image: "images/autiG/ferrari3.jpg" },
        { name: "F40", image: "images/autiG/ferrari4.jpg" },
        { name: "488 GTB", image: "images/autiG/ferrari5.jpg" },
      ],
    },
    {
      name: "Hyundai",
      products: [
        { name: "I10", image: "images/autiG/i10.jpg" },
        { name: "I30", image: "images/autiG/i30.jpg" },
        { name: "Kona", image: "images/autiG/kona.jpg" },
        { name: "Santa Fe", image: "images/autiG/santafe.jpg" },
        { name: "Tucson", image: "images/autiG/tuscon.jpg" },
      ],
    },
    {
      name: "Lamborghini",
      products: [
        { name: "Aventador", image: "images/autiG/lambo2.jpg" },
        { name: "Huracan", image: "images/autiG/lambo1.jpg" },
        { name: "Huracan STO", image: "images/autiG/lambo3.jpg" },
        { name: "Huracan EVO", image: "images/autiG/lambo4.jpg" },
        { name: "Urus", image: "images/autiG/lambo5.jpg" },
      ],
    },
    {
      name: "Mercedes&Benz",
      products: [
        { name: "C200", image: "images/autiG/c200.jpg" },
        { name: "E200d", image: "images/autiG/e200d.jpg" },
        { name: "S400d", image: "images/autiG/S400d.jpg" },
        { name: "AMG GT", image: "images/autiG/Amggt.jpg" },
        { name: "G450d", image: "images/autiG/gklasa.jpg" },
      ],
    },
    {
      name: "Toyota",
      products: [
        { name: "Yaris", image: "images/autiG/yaris.jpg" },
        { name: "Rav4", image: "images/autiG/rav4.jpg" },
        { name: "Land Cruiser", image: "images/autiG/landcruiser.jpg" },
        { name: "GR86", image: "images/autiG/gr86.jpg" },
        { name: "Supra", image: "images/autiG/supra.jpg" },
      ],
    },
    {
      name: "Volvo",
      products: [
        { name: "S60", image: "images/autiG/s60.jpg" },
        { name: "S90", image: "images/autiG/s90.jpg" },
        { name: "XC40E", image: "images/autiG/xc40e.jpg" },
        { name: "XC60", image: "images/autiG/xc60.jpg" },
        { name: "XC90", image: "images/autiG/xc90.jpg" },
      ],
    },
    {
      name: "VW",
      products: [
        { name: "Golf 7 GTI Bijeli", image: "images/autiG/golf.jpg" },
        { name: "Golf 7.5 GTI", image: "images/autiG/golf2.jpg" },
        { name: "Passat", image: "images/autiG/passat.jpg" },
        { name: "Tiguan", image: "images/autiG/tiguan.jpg" },
        { name: "Polo GTI", image: "images/autiG/polo.jpg" },
      ],
    },
  ],
};

let zadnjaAktivna = null;

document.addEventListener("DOMContentLoaded", () => {
  const kategorije = Array.from(document.querySelectorAll("li[id^='kat-']"));

  azurirajHeaderBrojac();
  azurirajHeaderBrojac2();

  if (window.location.pathname.includes("cart.html")) {
    prikaziKosaricu();
  }

  kategorije.forEach((katEl, index) => {
    katEl.addEventListener("click", () => {
      prikaziKategoriju(index, katEl);
    });
  });

  // Pre-render all categories to warm up the DOM and cache
  setTimeout(() => {
    const preloadContainer = document.getElementById("preload-container");
    if (!preloadContainer) return;
    data.categories.forEach((category, index) => {
      // Create temporary elements for each product slot
      for (let i = 0; i < 5; i++) {
        const tempIme = document.createElement("div");
        tempIme.className = `ime${i + 1}`;
        const tempSlika = document.createElement("div");
        tempSlika.className = `Slika${i + 1}`;
        const tempBrand = document.createElement("div");
        tempBrand.className = "KategorijaEl";
        preloadContainer.appendChild(tempIme);
        preloadContainer.appendChild(tempSlika);
        preloadContainer.appendChild(tempBrand);
      }
      prikaziProizvode(category.products, category.name);
      // Clean up for next category
      preloadContainer.innerHTML = "";
    });
  }, 0);
}); 

document.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("plus-btn") ||
    e.target.classList.contains("minus-btn")
  ) {
    const id = e.target.getAttribute("data-id");
    let kosarica = JSON.parse(localStorage.getItem("kosarica")) || [];
    const item = kosarica.find((i) => i.name + i.kategorija === id);

    if (!item) return;

    if (e.target.classList.contains("plus-btn")) {
      item.kolicina += 1;
    } else if (e.target.classList.contains("minus-btn")) {
      if (item.kolicina > 1) {
        item.kolicina -= 1;
      } else {
        kosarica = kosarica.filter((i) => i.name + i.kategorija !== id);
      }
    }

    localStorage.setItem("kosarica", JSON.stringify(kosarica));
    prikaziKosaricu();
    azurirajHeaderBrojac2();
  }
});

function prikaziKategoriju(index, katEl) {
  if (zadnjaAktivna) zadnjaAktivna.style.backgroundColor = "#585652";
  katEl.style.backgroundColor = "#3a3936";
  zadnjaAktivna = katEl;

  const kategorija = data.categories[index];
  prikaziNazivKategorije(kategorija.name);
  prikaziProizvode(kategorija.products, kategorija.name);
}

function prikaziNazivKategorije(naziv) {
  const prikaz = document.querySelector(".TrenutnoGrid");
  if (prikaz) prikaz.textContent = naziv;
  const prodaja = document.querySelector(".FlexProdaja");
  if (prodaja) prodaja.style.display = "flex";
}

function prikaziProizvode(proizvodi, kategorija) {
  for (let i = 0; i < 5; i++) {
    const imeEl = document.querySelector(`.ime${i + 1}`);
    const slikaEl = document.querySelector(`.Slika${i + 1}`);
    const brandEl = document.querySelectorAll(".KategorijaEl")[i];

    const proizvod = proizvodi[i];

    if (imeEl && slikaEl && brandEl && proizvod) {
      postaviIme(imeEl, proizvod.name);
      postaviSliku(slikaEl, proizvod.image, proizvod.name);
      postaviBrand(brandEl, kategorija);
    }
  }

  setTimeout(() => {
    document.querySelectorAll(".CartImg").forEach((cartIcon, index) => {
      cartIcon.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevents bubbling if needed
        const proizvod = proizvodi[index];
        dodajUKosaricu(kategorija, proizvod);
      });

      const proizvod = proizvodi[index];
      azurirajBrojac(proizvod.name, kategorija);
    });
  }, 0);
}

function postaviIme(element, naziv) {
  element.textContent = naziv;
  element.style.fontSize = "30px";
}

function postaviSliku(element, imageUrl, altText) {
  element.innerHTML = `
    <div class="CartImg" data-ime="${altText}" style="position: relative;">
      <img src="${imageUrl}" alt="${altText}" style="width: 100%; display: block;">
      <span class="Brojac"></span>
      <img src="images/shopping_cart_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png" 
           alt="Cart" 
           class="CartIconImg">
    </div>
  `;
}

function postaviBrand(element, nazivBranda) {
  element.textContent = nazivBranda;
}

function dodajUKosaricu(kategorija, proizvod) {
  let kosarica = JSON.parse(localStorage.getItem("kosarica")) || [];

  const postoji = kosarica.find(
    (item) => item.name === proizvod.name && item.kategorija === kategorija
  );

  if (postoji) {
    postoji.kolicina++;
  } else {
    kosarica.push({
      name: proizvod.name,
      image: proizvod.image,
      kategorija: kategorija,
      kolicina: 1,
    });
  }

  localStorage.setItem("kosarica", JSON.stringify(kosarica));
  azurirajHeaderBrojac();
  azurirajHeaderBrojac2();
  azurirajBrojac(proizvod.name, kategorija);
}

function prikaziKosaricu() {
  const kosarica = JSON.parse(localStorage.getItem("kosarica")) || [];
  const stanjeDiv = document.querySelector(".StanjeFlex");

  if (!stanjeDiv) return;

  if (kosarica.length === 0) {
    stanjeDiv.innerHTML = "<p>Košarica je prazna.</p>";
    return;
  }

  stanjeDiv.innerHTML = "";

  kosarica.forEach((item) => {
    // Create row container (vertical)
    const row = document.createElement("div");
    row.className = "CartRow CartRowCustom";

    // Top: image + name
    const top = document.createElement("div");
    top.className = "CartRowTop";
    top.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="CartRowImg">
      <div>
        <div class="CartRowName">${item.name}</div>
        <div class="CartRowCategory">${item.kategorija}</div>
      </div>
    `;

    // Bottom: quantity controls
    const bottom = document.createElement("div");
    bottom.className = "CartRowBottom";
    bottom.innerHTML = `
      <button class="minus-btn CartRowBtn" data-id="${
        item.name + item.kategorija
      }">-</button>
      <span class="CartRowQty">${item.kolicina}</span>
      <button class="plus-btn CartRowBtn" data-id="${
        item.name + item.kategorija
      }">+</button>
    `;

    row.appendChild(top);
    row.appendChild(bottom);
    stanjeDiv.appendChild(row);
  });
}

function azurirajBrojac(imeProizvoda, kategorija) {
  const kosarica = JSON.parse(localStorage.getItem("kosarica")) || [];
  const proizvod = kosarica.find(
    (item) => item.name === imeProizvoda && item.kategorija === kategorija
  );

  const sviCartImg = document.querySelectorAll(".CartImg");
  sviCartImg.forEach((cart) => {
    const dataIme = cart.getAttribute("data-ime");
    const brojacEl = cart.querySelector(".Brojac");

    if (dataIme === imeProizvoda && brojacEl) {
      if (proizvod && proizvod.kolicina > 0) {
        brojacEl.textContent = proizvod.kolicina;
        Object.assign(brojacEl.style, {
          position: "absolute",
          top: "8%",
          right: "5%",
          width: "20px",
          height: "25px",
          borderRadius: "50%",
          fontSize: "15px",
          backgroundColor: "black",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "bold",
        });
      } else {
        brojacEl.style.display = "none";
      }
    }
  });
}

function azurirajHeaderBrojac() {
  const kosarica = JSON.parse(localStorage.getItem("kosarica")) || [];
  const headerBrojac = document.getElementById("HeaderBrojac");
  const ukupno = kosarica.reduce((sum, item) => sum + item.kolicina, 0);

  if (headerBrojac) {
    if (ukupno > 0) {
      headerBrojac.classList.add("active");
      headerBrojac.textContent = ukupno;
    } else {
      headerBrojac.classList.remove("active");
    }
  }
}

function azurirajHeaderBrojac2() {
  const kosarica = JSON.parse(localStorage.getItem("kosarica")) || [];
  const headerBrojac = document.getElementById("HeaderBrojac2");
  const ukupno = kosarica.reduce((sum, item) => sum + item.kolicina, 0);

  if (headerBrojac) {
    if (ukupno > 0) {
      headerBrojac.classList.add("active");
      headerBrojac.textContent = ukupno;
    } else {
      headerBrojac.classList.remove("active");
    }
  }
}

function preloadCategoryImages() {
  if (!window.data || !data.categories) return;
  data.categories.forEach(category => {
    if (category.products) {
      category.products.forEach(product => {
        if (product.image) {
          const img = new Image();
          img.src = product.image;
        }
      });
    }
  });
}

// Call this once after data is loaded
preloadCategoryImages();
