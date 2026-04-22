import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const IMG_MOUNTAINS = "https://cdn.poehali.dev/projects/5f76888b-15da-428a-92be-3ece21533d69/files/3c1a1366-d318-45bb-b21a-62c5fcc03be5.jpg";
const IMG_COW       = "https://cdn.poehali.dev/projects/5f76888b-15da-428a-92be-3ece21533d69/files/a5f801c1-6c86-4ded-ab56-06bbdcfd2833.jpg";
const IMG_PRODUCTS  = "https://cdn.poehali.dev/projects/5f76888b-15da-428a-92be-3ece21533d69/files/70ccfc64-e958-417d-b35f-9f79bff39310.jpg";
const LOGO_IMG      = "https://kumk.ru/wp-content/uploads/2021/02/logo-kumk-official.png";

/* ─── Данные ─── */
const products = [
  { id:1, name:"Молоко цельное",    type:"Молоко",  price:89,  shelf:7,  fat:"3,2%", emoji:"🥛", badge:"Хит",      desc:"Пастеризованное, с горных лугов. Живой вкус без обработки." },
  { id:2, name:"Кефир классический",type:"Кефир",   price:79,  shelf:14, fat:"2,5%", emoji:"🫙", badge:null,       desc:"На живых заквасках. Мягкий, нежный, для всей семьи." },
  { id:3, name:"Сметана 20%",       type:"Сметана", price:149, shelf:21, fat:"20%",  emoji:"🥄", badge:"Новинка",  desc:"Густая, домашняя. Ложка стоит — значит, настоящая." },
  { id:4, name:"Творог зернистый",  type:"Творог",  price:199, shelf:10, fat:"5%",   emoji:"🧀", badge:null,       desc:"Рассыпчатый, без крахмала. Белок без компромиссов." },
  { id:5, name:"Масло сливочное",   type:"Масло",   price:249, shelf:30, fat:"82,5%",emoji:"🧈", badge:"Фермерское",desc:"82,5% жира. Только сливки, ничего лишнего." },
  { id:6, name:"Молоко топлёное",   type:"Молоко",  price:109, shelf:5,  fat:"4%",   emoji:"☕", badge:null,       desc:"Томлёное 8 часов. Карамельный аромат горного вечера." },
  { id:7, name:"Ряженка",           type:"Кефир",   price:89,  shelf:10, fat:"3,2%", emoji:"🫗", badge:null,       desc:"Из топлёного молока. Бабушкин рецепт, без изменений." },
  { id:8, name:"Сметана 30%",       type:"Сметана", price:179, shelf:21, fat:"30%",  emoji:"🥄", badge:null,       desc:"Жирная, насыщенная. Для настоящего дагестанского борща." },
];

const TYPES = ["Все","Молоко","Кефир","Сметана","Творог","Масло"];
const SHELF_OPTIONS = ["Все","до 7 дней","до 14 дней","более 14 дней"];

type Section = "home"|"catalog"|"about"|"contacts";

const T = { terra:"#c0522a", terraDark:"#8b3318", terraLight:"#e07a55",
            ochre:"#d4a017", sky:"#1e4d6b", skyLight:"#2e7aaa",
            cream:"#fdf6ee", milk:"#fffbf5", dark:"#1a1208", sand:"#e8d5b0" };

