
import React, { useState } from "react";
import "./App.css";

const products = [
  { id: 1, name: "Nike Air Max", price: 120, category: "Обувь", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600" },
  { id: 2, name: "Classic Hoodie", price: 65, category: "Одежда", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600" },
  { id: 3, name: "Urban Watch", price: 90, category: "Аксессуары", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600" },
  { id: 4, name: "Street Sneakers", price: 110, category: "Обувь", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600" },
  { id: 5, name: "Black T-Shirt", price: 35, category: "Одежда", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600" },
  { id: 6, name: "Modern Backpack", price: 55, category: "Аксессуары", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600" },
  { id: 7, name: "White Sneakers", price: 95, category: "Обувь", image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=600" },
  { id: 8, name: "Premium Jacket", price: 150, category: "Одежда", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600" }
];

function App() {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Все");
  const [page, setPage] = useState("home");
  const [selected, setSelected] = useState(null);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === "Все" || p.category === category)
  );

  const addCart = (product) => {
    setCart(old => [...old, product]);
  };

  const toggleFavorite = (id) => {
    setFavorites(old =>
      old.includes(id) ? old.filter(x => x !== id) : [...old, id]
    );
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo" onClick={() => setPage("home")}>NOVIX<span>.</span></div>

        <div className="nav-links">
          <button onClick={() => setPage("home")}>Главная</button>
          <button onClick={() => setPage("catalog")}>Каталог</button>
          <button onClick={() => setPage("favorites")}>❤️ Избранное {favorites.length}</button>
          <button onClick={() => setPage("cart")}>🛒 Корзина {cart.length}</button>
        </div>
      </nav>

      {page === "home" && (
        <>
          <section className="hero">
            <div className="hero-text">
              <span className="small-label">NEW COLLECTION 2026</span>
              <h1>ТВОЙ СТИЛЬ.<br /><span>ТВОИ ПРАВИЛА.</span></h1>
              <p>Открой для себя коллекцию современной одежды, обуви и аксессуаров.</p>
              <button className="primary-btn" onClick={() => setPage("catalog")}>
                Смотреть каталог →
              </button>
            </div>
            <div className="hero-image">
              <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1000" />
            </div>
          </section>

          <section className="benefits">
            <div>🚚 <b>Быстрая доставка</b><small>Доставка по Кыргызстану</small></div>
            <div>💎 <b>Высокое качество</b><small>Проверенные товары</small></div>
            <div>🔒 <b>Безопасный заказ</b><small>Удобное оформление</small></div>
          </section>
        </>
      )}

      {(page === "home" || page === "catalog") && (
        <main className="catalog">
          <div className="heading">
            <div>
              <span className="small-label">NOVIX STORE</span>
              <h2>{page === "home" ? "Популярные товары" : "Наш каталог"}</h2>
            </div>
            <span>{filtered.length} товаров</span>
          </div>

          <input
            className="search"
            placeholder="🔍 Найти товар..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <div className="filters">
            {["Все", "Одежда", "Обувь", "Аксессуары"].map(c => (
              <button
                key={c}
                className={category === c ? "active" : ""}
                onClick={() => setCategory(c)}
              >{c}</button>
            ))}
          </div>

          <div className="products">
            {filtered.map(product => (
              <div className="product" key={product.id}>
                <div className="product-image" onClick={() => { setSelected(product); setPage("detail"); }}>
                  <img src={product.image} alt={product.name} />
                  <span className="product-category">{product.category}</span>
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <div className="product-bottom">
                    <b>${product.price}</b>
                    <button className="favorite" onClick={() => toggleFavorite(product.id)}>
                      {favorites.includes(product.id) ? "❤️" : "🤍"}
                    </button>
                  </div>
                  <button className="add-btn" onClick={() => addCart(product)}>
                    + В корзину
                  </button>
                  <button className="detail-btn" onClick={() => { setSelected(product); setPage("detail"); }}>
                    Подробнее
                  </button>
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && <p className="empty">Товары не найдены 😔</p>}
        </main>
      )}

      {page === "detail" && selected && (
        <section className="detail">
          <button className="back-btn" onClick={() => setPage("catalog")}>← Назад</button>
          <img src={selected.image} alt={selected.name} />
          <div>
            <span className="small-label">{selected.category}</span>
            <h1>{selected.name}</h1>
            <h2>${selected.price}</h2>
            <p>Стильный и качественный товар из коллекции NOVIX. Отличный выбор для повседневного образа.</p>
            <button className="primary-btn" onClick={() => addCart(selected)}>Добавить в корзину</button>
            <button className="detail-btn" onClick={() => toggleFavorite(selected.id)}>
              {favorites.includes(selected.id) ? "❤️ В избранном" : "♡ В избранное"}
            </button>
          </div>
        </section>
      )}

      {page === "favorites" && (
        <main className="catalog">
          <h2> Избранное</h2>
          <div className="products">
            {products.filter(p => favorites.includes(p.id)).map(product => (
              <div className="product" key={product.id}>
                <div className="product-image"><img src={product.image} alt={product.name} /></div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <b>${product.price}</b>
                  <button className="add-btn" onClick={() => addCart(product)}>+ В корзину</button>
                  <button className="detail-btn" onClick={() => toggleFavorite(product.id)}>Убрать ❤️</button>
                </div>
              </div>
            ))}
          </div>
          {favorites.length === 0 && <p className="empty">Пока нет избранных товаров.</p>}
        </main>
      )}

      {page === "cart" && (
        <main className="cart-page">
          <h2>🛒 Моя корзина</h2>
          {cart.map((item, index) => (
            <div className="cart-item" key={index}>
              <img src={item.image} alt={item.name} />
              <b>{item.name}</b>
              <span>${item.price}</span>
              <button onClick={() => setCart(old => old.filter((_, i) => i !== index))}>✕</button>
            </div>
          ))}
          {cart.length === 0 ? <p className="empty">Корзина пока пуста.</p> : (
            <div className="cart-total">
              <h2>Итого: ${total}</h2>
              <button className="primary-btn" onClick={() => setPage("checkout")}>Оформить заказ →</button>
            </div>
          )}
        </main>
      )}

      {page === "checkout" && (
        <main className="checkout">
          <h2>Оформление заказа</h2>
          <p>Товаров: {cart.length}</p>
          <h2>Итого: ${total}</h2>
          <input placeholder="Ваше имя" />
          <input placeholder="Номер телефона" />
          <input placeholder="Адрес доставки" />
          <button className="primary-btn" onClick={() => {
            alert("Демо-заказ оформлен! Спасибо за покупку ❤️");
            setCart([]);
            setPage("home");
          }}>Подтвердить заказ</button>
        </main>
      )}

      <footer>
        <h2>NOVIX<span>.</span></h2>
        <p>Твой стиль начинается здесь.</p>
        <small>© 2026 NOVIX STORE</small>
      </footer>
    </div>
  );
}

export default App;

