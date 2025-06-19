document.addEventListener("DOMContentLoaded", () => {
  const brojacId = document.getElementById("HeaderBrojac") || document.getElementById("HeaderBrojac2");

  function updateCartCount(change) {
    if (brojacId) {
      let count = parseInt(brojacId.textContent) || 0;
      brojacId.textContent = count + change;
    }
  }

  document.querySelectorAll(".cartSellIcon").forEach(icon => {
    icon.addEventListener("click", () => {
      const id = icon.dataset.id;
      fetch(`/cart/add/${id}`, { method: "POST" }).then(res => {
        if (res.ok) {
          updateCartCount(1);
          const counter = document.getElementById(`product-counter-${id}`);
          if (counter) {
            let val = parseInt(counter.textContent) || 0;
            val += 1;
            counter.textContent = val;
            counter.style.display = "inline-block";
            counter.classList.remove("zero");
          }
        }
      });
    });
  });

  document.querySelectorAll(".plus-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      fetch(`/cart/add/${id}`, { method: "POST" }).then(res => {
        if (res.ok) {
          const kolicinaEl = document.getElementById(`kolicina-${id}`);
          if (kolicinaEl) {
            let val = parseInt(kolicinaEl.textContent) || 0;
            kolicinaEl.textContent = val + 1;
            updateCartCount(1);
          }
        }
      });
    });
  });

  document.querySelectorAll(".minus-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const kolicinaEl = document.getElementById(`kolicina-${id}`);
      if (kolicinaEl) {
        let val = parseInt(kolicinaEl.textContent) || 0;
        if (val > 1) {
          fetch(`/cart/remove/${id}`, { method: "POST" }).then(res => {
            if (res.ok) {
              kolicinaEl.textContent = val - 1;
              updateCartCount(-1);
            }
          });
        } else if (val === 1) {
          fetch(`/cart/remove/${id}`, { method: "POST" }).then(res => {
            if (res.ok) {
              kolicinaEl.closest(".Stanje").remove();
              updateCartCount(-1);
            }
          });
        }
      }
    });
  });

});
