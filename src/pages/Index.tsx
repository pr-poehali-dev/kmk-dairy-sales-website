import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const MEADOW_IMG = "https://cdn.poehali.dev/projects/5f76888b-15da-428a-92be-3ece21533d69/files/77abb560-86d7-4cb4-b93e-8650b6e3bbc3.jpg";
const PRODUCTS_IMG = "https://cdn.poehali.dev/projects/5f76888b-15da-428a-92be-3ece21533d69/files/4ac272f2-2b6c-47eb-9158-98700a191569.jpg";
const LOGO_IMG = "https://kumk.ru/wp-content/uploads/2021/02/logo-kumk-official.png";

const products = [
  {
    id: 1,
    name: "Молоко цельное",
    type: "Молоко",
    price: 89,
    shelf: 7,
    img: "🥛",
    fat: "3,2%",
    desc: "Натуральное пастеризованное молоко с горных лугов Дагестана",
    badge: "Хит продаж",
  },
  {
    id: 2,
    name: "Кефир классический",
    type: "Кефир",
    price: 79,
    shelf: 14,
    img: "🫙",
    fat: "2,5%",
    desc: "Живой кефир на натуральных заквасках, мягкий вкус",
    badge: null,
  },
  {
    id: 3,
    name: "Сметана домашняя",
    type: "Сметана",
    price: 149,
    shelf: 21,
    img: "🥄",
    fat: "20%",
    desc: "Густая натуральная сметана, идеальна для салатов и выпечки",
    badge: "Новинка",
  },
  {
    id: 4,
    name: "Творог зернистый",
    type: "Творог",
    price: 199,
    shelf: 10,
    img: "🧀",
    fat: "5%",
    desc: "Рассыпчатый творог из свежего молока, богат белком",
    badge: null,
  },
  {
    id: 5,
    name: "Масло сливочное",
    type: "Масло",
    price: 249,
    shelf: 30,
    img: "🧈",
    fat: "82,5%",
    desc: "Настоящее сливочное масло, без растительных жиров",
    badge: "Фермерское",
  },
  {
    id: 6,
    name: "Молоко топлёное",
    type: "Молоко",
    price: 109,
    shelf: 5,
    img: "☕",
    fat: "4%",
    desc: "Томлёное 8 часов молоко с неповторимым карамельным вкусом",
    badge: null,
  },
  {
    id: 7,
    name: "Ряженка",
    type: "Кефир",
    price: 89,
    shelf: 10,
    img: "🫗",
    fat: "3,2%",
    desc: "Ряженка из топлёного молока — нежная и ароматная",
    badge: null,
  },
  {
    id: 8,
    name: "Сметана 30%",
    type: "Сметана",
    price: 179,
    shelf: 21,
    img: "🥄",
    fat: "30%",
    desc: "Жирная сметана для борща и блинов — как у бабушки",
    badge: null,
  },
];

const types = ["Все", "Молоко", "Кефир", "Сметана", "Творог", "Масло"];

