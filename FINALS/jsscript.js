let cart = [];

function showCategory(id) {
  document.querySelectorAll('.category').forEach(cat => {
    cat.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
}

function addToCart(name, price) {
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  updateCartDisplay();
}

function updateCartDisplay() {
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  document.getElementById('cart-count').textContent = cartCount;
  document.getElementById('cart-total').textContent = total.toFixed(2);

  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = '';
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} x${item.quantity} - ₱${(item.price * item.quantity).toFixed(2)}`;
    cartItems.appendChild(li);
  });
}

function toggleCart() {
  const panel = document.getElementById('cart-panel');
  if (panel.style.display === 'none' || panel.style.display === '') {
    panel.style.display = 'block';
    panel.style.animation = 'slideDown 0.3s ease-out';
  } else {
    panel.style.animation = 'fadeOut 0.2s ease-in-out';
    setTimeout(() => {
      panel.style.display = 'none';
    }, 200);
  }
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("Checkout complete! Thank you for your purchase.");
  cart = [];
  updateCartDisplay();
  document.getElementById('cart-panel').style.display = 'none';
}

const itemDescriptions = {
  "250 PokéCoins": "Use 250 PokéCoins to buy premium items like Poké Balls, Incense, and more.",
  "600 PokéCoins": "A medium amount of PokéCoins to give you an advantage in your journey.",
  "1,300 PokéCoins": "Enough PokéCoins for multiple upgrades or item purchases.",
  "2,700 PokéCoins": "A large amount of PokéCoins to fully equip your Pokémon GO experience.",
  "5,600 PokéCoins": "A substantial amount of PokéCoins to ensure you have everything you need.",
  "15,500 PokéCoins": "A extreme large amount of PokéCoins to get you started on your Pokémon journey.",
  "Starter Bundle": "Includes: 10 Poké Balls, 2 Lucky Eggs, 2 Incense, and 1 Remote Raid Pass.",
  "Quaxly Community Day Ultra Ticket": "Includes: 5 Ultra Balls and 1 Ticket.",
  "Water Festival Ultra Ticket": "Includes: 1 Star Piece and 1 Ticket.",
  "G-MAX Lapras Max Battle Day Ultra Ticket": "Includes: 1 Max Particle Pack and 1 Ticket.",
  "Lucky Egg Pack": "Includes 8 Lucky Eggs to double your XP gain for 30 minutes.",
  "Star Piece": "Includes 8 Star Pieces to boost your XP gain for 30 minutes.",
  "Remote Raid Pass": "Allows you to join raids remotely, no need to be at the location. Includes 2 Remote Raid Pass.",
  "Pokemon Storage": "Increases your Pokémon storage by 100 slots, allowing you to catch and store more Pokémon.",
  "Item Bag": "Increases your item bag capacity by 50 slots, so you can carry more items.",
  "Egg Incubator": "A reusable incubator that allows you to hatch eggs without consuming a charge. Includes 3 Egg Incubator.",
  "Super Egg Incubator": "A special incubator that hatches eggs faster than a regular incubator. Includes 2 Super Egg Incubator.",
  "Max Revive": "Restores the HP of a Pokémon to full, including status conditions. Includes 6 Max Revive.",
  "Premium Battle Pass": "A special pass that allows you to join premium raids with exclusive rewards. Includes 3 Premium Battle Pass.",
  "Max Particle Pack": "A pack that includes 5 Max Particles to enhance your Pokémon's abilities in battles. Includes 6 Max Particle.",
  "Max Mushroom": "A pack that includes 5 Max Mushrooms to enhance your Pokémon's abilities in battles. Includes 3 Max Mushroom.",
};

function showDetails(card) {
  const title = card.querySelector('h3').innerText;
  const image = card.querySelector('img').src;
  const price = card.querySelector('p').innerText;
  const description = itemDescriptions[title] || 'This item includes exclusive bonuses to enhance your Pokémon GO experience.';

  document.getElementById('modal-title').innerText = title;
  document.getElementById('modal-image').src = image;
  document.getElementById('modal-price').innerText = price;
  document.getElementById('modal-description').innerText = description;

  document.getElementById('item-modal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('item-modal').style.display = 'none';
}

const famousPokemon = [
  { name: "Pikachu", gen: 1, img: "./Pokemon_Pikachu_art.png" },
  { name: "Charizard", gen: 1, img: "./charizard2.png" },
  { name: "Lucario", gen: 4, img: "./lucario.png" },
  { name: "Greninja", gen: 6, img: "./greninja2.png" },
  { name: "Garchomp", gen: 4, img: "./garch.png" },
  { name: "Gardevoir", gen: 3, img: "./gardevoir2.png" }
];

const pokemonContainer = document.getElementById("pokemon-carousel");
const searchBox = document.getElementById("search-box");

function renderPokemonList(list) {
  pokemonContainer.innerHTML = "";
  list.forEach(p => {
    const card = document.createElement("div");
    card.className = "pokemon-card";
    const img = document.createElement("img");
    img.src = p.img;
    img.alt = p.name;
    const name = document.createElement("p");
    name.textContent = `${p.name} (Gen ${p.gen})`;
    card.appendChild(img);
    card.appendChild(name);
    pokemonContainer.appendChild(card);
  });
}

if (searchBox) {
  searchBox.addEventListener("input", () => {
    const query = searchBox.value.toLowerCase();
    const filtered = famousPokemon.filter(p => p.name.toLowerCase().includes(query));
    renderPokemonList(filtered);
  });
}

renderPokemonList(famousPokemon);

const carousel = document.getElementById("carousel");
const slides = document.querySelectorAll(".carousel-slide");
const nextBtn = document.querySelector(".carousel-nav.next");
const prevBtn = document.querySelector(".carousel-nav.prev");
let index = 0;

function updateCarousel() {
  if (carousel) {
    carousel.scrollTo({ left: index * window.innerWidth, behavior: 'smooth' });
  }
}

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    index = (index + 1) % slides.length;
    updateCarousel();
  });
}

if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length;
    updateCarousel();
  });
}

const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("username").value;
    const trainerData = {
      name: name,
      level: Math.floor(Math.random() * 40) + 1,
      team: ["Mystic", "Valor", "Instinct"][Math.floor(Math.random() * 3)],
      coins: Math.floor(Math.random() * 5000)
    };

    document.getElementById("trainer-name").textContent = `Name: ${trainerData.name}`;
    document.getElementById("trainer-level").textContent = `Level: ${trainerData.level}`;
    document.getElementById("trainer-team").textContent = `Team: ${trainerData.team}`;
    document.getElementById("trainer-coins").textContent = `PokéCoins: ${trainerData.coins}`;

    index = 0;
    updateCarousel();
  });
}

const goRegister = document.getElementById("go-register");
if (goRegister) {
  goRegister.addEventListener("click", (e) => {
    e.preventDefault();
    index = 2;
    updateCarousel();
  });
}

const goLogin = document.getElementById("go-login");
if (goLogin) {
  goLogin.addEventListener("click", (e) => {
    e.preventDefault();
    index = 1; 
    updateCarousel();
  });
}

function toggleShop() {
  const homepage = document.getElementById('homepage-content');
  const shop = document.getElementById('shop-content');
  const shopButton = document.querySelector('.shop-button');

  if (homepage.style.display !== 'none') {
    homepage.style.display = 'none';
    shop.style.display = 'block';
    shop.classList.add('active');
    shopButton.textContent = 'Go to Homepage';
  } else {
    homepage.style.display = 'block';
    shop.style.display = 'none';
    shop.classList.remove('active');
    shopButton.textContent = 'Go to Shop';
  }
}


document.addEventListener("DOMContentLoaded", function () {
  const slides = [
    document.querySelector(".slide-one"),
    document.querySelector(".slide-two"),
    document.querySelector(".slide-three"),
  ];

  let currentSlide = 0;

  const showSlide = (idx) => {
    slides.forEach((slide, i) => {
      if (i === idx) {
        slide.classList.add("fade-in");
        slide.classList.remove("fade-out");
      } else {
        slide.classList.remove("fade-in");
        slide.classList.add("fade-out");
      }
    });
  };

  const nextButton = document.querySelector(".next");
  if (nextButton) {
    nextButton.addEventListener("click", () => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    });
  }

  const prevButton = document.querySelector(".prev");
  if (prevButton) {
    prevButton.addEventListener("click", () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    });
  }


  if (slides.length > 0) {
    showSlide(currentSlide);
  }
});

document.addEventListener("DOMContentLoaded", function () {
    const aboutSlides = [
      document.querySelector(".slide-one"),
      document.querySelector(".slide-two"),
      document.querySelector(".slide-three"),
    ];

    let aboutIndex = 0;

    function showAboutSlide(index) {
      aboutSlides.forEach((slide, i) => {
        if (i === index) {
          slide.classList.add("fade-in");
          slide.classList.remove("fade-out");
        } else {
          slide.classList.remove("fade-in");
          slide.classList.add("fade-out");
        }
      });
    }

    const aboutNext = document.getElementById("about-next");
    const aboutPrev = document.getElementById("about-prev");

    if (aboutNext && aboutPrev) {
      aboutNext.addEventListener("click", () => {
        aboutIndex = (aboutIndex + 1) % aboutSlides.length;
        showAboutSlide(aboutIndex);
      });

      aboutPrev.addEventListener("click", () => {
        aboutIndex = (aboutIndex - 1) % aboutSlides.length;
        showAboutSlide(aboutIndex);
      });
    }

    showAboutSlide(aboutIndex);
  });