/* ─── Компонент ─── */
export default function Index() {
  const [section, setSection] = useState<Section>("home");
  const [filterType, setFilterType] = useState("Все");
  const [priceMax, setPriceMax] = useState(300);
  const [shelfFilter, setShelfFilter] = useState("Все");
  const [menuOpen, setMenuOpen] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    setShown(false);
    const t = setTimeout(() => setShown(true), 80);
    return () => clearTimeout(t);
  }, [section]);

  const filtered = products.filter(p => {
    const byType  = filterType === "Все" || p.type === filterType;
    const byPrice = p.price <= priceMax;
    const byShelf = shelfFilter === "Все" ? true
      : shelfFilter === "до 7 дней"    ? p.shelf <= 7
      : shelfFilter === "до 14 дней"   ? p.shelf <= 14
      : p.shelf > 14;
    return byType && byPrice && byShelf;
  });

  const nav: {id:Section; label:string}[] = [
    {id:"home",    label:"Главная"},
    {id:"catalog", label:"Каталог"},
    {id:"about",   label:"О продукции"},
    {id:"contacts",label:"Контакты"},
  ];

  const go = (s: Section) => { setSection(s); setMenuOpen(false); };

  /* ─── NAVBAR ─── */
  const Navbar = () => (
    <nav className="fixed top-0 left-0 right-0 z-50" style={{background:"rgba(253,246,238,0.96)", backdropFilter:"blur(12px)", borderBottom:`2px solid ${T.sand}`}}>
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
        <button onClick={() => go("home")}>
          <img src={LOGO_IMG} alt="КуМК" className="h-12 w-auto object-contain" style={{maxWidth:130}} />
        </button>

        <div className="hidden md:flex items-center gap-7">
          {nav.map(n => (
            <button key={n.id} onClick={() => go(n.id)}
              className={`nav-pill text-sm font-semibold uppercase tracking-wider ${section===n.id?"active":""}`}
              style={{color: section===n.id ? T.terra : T.dark, fontFamily:"Oswald, sans-serif", fontSize:15}}>
              {n.label}
            </button>
          ))}
          <button onClick={() => go("contacts")}
            className="px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all hover:shadow-lg hover:scale-105"
            style={{background:`linear-gradient(135deg,${T.terra},${T.terraLight})`, color:"white", fontFamily:"Oswald, sans-serif"}}>
            Заказать
          </button>
        </div>

        <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)} style={{color:T.terra}}>
          <Icon name={menuOpen ? "X" : "Menu"} size={26} />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden px-5 pb-5 flex flex-col gap-1" style={{background:T.cream, borderTop:`1px solid ${T.sand}`}}>
          {nav.map(n => (
            <button key={n.id} onClick={() => go(n.id)}
              className="py-3 text-left font-bold uppercase tracking-wider border-b text-base"
              style={{color:T.terra, borderColor:T.sand, fontFamily:"Oswald, sans-serif"}}>
              {n.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );

  /* ─── HOME ─── */
  const Home = () => (
    <div>
      {/* HERO */}
      <section className="relative min-h-screen flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage:`url(${IMG_MOUNTAINS})`}} />
        <div className="absolute inset-0" style={{background:"linear-gradient(to top, rgba(26,18,8,0.92) 0%, rgba(26,18,8,0.4) 50%, rgba(26,18,8,0.1) 100%)"}} />

        {/* Декоративная лента сверху */}
        <div className="absolute top-0 left-0 right-0 h-1.5" style={{background:`linear-gradient(90deg,${T.terra},${T.ochre},${T.sky},${T.terra})`}} />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pb-16 pt-32">
          <div className={`anim-up ${shown?"":"opacity-0"}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-semibold"
              style={{background:"rgba(212,160,23,0.2)", border:`1px solid ${T.ochre}`, color:T.ochre}}>
              🏔️ Горный Дагестан · Натуральное · Халяль
            </div>
          </div>

          <h1 className={`anim-up delay-1 ${shown?"":"opacity-0"} text-6xl md:text-8xl font-bold leading-none mb-2`}
            style={{color:"white", fontFamily:"Oswald, sans-serif", textTransform:"uppercase"}}>
            Молоко
          </h1>
          <h1 className={`anim-up delay-2 ${shown?"":"opacity-0"} text-6xl md:text-8xl font-bold leading-none mb-6`}
            style={{color:T.terra, fontFamily:"Oswald, sans-serif", textTransform:"uppercase", WebkitTextStroke:`1px ${T.terraLight}`}}>
            как у мамы
          </h1>

          <p className={`anim-up delay-3 ${shown?"":"opacity-0"} text-lg md:text-xl max-w-lg mb-8 leading-relaxed`}
            style={{color:"rgba(255,255,255,0.82)"}}>
            Торговая марка <strong style={{color:T.ochre}}>КуМК</strong> — молочная продукция с горных пастбищ Дагестана. Без консервантов. Без химии. Только то, что создала природа.
          </p>

          <div className={`anim-up delay-4 ${shown?"":"opacity-0"} flex flex-wrap gap-4`}>
            <button onClick={() => go("catalog")}
              className="px-8 py-4 rounded-full font-bold uppercase tracking-wider text-base transition-all hover:scale-105 hover:shadow-2xl"
              style={{background:`linear-gradient(135deg,${T.terra},${T.terraLight})`, color:"white", fontFamily:"Oswald, sans-serif"}}>
              Смотреть каталог
            </button>
            <button onClick={() => go("contacts")}
              className="px-8 py-4 rounded-full font-bold uppercase tracking-wider text-base border-2 transition-all hover:bg-white"
              style={{borderColor:T.ochre, color:T.ochre, fontFamily:"Oswald, sans-serif"}}>
              Оформить заказ
            </button>
          </div>

          {/* Scroll hint */}
          <div className="mt-12 flex items-center gap-3 anim-fade delay-6" style={{color:"rgba(255,255,255,0.4)"}}>
            <div className="w-px h-10" style={{background:"rgba(255,255,255,0.2)"}} />
            <span className="text-xs uppercase tracking-widest">Листай вниз</span>
          </div>
        </div>

        {/* Нижняя волна */}
        <div className="absolute bottom-0 left-0 right-0" style={{height:50, zIndex:3}}>
          <svg viewBox="0 0 1440 50" preserveAspectRatio="none" style={{width:"100%",height:"100%"}}>
            <path d="M0,50 L0,25 Q180,0 360,25 Q540,50 720,25 Q900,0 1080,25 Q1260,50 1440,25 L1440,50 Z" fill={T.cream}/>
          </svg>
        </div>
      </section>

      {/* БЕГУЩАЯ СТРОКА */}
      <div className="py-4 overflow-hidden" style={{background:T.terra}}>
        <div className="marquee-track">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 pr-8">
              {["🥛 Свежее молоко","🐄 Горные пастбища","🌿 Без консервантов","🏔️ Дагестан","☀️ Каждый день","🧈 Натуральное масло","🥄 Домашняя сметана","✅ Халяль"].map((t,j) => (
                <span key={j} className="text-white font-bold uppercase tracking-widest whitespace-nowrap text-sm px-4"
                  style={{fontFamily:"Oswald, sans-serif"}}>
                  {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ПОЧЕМУ МЫ */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-sm font-bold uppercase tracking-widest mb-3" style={{color:T.terra}}>— Наша история</div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight" style={{color:T.dark, fontFamily:"Oswald, sans-serif", textTransform:"uppercase"}}>
              С горы — <span style={{color:T.terra}}>прямо к вам</span>
            </h2>
            <p className="text-base leading-relaxed mb-4" style={{color:"#4a3a28"}}>
              ИП Магомедов Арсен Алиевич начал с небольшой фермы в Дагестане. Сегодня торговая марка <strong>КуМК</strong> — это 15 лет доверия, сотни постоянных покупателей и молоко, которое пахнет горным воздухом.
            </p>
            <p className="text-base leading-relaxed mb-8" style={{color:"#4a3a28"}}>
              Наши коровы пасутся на высотных лугах. Никаких антибиотиков, никаких гормонов роста — только трава, вода и солнце.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[["15", "лет на рынке"],["100%","натуральное"],["0","консервантов"]].map(([v,l],i) => (
                <div key={i} className="text-center p-4 rounded-2xl" style={{background:T.sand}}>
                  <div className="text-3xl font-black" style={{color:T.terra, fontFamily:"Oswald, sans-serif"}}>{v}</div>
                  <div className="text-xs mt-1 uppercase tracking-wide font-semibold" style={{color:"#6b4e2e"}}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img src={IMG_COW} alt="Наши коровы" className="w-full rounded-3xl object-cover shadow-2xl" style={{height:400}} />
            <div className="absolute -bottom-4 -left-4 px-5 py-3 rounded-2xl font-bold text-white shadow-xl"
              style={{background:`linear-gradient(135deg,${T.terra},${T.terraLight})`, fontFamily:"Oswald, sans-serif", fontSize:16}}>
              🏔️ Горный Дагестан
            </div>
          </div>
        </div>
      </section>

      {/* ТОП ПРОДУКТЫ */}
      <section className="py-16 pattern-bg" style={{background:T.milk}}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-sm font-bold uppercase tracking-widest mb-2" style={{color:T.terra}}>— Каталог</div>
            <h2 className="text-4xl md:text-5xl font-bold" style={{color:T.dark, fontFamily:"Oswald, sans-serif", textTransform:"uppercase"}}>
              Популярные <span style={{color:T.terra}}>продукты</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {products.slice(0,3).map(p => (
              <div key={p.id} className="card-hover rounded-3xl overflow-hidden cursor-pointer"
                style={{background:"white", border:`2px solid ${T.sand}`}} onClick={() => go("catalog")}>
                <div className="h-36 flex items-center justify-center text-7xl pattern-sky"
                  style={{background:`linear-gradient(135deg,${T.sky}15,${T.sky}08)`}}>
                  {p.emoji}
                </div>
                <div className="p-5">
                  {p.badge && <span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 uppercase tracking-wide"
                    style={{background:T.terra, color:"white"}}>{p.badge}</span>}
                  <h3 className="text-xl font-bold mb-1" style={{color:T.dark, fontFamily:"Oswald, sans-serif"}}>{p.name}</h3>
                  <p className="text-sm mb-4" style={{color:"#6b4e2e", opacity:0.85}}>{p.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black" style={{color:T.terra, fontFamily:"Oswald, sans-serif"}}>{p.price} ₽</span>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{background:T.sand, color:"#6b4e2e"}}>жир {p.fat}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button onClick={() => go("catalog")}
              className="px-10 py-4 rounded-full font-bold uppercase tracking-widest border-2 transition-all hover:shadow-lg hover:scale-105"
              style={{borderColor:T.terra, color:T.terra, fontFamily:"Oswald, sans-serif"}}>
              Весь каталог →
            </button>
          </div>
        </div>
      </section>

      {/* БАННЕР ЗАКАЗА */}
      <section className="relative overflow-hidden py-20 mx-4 md:mx-6 my-12 rounded-3xl">
        <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage:`url(${IMG_PRODUCTS})`}} />
        <div className="absolute inset-0" style={{background:`linear-gradient(135deg, rgba(139,51,24,0.93) 0%, rgba(26,77,107,0.88) 100%)`}} />
        <div className="absolute inset-0 pattern-bg opacity-30" />
        {/* Полосатая рамка в стиле дагестанского ковра */}
        <div className="absolute inset-0 rounded-3xl" style={{boxShadow:`inset 0 0 0 6px rgba(212,160,23,0.5), inset 0 0 0 12px rgba(255,255,255,0.05)`}} />

        <div className="relative z-10 text-center px-6">
          <img src={LOGO_IMG} alt="КуМК" className="h-16 w-auto mx-auto mb-6 object-contain" style={{filter:"brightness(0) invert(1)"}} />
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4" style={{fontFamily:"Oswald, sans-serif", textTransform:"uppercase"}}>
            Свежее — каждый день
          </h2>
          <p className="text-lg mb-8 max-w-lg mx-auto" style={{color:"rgba(255,255,255,0.82)"}}>
            Оставьте заявку и получите консультацию по ассортименту и доставке
          </p>
          <button onClick={() => go("contacts")}
            className="px-10 py-4 rounded-full font-bold uppercase tracking-widest text-lg transition-all hover:scale-105 hover:shadow-2xl"
            style={{background:T.ochre, color:T.dark, fontFamily:"Oswald, sans-serif"}}>
            Оформить заказ
          </button>
        </div>
      </section>
    </div>
  );

  /* ─── CATALOG ─── */
  const Catalog = () => (
    <div className="max-w-6xl mx-auto px-4 pt-28 pb-16">
      <div className={`text-center mb-10 anim-up ${shown?"":"opacity-0"}`}>
        <img src={LOGO_IMG} alt="КуМК" className="h-14 w-auto mx-auto mb-5 object-contain" />
        <div className="text-sm font-bold uppercase tracking-widest mb-2" style={{color:T.terra}}>— Вся продукция</div>
        <h2 className="text-4xl md:text-5xl font-bold" style={{color:T.dark, fontFamily:"Oswald, sans-serif", textTransform:"uppercase"}}>
          Каталог <span style={{color:T.terra}}>КуМК</span>
        </h2>
      </div>

      {/* Фильтры */}
      <div className={`rounded-3xl p-6 mb-8 anim-up delay-2 ${shown?"":"opacity-0"}`}
        style={{background:"white", border:`2px solid ${T.sand}`}}>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-3" style={{color:T.terra}}>
              Тип продукта
            </label>
            <div className="flex flex-wrap gap-2">
              {TYPES.map(t => (
                <button key={t} onClick={() => setFilterType(t)}
                  className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all"
                  style={filterType===t
                    ? {background:T.terra, color:"white"}
                    : {background:T.sand, color:"#6b4e2e"}}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-3" style={{color:T.terra}}>
              Цена до {priceMax} ₽
            </label>
            <input type="range" min={50} max={300} value={priceMax}
              onChange={e => setPriceMax(Number(e.target.value))}
              className="w-full cursor-pointer" style={{accentColor:T.terra}} />
            <div className="flex justify-between text-xs mt-1" style={{color:"#9a7a5a"}}>
              <span>50 ₽</span><span>300 ₽</span>
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-3" style={{color:T.terra}}>
              Срок хранения
            </label>
            <div className="flex flex-wrap gap-2">
              {SHELF_OPTIONS.map(s => (
                <button key={s} onClick={() => setShelfFilter(s)}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                  style={shelfFilter===s
                    ? {background:T.sky, color:"white"}
                    : {background:T.sand, color:"#6b4e2e"}}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-24">
          <div className="text-7xl mb-4">🐄</div>
          <p className="text-xl font-bold uppercase" style={{color:T.terra, fontFamily:"Oswald, sans-serif"}}>
            Ничего не найдено
          </p>
          <p className="mt-2 text-sm" style={{color:"#9a7a5a"}}>Попробуйте изменить фильтры</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((p, i) => (
            <div key={p.id} className="card-hover rounded-3xl flex flex-col overflow-hidden"
              style={{
                background:"white",
                border:`2px solid ${T.sand}`,
                opacity: shown ? 1 : 0,
                transform: shown ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.5s ease ${i*0.07}s, transform 0.5s ease ${i*0.07}s`,
              }}>
              <div className="h-32 flex items-center justify-center text-6xl relative"
                style={{background:`linear-gradient(135deg,${T.terra}12,${T.sky}10)`}}>
                {p.emoji}
                {p.badge && (
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-xs font-bold uppercase"
                    style={{background:T.terra, color:"white"}}>
                    {p.badge}
                  </span>
                )}
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-bold text-base mb-1 leading-tight" style={{color:T.dark, fontFamily:"Oswald, sans-serif", fontSize:17}}>{p.name}</h3>
                <p className="text-xs leading-relaxed flex-1 mb-3" style={{color:"#7a5a3a"}}>{p.desc}</p>
                <div className="flex items-center gap-2 text-xs mb-3" style={{color:"#9a7a5a"}}>
                  <span>🧈 {p.fat}</span><span>·</span><span>📅 {p.shelf} дн.</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-black" style={{color:T.terra, fontFamily:"Oswald, sans-serif"}}>{p.price} ₽</span>
                  <button onClick={() => go("contacts")}
                    className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all hover:scale-105"
                    style={{background:T.terra, color:"white"}}>
                    Заказать
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  /* ─── ABOUT ─── */
  const About = () => (
    <div className="pt-20 pb-16">
      {/* Hero-баннер */}
      <div className="relative h-80 md:h-[480px] overflow-hidden">
        <img src={IMG_MOUNTAINS} alt="Дагестан" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{background:"linear-gradient(to bottom, rgba(26,18,8,0.3) 0%, rgba(26,18,8,0.8) 100%)"}} />
        {/* Цветная полоса снизу */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5" style={{background:`linear-gradient(90deg,${T.terra},${T.ochre},${T.sky},${T.terra})`}} />
        <div className={`absolute inset-0 flex flex-col items-center justify-end pb-12 px-6 text-center anim-up ${shown?"":"opacity-0"}`}>
          <img src={LOGO_IMG} alt="КуМК" className="h-14 w-auto mb-4 object-contain" style={{filter:"brightness(0) invert(1)"}} />
          <h2 className="text-4xl md:text-6xl font-bold text-white" style={{fontFamily:"Oswald, sans-serif", textTransform:"uppercase"}}>
            О продукции <span style={{color:T.terra}}>КуМК</span>
          </h2>
          <p className="mt-3 text-lg max-w-lg" style={{color:"rgba(255,255,255,0.8)"}}>
            Натуральность — это не маркетинг. Это то, как мы работаем с первого дня.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Ценности */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            {icon:"🌿", title:"Без химии",       text:"Никаких консервантов, стабилизаторов, красителей. Только натуральные ингредиенты по традиционным рецептам."},
            {icon:"🐄", title:"Честное молоко",  text:"Наши коровы пасутся на горных пастбищах Дагестана. Мы знаем каждое животное и следим за его здоровьем."},
            {icon:"🏔️", title:"Горный воздух",  text:"Высота, чистая вода, свежая трава — всё это чувствуется в каждом глотке. Природа делает продукт за нас."},
            {icon:"⚡", title:"Свежесть",        text:"Производство и упаковка в один день. Прямая поставка от фермы — без складских цепочек и задержек."},
            {icon:"✅", title:"Халяль",          text:"Всё производство соответствует нормам халяль. Это наш принцип и наша ответственность перед покупателями."},
            {icon:"👨‍👩‍👧", title:"Семья",        text:"ИП Магомедов Арсен Алиевич — семейный бизнес. 15 лет мы делаем то, что умеем лучше всего."},
          ].map((v,i) => (
            <div key={i} className="rounded-3xl p-6 card-hover" style={{background:"white", border:`2px solid ${T.sand}`}}>
              <div className="text-4xl mb-3">{v.icon}</div>
              <h3 className="text-xl font-bold mb-2 uppercase" style={{color:T.terra, fontFamily:"Oswald, sans-serif"}}>{v.title}</h3>
              <p className="text-sm leading-relaxed" style={{color:"#6b4e2e"}}>{v.text}</p>
            </div>
          ))}
        </div>

        {/* История */}
        <div className="rounded-3xl overflow-hidden grid md:grid-cols-2 shadow-2xl">
          <img src={IMG_PRODUCTS} alt="Продукция КуМК" className="w-full h-64 md:h-auto object-cover" />
          <div className="p-8 md:p-12 flex flex-col justify-center pattern-bg"
            style={{background:`linear-gradient(135deg,${T.terraDark},${T.sky})`}}>
            {/* Орнаментальная линия */}
            <div className="h-1 w-16 mb-6 rounded-full" style={{background:T.ochre}} />
            <h3 className="text-3xl font-bold text-white mb-4 uppercase" style={{fontFamily:"Oswald, sans-serif"}}>
              История бренда
            </h3>
            <p className="text-white leading-relaxed mb-4" style={{opacity:0.88}}>
              КуМК — это не просто аббревиатура. Это история о том, как дагестанская семья решила кормить людей честно. Небольшая ферма переросла в торговую марку с 15-летней репутацией.
            </p>
            <p className="text-white leading-relaxed" style={{opacity:0.88}}>
              Сегодня КуМК — это гордость региона и проверенное качество, которое передаётся из рук в руки.
            </p>
            <div className="h-1 w-16 mt-6 rounded-full" style={{background:T.ochre}} />
          </div>
        </div>
      </div>
    </div>
  );

  /* ─── CONTACTS ─── */
  const Contacts = () => (
    <div className="pt-24 pb-16 max-w-4xl mx-auto px-6">
      <div className={`text-center mb-12 anim-up ${shown?"":"opacity-0"}`}>
        <img src={LOGO_IMG} alt="КуМК" className="h-14 w-auto mx-auto mb-5 object-contain" />
        <div className="text-sm font-bold uppercase tracking-widest mb-2" style={{color:T.terra}}>— Связаться с нами</div>
        <h2 className="text-4xl md:text-5xl font-bold" style={{color:T.dark, fontFamily:"Oswald, sans-serif", textTransform:"uppercase"}}>
          Контакты
        </h2>
        <p className="mt-3" style={{color:"#7a5a3a"}}>Оставьте заявку — мы перезвоним и всё расскажем</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Инфо */}
        <div className="space-y-4">
          {[
            {icon:"👤", title:"Руководитель",   val:"ИП Магомедов Арсен Алиевич"},
            {icon:"📱", title:"Телефон",         val:"+7 (XXX) XXX-XX-XX"},
            {icon:"📧", title:"Email",           val:"info@kumk.ru"},
            {icon:"📍", title:"Адрес",           val:"Республика Дагестан"},
            {icon:"🕐", title:"Режим работы",    val:"Пн–Пт: 8:00–18:00"},
          ].map((c,i) => (
            <div key={i} className="flex items-center gap-4 rounded-2xl p-4"
              style={{background:"white", border:`2px solid ${T.sand}`}}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{background:T.sand}}>{c.icon}</div>
              <div>
                <div className="text-xs font-bold uppercase tracking-widest" style={{color:T.terra}}>{c.title}</div>
                <div className="font-semibold mt-0.5" style={{color:T.dark}}>{c.val}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Форма */}
        <div className="rounded-3xl p-8 pattern-bg" style={{background:`linear-gradient(135deg,${T.terraDark},${T.sky})`, border:`2px solid ${T.terra}`}}>
          <div className="h-1 w-12 mb-5 rounded-full" style={{background:T.ochre}} />
          <h3 className="text-2xl font-bold text-white mb-6 uppercase" style={{fontFamily:"Oswald, sans-serif"}}>
            Оставить заявку
          </h3>
          <div className="space-y-4">
            {[
              {label:"Ваше имя", type:"text",  ph:"Как к вам обращаться?"},
              {label:"Телефон",  type:"tel",   ph:"+7 (___) ___-__-__"},
            ].map((f,i) => (
              <div key={i}>
                <label className="block text-xs font-bold uppercase tracking-widest mb-1.5 text-white" style={{opacity:0.7}}>{f.label}</label>
                <input type={f.type} placeholder={f.ph}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{background:"rgba(255,255,255,0.12)", border:"1px solid rgba(255,255,255,0.2)", color:"white"}} />
              </div>
            ))}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-1.5 text-white" style={{opacity:0.7}}>Что интересует?</label>
              <textarea placeholder="Укажите продукты и объём..." rows={3}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                style={{background:"rgba(255,255,255,0.12)", border:"1px solid rgba(255,255,255,0.2)", color:"white"}} />
            </div>
            <button className="w-full py-4 rounded-xl font-bold uppercase tracking-widest text-base transition-all hover:scale-[1.02] hover:shadow-xl"
              style={{background:T.ochre, color:T.dark, fontFamily:"Oswald, sans-serif"}}>
              Отправить заявку
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  /* ─── FOOTER ─── */
  const Footer = () => (
    <footer className="py-10" style={{background:T.terraDark}}>
      <div className="h-1 mb-10" style={{background:`linear-gradient(90deg,${T.terra},${T.ochre},${T.sky},${T.terra})`}} />
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <img src={LOGO_IMG} alt="КуМК" className="h-10 w-auto object-contain mb-2" style={{filter:"brightness(0) invert(1)"}} />
          <div className="text-xs" style={{color:"rgba(255,255,255,0.45)"}}>ИП Магомедов Арсен Алиевич</div>
        </div>
        <div className="flex gap-6">
          {nav.map(n => (
            <button key={n.id} onClick={() => go(n.id)}
              className="text-xs font-bold uppercase tracking-wider transition-colors hover:text-white"
              style={{color:"rgba(255,255,255,0.5)", fontFamily:"Oswald, sans-serif"}}>
              {n.label}
            </button>
          ))}
        </div>
        <div className="text-xs text-center" style={{color:"rgba(255,255,255,0.35)"}}>
          🏔️ Дагестан · с 2009 года
        </div>
      </div>
    </footer>
  );

  return (
    <div style={{backgroundColor:T.cream, minHeight:"100vh"}}>
      <Navbar />
      {section === "home"     && <Home />}
      {section === "catalog"  && <Catalog />}
      {section === "about"    && <About />}
      {section === "contacts" && <Contacts />}
      <Footer />
    </div>
  );
}