type Section = "home" | "catalog" | "about" | "contacts";

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [filterType, setFilterType] = useState("Все");
  const [priceRange, setPriceRange] = useState(300);
  const [shelfFilter, setShelfFilter] = useState("Все");
  const [menuOpen, setMenuOpen] = useState(false);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);

  useEffect(() => {
    if (activeSection === "catalog") {
      const timer = setTimeout(() => {
        setVisibleCards(products.map((p) => p.id));
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setVisibleCards([]);
    }
  }, [activeSection]);

  const filtered = products.filter((p) => {
    const byType = filterType === "Все" || p.type === filterType;
    const byPrice = p.price <= priceRange;
    const byShelf =
      shelfFilter === "Все"
        ? true
        : shelfFilter === "до 7 дней"
        ? p.shelf <= 7
        : shelfFilter === "до 14 дней"
        ? p.shelf <= 14
        : p.shelf > 14;
    return byType && byPrice && byShelf;
  });

  const navItems: { id: Section; label: string }[] = [
    { id: "home", label: "Главная" },
    { id: "catalog", label: "Каталог" },
    { id: "about", label: "О продукции" },
    { id: "contacts", label: "Контакты" },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fdf8ed" }}>
      {/* NAVBAR */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 shadow-sm"
        style={{ backgroundColor: "rgba(253,248,237,0.97)", backdropFilter: "blur(10px)" }}
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setActiveSection("home")}
            className="flex items-center gap-2 group"
          >
            <img
              src={LOGO_IMG}
              alt="КуМК"
              className="h-12 w-auto object-contain"
              style={{ maxWidth: "140px" }}
            />
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`nav-link text-sm font-medium transition-colors ${
                  activeSection === item.id ? "active" : ""
                }`}
                style={{ color: activeSection === item.id ? "#2d6a3f" : "#5c3d1e" }}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => setActiveSection("contacts")}
              className="px-5 py-2 rounded-full text-sm font-semibold transition-all hover:shadow-lg"
              style={{ background: "linear-gradient(135deg, #2d6a3f, #4a9c5f)", color: "white" }}
            >
              Заказать
            </button>
          </div>

          {/* Mobile menu */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ color: "#2d6a3f" }}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden px-4 pb-4 flex flex-col gap-2" style={{ backgroundColor: "#fdf8ed" }}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveSection(item.id); setMenuOpen(false); }}
                className="py-2 text-left font-medium text-sm border-b"
                style={{ color: "#2d6a3f", borderColor: "#e8d5a3" }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ======================== HOME ======================== */}
      {activeSection === "home" && (
        <div>
          {/* HERO */}
          <section className="relative min-h-screen flex items-center overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${MEADOW_IMG})` }}
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)" }} />

            {/* Floating decorations */}
            <div className="absolute top-28 right-16 text-5xl animate-float opacity-80 hidden md:block">🐄</div>
            <div className="absolute bottom-40 right-32 text-4xl animate-float opacity-60 delay-300 hidden md:block">🌿</div>
            <div className="absolute top-40 right-48 text-3xl animate-float opacity-70 delay-200 hidden md:block">🌸</div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-16">
              <div className="max-w-xl">
                <div
                  className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-6 animate-fade-in-up"
                  style={{ background: "rgba(232,168,37,0.9)", color: "white" }}
                >
                  🌿 С горных лугов Дагестана
                </div>
                <h1
                  className="text-5xl md:text-7xl font-bold leading-tight mb-6 animate-fade-in-up delay-100"
                  style={{ color: "white", fontFamily: "Cormorant, serif" }}
                >
                  Молоко,<br />
                  <span style={{ color: "#e8d5a3" }}>как раньше</span>
                </h1>
                <p
                  className="text-lg md:text-xl mb-8 leading-relaxed animate-fade-in-up delay-200"
                  style={{ color: "rgba(255,255,255,0.85)" }}
                >
                  Натуральная молочная продукция торговой марки <strong>КуМК</strong> — без консервантов, красителей и лишнего. Только чистое молоко и традиционные рецепты.
                </p>
                <div className="flex flex-wrap gap-4 animate-fade-in-up delay-300">
                  <button
                    onClick={() => setActiveSection("catalog")}
                    className="px-8 py-4 rounded-full text-base font-semibold shadow-lg transition-all hover:shadow-xl hover:scale-105"
                    style={{ background: "linear-gradient(135deg, #2d6a3f, #4a9c5f)", color: "white" }}
                  >
                    Смотреть каталог
                  </button>
                  <button
                    onClick={() => setActiveSection("about")}
                    className="px-8 py-4 rounded-full text-base font-semibold border-2 transition-all hover:bg-white hover:text-green-800"
                    style={{ borderColor: "white", color: "white" }}
                  >
                    О продукции
                  </button>
                </div>
              </div>
            </div>

            {/* Grass wave bottom */}
            <div className="absolute bottom-0 left-0 right-0" style={{ height: "60px", zIndex: 3 }}>
              <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
                <path d="M0,60 L0,30 Q60,0 120,30 Q180,60 240,30 Q300,0 360,30 Q420,60 480,30 Q540,0 600,30 Q660,60 720,30 Q780,0 840,30 Q900,60 960,30 Q1020,0 1080,30 Q1140,60 1200,30 Q1260,0 1320,30 Q1380,60 1440,30 L1440,60 Z" fill="#fdf8ed"/>
              </svg>
            </div>
          </section>

          {/* STATS */}
          <section className="py-16 max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: "🐄", val: "100%", label: "Натуральное молоко" },
                { icon: "🌿", val: "0", label: "Консервантов" },
                { icon: "📦", val: "8+", label: "Видов продукции" },
                { icon: "⭐", val: "15 лет", label: "На рынке" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="rounded-3xl p-6 text-center shadow-sm border"
                  style={{ backgroundColor: "white", borderColor: "#e8d5a3" }}
                >
                  <div className="text-4xl mb-2">{s.icon}</div>
                  <div className="text-2xl font-black" style={{ color: "#2d6a3f", fontFamily: "Cormorant, serif" }}>{s.val}</div>
                  <div className="text-sm mt-1" style={{ color: "#5c3d1e" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* FEATURED PRODUCTS */}
          <section className="py-8 max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-3" style={{ color: "#2d6a3f", fontFamily: "Cormorant, serif" }}>
                Популярное
              </h2>
              <p style={{ color: "#5c3d1e" }}>Любимые продукты наших покупателей</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {products.slice(0, 3).map((p) => (
                <div
                  key={p.id}
                  className="product-card rounded-3xl p-6 border cursor-pointer"
                  style={{ backgroundColor: "white", borderColor: "#e8d5a3" }}
                  onClick={() => setActiveSection("catalog")}
                >
                  <div className="text-6xl mb-4 text-center">{p.img}</div>
                  {p.badge && (
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2" style={{ background: "#e8a825", color: "white" }}>
                      {p.badge}
                    </span>
                  )}
                  <h3 className="text-xl font-bold mb-1" style={{ color: "#2d6a3f", fontFamily: "Cormorant, serif" }}>{p.name}</h3>
                  <p className="text-sm mb-3" style={{ color: "#5c3d1e", opacity: 0.8 }}>{p.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-black" style={{ color: "#2d6a3f" }}>{p.price} ₽</span>
                    <span className="text-xs" style={{ color: "#5c3d1e", opacity: 0.6 }}>жир: {p.fat}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <button
                onClick={() => setActiveSection("catalog")}
                className="px-8 py-3 rounded-full font-semibold border-2 transition-all hover:shadow-md"
                style={{ borderColor: "#2d6a3f", color: "#2d6a3f" }}
              >
                Весь каталог →
              </button>
            </div>
          </section>

          {/* ABOUT BANNER */}
          <section className="py-16 my-8 mx-4 md:mx-6 relative overflow-hidden rounded-3xl" style={{ background: "linear-gradient(135deg, #2d6a3f 0%, #1a4028 100%)" }}>
            <div
              className="absolute right-0 top-0 bottom-0 w-1/2 opacity-30 hidden md:block"
              style={{ backgroundImage: `url(${PRODUCTS_IMG})`, backgroundSize: "cover", backgroundPosition: "center" }}
            />
            <div className="relative z-10 max-w-6xl mx-auto px-8 md:px-16 py-4">
              <div className="max-w-lg">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "Cormorant, serif" }}>
                  Прямо с фермы — на ваш стол 🐄
                </h2>
                <p className="text-white mb-6" style={{ opacity: 0.85 }}>
                  Наши коровы пасутся на экологически чистых горных лугах Дагестана. Мы не добавляем консерванты — только свежее молоко и традиционные рецепты поколений.
                </p>
                <button
                  onClick={() => setActiveSection("about")}
                  className="px-6 py-3 rounded-full font-semibold transition-all hover:shadow-lg"
                  style={{ background: "#e8a825", color: "white" }}
                >
                  Узнать больше
                </button>
              </div>
            </div>
            <div className="absolute top-6 right-8 text-5xl hidden md:block">🌿</div>
            <div className="absolute bottom-6 right-24 text-4xl hidden md:block">🌸</div>
          </section>
        </div>
      )}

      {/* ======================== CATALOG ======================== */}
      {activeSection === "catalog" && (
        <div className="max-w-6xl mx-auto px-4 pt-28 pb-16">
          <div className="text-center mb-10">
            <img src={LOGO_IMG} alt="КуМК" className="h-16 w-auto object-contain mx-auto mb-4" />
            <h2 className="text-4xl md:text-5xl font-bold mb-2" style={{ color: "#2d6a3f", fontFamily: "Cormorant, serif" }}>
              Каталог продукции
            </h2>
            <p style={{ color: "#5c3d1e" }}>Свежая молочка с доставкой</p>
          </div>

          {/* FILTERS */}
          <div className="rounded-3xl p-6 mb-8 border" style={{ backgroundColor: "white", borderColor: "#e8d5a3" }}>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-3" style={{ color: "#5c3d1e" }}>
                  <Icon name="Filter" size={14} className="inline mr-1" />
                  Тип продукта
                </label>
                <div className="flex flex-wrap gap-2">
                  {types.map((t) => (
                    <button
                      key={t}
                      onClick={() => setFilterType(t)}
                      className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
                      style={
                        filterType === t
                          ? { background: "#2d6a3f", color: "white" }
                          : { background: "#f0eadc", color: "#5c3d1e" }
                      }
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3" style={{ color: "#5c3d1e" }}>
                  <Icon name="Tag" size={14} className="inline mr-1" />
                  Цена до {priceRange} ₽
                </label>
                <input
                  type="range"
                  min={50}
                  max={300}
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{ accentColor: "#2d6a3f" }}
                />
                <div className="flex justify-between text-xs mt-1" style={{ color: "#5c3d1e", opacity: 0.6 }}>
                  <span>50 ₽</span>
                  <span>300 ₽</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3" style={{ color: "#5c3d1e" }}>
                  <Icon name="Clock" size={14} className="inline mr-1" />
                  Срок хранения
                </label>
                <div className="flex flex-wrap gap-2">
                  {["Все", "до 7 дней", "до 14 дней", "более 14 дней"].map((s) => (
                    <button
                      key={s}
                      onClick={() => setShelfFilter(s)}
                      className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                      style={
                        shelfFilter === s
                          ? { background: "#e8a825", color: "white" }
                          : { background: "#f0eadc", color: "#5c3d1e" }
                      }
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* PRODUCTS GRID */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🐄</div>
              <p className="text-lg" style={{ color: "#5c3d1e" }}>Ничего не найдено. Попробуйте изменить фильтры.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {filtered.map((p, i) => (
                <div
                  key={p.id}
                  className="product-card rounded-3xl border flex flex-col"
                  style={{
                    backgroundColor: "white",
                    borderColor: "#e8d5a3",
                    opacity: visibleCards.includes(p.id) ? 1 : 0,
                    transform: visibleCards.includes(p.id) ? "translateY(0)" : "translateY(20px)",
                    transition: `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`,
                  }}
                >
                  <div
                    className="rounded-t-3xl p-6 text-center text-6xl"
                    style={{ background: "linear-gradient(135deg, #f0f8f0, #e8f5e8)" }}
                  >
                    {p.img}
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    {p.badge && (
                      <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold mb-2 self-start" style={{ background: "#e8a825", color: "white" }}>
                        {p.badge}
                      </span>
                    )}
                    <h3 className="font-bold mb-1" style={{ color: "#2d6a3f", fontFamily: "Cormorant, serif", fontSize: "18px" }}>
                      {p.name}
                    </h3>
                    <p className="text-xs leading-relaxed flex-1 mb-3" style={{ color: "#5c3d1e", opacity: 0.75 }}>
                      {p.desc}
                    </p>
                    <div className="flex items-center gap-2 mb-2 text-xs" style={{ color: "#5c3d1e", opacity: 0.7 }}>
                      <span>🧈 {p.fat}</span>
                      <span>·</span>
                      <span>📅 {p.shelf} дн.</span>
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-xl font-black" style={{ color: "#2d6a3f" }}>{p.price} ₽</span>
                      <button
                        onClick={() => setActiveSection("contacts")}
                        className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all hover:shadow-md"
                        style={{ background: "#2d6a3f", color: "white" }}
                      >
                        Заказать
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ======================== ABOUT ======================== */}
      {activeSection === "about" && (
        <div className="pt-24 pb-16">
          <div
            className="relative py-24 overflow-hidden"
            style={{ background: "linear-gradient(135deg, #1a4028 0%, #2d6a3f 100%)" }}
          >
            <div
              className="absolute inset-0 opacity-20"
              style={{ backgroundImage: `url(${MEADOW_IMG})`, backgroundSize: "cover", backgroundPosition: "center" }}
            />
            <div className="relative z-10 text-center px-6">
              <img src={LOGO_IMG} alt="КуМК" className="h-16 w-auto object-contain mx-auto mb-4" style={{ filter: "brightness(0) invert(1)" }} />
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-4" style={{ fontFamily: "Cormorant, serif" }}>
                О продукции КуМК
              </h2>
              <p className="text-lg max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.85)" }}>
                Мы верим, что молоко должно быть молоком. Без лишнего.
              </p>
            </div>
          </div>

          <div className="max-w-5xl mx-auto px-6 py-16">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  icon: "🌿",
                  title: "Без химии",
                  text: "Никаких консервантов, стабилизаторов и искусственных добавок. Только натуральные ингредиенты и традиционные технологии.",
                },
                {
                  icon: "🐄",
                  title: "Наши коровы",
                  text: "Стадо пасётся на экологически чистых горных лугах Дагестана. Коровы питаются свежей травой без гербицидов и пестицидов.",
                },
                {
                  icon: "🏔️",
                  title: "Горный воздух",
                  text: "Чистая вода горных родников, свежий воздух и традиционное пастбищное животноводство — основа качества КуМК.",
                },
                {
                  icon: "⚡",
                  title: "Свежесть",
                  text: "Производство и упаковка в один день. Доставка напрямую от производителя, без долгого хранения на складах.",
                },
                {
                  icon: "🧪",
                  title: "Контроль качества",
                  text: "Каждая партия проходит лабораторный контроль. Мы гарантируем соответствие всем нормам ГОСТ.",
                },
                {
                  icon: "👨‍👩‍👧",
                  title: "Семейное дело",
                  text: "ИП Магомедов Арсен Алиевич — семейный бизнес с 15-летней историей. Мы знаем каждую нашу корову по имени.",
                },
              ].map((v, i) => (
                <div
                  key={i}
                  className="rounded-3xl p-6 border"
                  style={{ backgroundColor: "white", borderColor: "#e8d5a3" }}
                >
                  <div className="text-4xl mb-3">{v.icon}</div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: "#2d6a3f", fontFamily: "Cormorant, serif" }}>
                    {v.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#5c3d1e", opacity: 0.85 }}>
                    {v.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-3xl overflow-hidden grid md:grid-cols-2 shadow-xl">
              <img src={PRODUCTS_IMG} alt="Продукция КуМК" className="w-full h-64 md:h-full object-cover" />
              <div className="p-8 md:p-12 flex flex-col justify-center" style={{ background: "linear-gradient(135deg, #2d6a3f, #1a4028)" }}>
                <h3 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "Cormorant, serif" }}>
                  История торговой марки
                </h3>
                <p className="text-white leading-relaxed mb-4" style={{ opacity: 0.85 }}>
                  КуМК — это сокращение, за которым стоит простая идея: кормить людей честно. Мы начали с небольшой семейной фермы и за 15 лет выросли в надёжного производителя натуральной молочной продукции.
                </p>
                <p className="text-white leading-relaxed" style={{ opacity: 0.85 }}>
                  Каждый продукт — это результат труда людей, которые любят своё дело и гордятся качеством.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================== CONTACTS ======================== */}
      {activeSection === "contacts" && (
        <div className="pt-24 pb-16 max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <img src={LOGO_IMG} alt="КуМК" className="h-16 w-auto object-contain mx-auto mb-4" />
            <h2 className="text-4xl md:text-5xl font-bold mb-3" style={{ color: "#2d6a3f", fontFamily: "Cormorant, serif" }}>
              Контакты
            </h2>
            <p style={{ color: "#5c3d1e" }}>Свяжитесь с нами для заказа или вопросов о продукции</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {[
                { icon: "👤", title: "Руководитель", val: "ИП Магомедов Арсен Алиевич" },
                { icon: "📱", title: "Телефон", val: "+7 (XXX) XXX-XX-XX" },
                { icon: "📧", title: "Email", val: "info@kumk.ru" },
                { icon: "📍", title: "Адрес", val: "Республика Дагестан" },
                { icon: "🕐", title: "Режим работы", val: "Пн–Пт: 8:00–18:00" },
              ].map((c, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 rounded-2xl p-4 border"
                  style={{ backgroundColor: "white", borderColor: "#e8d5a3" }}
                >
                  <span className="text-2xl">{c.icon}</span>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: "#5c3d1e", opacity: 0.6 }}>
                      {c.title}
                    </div>
                    <div className="font-medium" style={{ color: "#2d6a3f" }}>{c.val}</div>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="rounded-3xl p-8 border"
              style={{ backgroundColor: "white", borderColor: "#e8d5a3" }}
            >
              <h3 className="text-2xl font-bold mb-6" style={{ color: "#2d6a3f", fontFamily: "Cormorant, serif" }}>
                Оставить заявку
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: "#5c3d1e" }}>Ваше имя</label>
                  <input
                    type="text"
                    placeholder="Как к вам обращаться?"
                    className="w-full px-4 py-3 rounded-xl border outline-none text-sm"
                    style={{ borderColor: "#e8d5a3", color: "#2d6a3f" }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: "#5c3d1e" }}>Телефон</label>
                  <input
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    className="w-full px-4 py-3 rounded-xl border outline-none text-sm"
                    style={{ borderColor: "#e8d5a3", color: "#2d6a3f" }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: "#5c3d1e" }}>Что интересует?</label>
                  <textarea
                    placeholder="Укажите продукты и количество..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border outline-none text-sm resize-none"
                    style={{ borderColor: "#e8d5a3", color: "#2d6a3f" }}
                  />
                </div>
                <button
                  className="w-full py-4 rounded-xl font-semibold text-sm transition-all hover:shadow-lg"
                  style={{ background: "linear-gradient(135deg, #2d6a3f, #4a9c5f)", color: "white" }}
                >
                  Отправить заявку 🐄
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="py-10 mt-8" style={{ background: "#1a4028" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <img
                src={LOGO_IMG}
                alt="КуМК"
                className="h-10 w-auto object-contain mb-1"
                style={{ maxWidth: "120px", filter: "brightness(0) invert(1)" }}
              />
              <div className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                ИП Магомедов Арсен Алиевич
              </div>
            </div>
            <div className="flex gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className="text-sm transition-colors hover:text-white"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
              🌿 Натуральное молоко с 2009
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}