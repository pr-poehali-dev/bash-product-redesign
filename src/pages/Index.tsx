import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

type IconName = string;

const HERO_IMAGE = "https://cdn.poehali.dev/projects/303eb9ae-730b-4b91-9067-7b12a1165491/files/5255d4de-f8fd-4305-997e-f2b171b5480e.jpg";

const NAV_LINKS = [
  { label: "Главная", href: "#home" },
  { label: "О нас", href: "#about" },
  { label: "Услуги", href: "#services" },
  { label: "Цены", href: "#pricing" },
  { label: "Контакты", href: "#contacts" },
];

const SERVICES = [
  {
    icon: "Package",
    title: "Биогумус сухой, 5 л",
    desc: "Универсальное удобрение для дачи и огорода. Удобная фасовка для небольших участков. Срок хранения — 3 года.",
    badge: "Хит продаж",
  },
  {
    icon: "Package2",
    title: "Биогумус сухой, 10 л",
    desc: "Оптимальный объём для садового участка. Подходит для грядок, кустарников и плодовых деревьев.",
    badge: "",
  },
  {
    icon: "Archive",
    title: "Биогумус сухой, 40 л",
    desc: "Экономичная упаковка для больших огородов и фермерских хозяйств. Максимальная выгода при покупке.",
    badge: "Выгодно",
  },
  {
    icon: "Droplets",
    title: "Биогумус жидкий, 0.5 л",
    desc: "Концентрированный жидкий экстракт для полива и опрыскивания. Быстрое усвоение растениями.",
    badge: "",
  },
  {
    icon: "FlaskConical",
    title: "Биогумус жидкий, 1 л",
    desc: "Универсальный концентрат для регулярных подкормок. Разводится водой 1:10, подходит для любых культур.",
    badge: "",
  },
  {
    icon: "Truck",
    title: "Оптовые поставки",
    desc: "Поставки биогумуса оптом для агрохозяйств, тепличных комплексов и садовых центров. Индивидуальные условия.",
    badge: "Опт",
  },
];

const PRICING_PLANS = [
  {
    category: "Сухой биогумус",
    icon: "Package",
    items: [
      { name: "5 литров", price: "290", unit: "за упаковку" },
      { name: "10 литров", price: "490", unit: "за упаковку" },
      { name: "40 литров", price: "1 490", unit: "за упаковку", badge: "Выгодно" },
    ],
    highlight: false,
  },
  {
    category: "Жидкий биогумус",
    icon: "Droplets",
    items: [
      { name: "0.5 литра", price: "190", unit: "за флакон" },
      { name: "1 литр", price: "320", unit: "за флакон", badge: "Хит" },
      { name: "5 литров", price: "1 200", unit: "за канистру" },
    ],
    highlight: true,
  },
  {
    category: "Оптовые поставки",
    icon: "Truck",
    items: [
      { name: "от 100 кг", price: "от 35", unit: "₽ за кг" },
      { name: "от 500 кг", price: "от 28", unit: "₽ за кг" },
      { name: "от 1 тонны", price: "По запросу", unit: "" },
    ],
    highlight: false,
  },
];

const STATS = [
  { value: "100%", label: "органический состав" },
  { value: "50%", label: "рост урожайности" },
  { value: "5+", label: "лет на рынке" },
  { value: "1 000+", label: "довольных клиентов" },
];

const SERVICE_TYPES = [
  { id: "strategy", label: "Стратегический консалтинг", base: 120000 },
  { id: "operations", label: "Операционная оптимизация", base: 95000 },
  { id: "financial", label: "Финансовое моделирование", base: 80000 },
  { id: "team", label: "Трансформация команды", base: 70000 },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  const [selectedService, setSelectedService] = useState("strategy");
  const [employees, setEmployees] = useState(100);
  const [revenue, setRevenue] = useState(200);
  const [duration, setDuration] = useState(6);
  const [contactForm, setContactForm] = useState({ name: "", company: "", email: "", message: "" });

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_LINKS.map(l => l.href.slice(1));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const calcPrice = () => {
    const svc = SERVICE_TYPES.find(s => s.id === selectedService)!;
    const empFactor = 1 + Math.log10(employees / 10) * 0.3;
    const revFactor = 1 + Math.log10(revenue / 10) * 0.2;
    const monthly = Math.round((svc.base * empFactor * revFactor) / 10000) * 10000;
    const total = monthly * duration;
    const roi = Math.round(revenue * 1000000 * 0.08 * (duration / 12));
    return { monthly, total, roi };
  };

  const { monthly, total, roi } = calcPrice();
  const fmt = (n: number) => n.toLocaleString("ru-RU");

  const heroSection = useInView();
  const aboutSection = useInView();
  const servicesSection = useInView();
  const pricingSection = useInView();
  const calcSection = useInView();
  const contactSection = useInView();

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-md bg-background/90">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gold flex items-center justify-center">
              <Icon name="Leaf" size={16} className="text-background" />
            </div>
            <span className="font-display font-semibold text-lg tracking-wide">БИО<span className="text-gold">ГУМУС</span></span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-body font-medium tracking-wide transition-colors duration-200 ${
                  activeSection === link.href.slice(1)
                    ? "text-gold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </a>
            ))}
            <a href="#contacts" className="ml-4 px-5 py-2 bg-gold text-background font-display font-medium text-sm tracking-wide hover:opacity-90 transition-opacity">
              Связаться
            </a>
          </div>

          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Icon name={mobileOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-card border-t border-border px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-body text-muted-foreground hover:text-gold transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />

        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }} />

        {/* Decorative vertical line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gold/5 hidden lg:block" />

        <div ref={heroSection.ref} className="relative max-w-7xl mx-auto px-6 pt-24 pb-16 w-full">
          <div className={`max-w-2xl ${heroSection.inView ? "animate-slide-up" : "opacity-0"}`}>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-gold/40 bg-gold/5 text-gold text-xs font-body font-medium tracking-widest uppercase mb-8">
              <Icon name="Leaf" size={12} />
              Башкирский продукт · 100% органика
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.05] uppercase text-foreground mb-4">
              Конский<br />
              <span className="text-gold">Биогумус</span>
            </h1>

            <p className="font-display text-xl md:text-2xl text-muted-foreground/80 font-normal uppercase tracking-wide mb-6">
              Живое удобрение для богатого урожая
            </p>

            <p className="font-body text-muted-foreground text-base leading-relaxed mb-10 max-w-lg">
              Экологически чистый продукт переработки конского навоза калифорнийскими червями. Восстанавливает плодородие почвы, увеличивает урожайность до 50% без химии и пестицидов.
            </p>

            <div className="flex flex-wrap gap-4 mb-14">
              <a href="#pricing" className="px-8 py-3.5 bg-gold text-background font-display font-medium text-sm tracking-widest uppercase hover:opacity-90 transition-opacity">
                Посмотреть цены
              </a>
              <a href="#contacts" className="px-8 py-3.5 border border-border text-foreground font-display font-medium text-sm tracking-widest uppercase hover:border-gold hover:text-gold transition-colors">
                Заказать
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6">
              {[
                { icon: "ShieldCheck", text: "Без химии и ГМО" },
                { icon: "Sprout", text: "Сертифицировано" },
                { icon: "Truck", text: "Доставка по России" },
              ].map(b => (
                <div key={b.text} className="flex items-center gap-2">
                  <Icon name={b.icon as IconName} size={14} className="text-gold" />
                  <span className="font-body text-xs text-muted-foreground">{b.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className={`mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-border ${heroSection.inView ? "animate-fade-in" : "opacity-0"}`}>
            {STATS.map(stat => (
              <div key={stat.value} className="bg-card/90 backdrop-blur-sm px-6 py-5">
                <div className="font-display text-2xl md:text-3xl font-bold text-gold">{stat.value}</div>
                <div className="font-body text-xs text-muted-foreground mt-1 uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — небольшой блок между hero и about */}
      <section className="py-16 bg-card/20 border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { icon: "Worm", step: "01", title: "Калифорнийские черви", desc: "Перерабатывают конский навоз, создавая богатый гумус" },
              { icon: "Leaf", step: "02", title: "Натуральный состав", desc: "Гуминовые кислоты, макро- и микроэлементы в доступной форме" },
              { icon: "Sprout", step: "03", title: "Богатый урожай", desc: "Растения получают всё необходимое без химических удобрений" },
            ].map(item => (
              <div key={item.step} className="flex flex-col items-center gap-4">
                <div className="relative">
                  <div className="w-14 h-14 border border-gold/30 flex items-center justify-center bg-gold/5">
                    <Icon name={item.icon as IconName} size={24} className="text-gold" />
                  </div>
                  <span className="absolute -top-2 -right-2 font-display text-[10px] font-bold text-background bg-gold px-1.5 py-0.5">{item.step}</span>
                </div>
                <div>
                  <div className="font-display font-semibold uppercase tracking-wide text-sm text-foreground mb-1">{item.title}</div>
                  <p className="font-body text-xs text-muted-foreground leading-relaxed max-w-xs mx-auto">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-background overflow-hidden">
        <div ref={aboutSection.ref} className="max-w-7xl mx-auto px-6">

          {/* Hero banner */}
          <div className={`relative mb-16 rounded-sm overflow-hidden ${aboutSection.inView ? "animate-fade-in" : "opacity-0"}`}>
            <img
              src="https://cdn.poehali.dev/projects/303eb9ae-730b-4b91-9067-7b12a1165491/files/8b7793cd-fa91-4aa7-9c03-6227e01690e9.jpg"
              alt="Биогумус — Башкирский продукт"
              className="w-full h-64 md:h-80 object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
            <div className="absolute inset-0 flex items-center px-8 md:px-14">
              <div>
                <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground uppercase leading-none">
                  Био<span className="text-gold">гумус</span>
                </h2>
                <p className="font-body text-sm md:text-base text-muted-foreground mt-2 max-w-sm leading-relaxed">
                  Конский «Башкирский продукт»
                </p>
              </div>
            </div>
          </div>

          <div className={`grid md:grid-cols-2 gap-16 items-start ${aboutSection.inView ? "animate-fade-in" : "opacity-0"}`}>
            <div>
              <div className="text-xs text-gold font-body font-medium tracking-widest uppercase mb-4">О продукте</div>
              <h3 className="font-display text-3xl md:text-4xl font-bold uppercase leading-tight text-foreground gold-line mb-8">
                Экологически чистое<br />органическое<br />удобрение
              </h3>
              <p className="font-body text-muted-foreground leading-relaxed mb-6">
                Биогумус — продукт переработки конского навоза калифорнийскими червями. Создаёт плодородие земель и влияет на качество и урожай сельскохозяйственной продукции.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed mb-8">
                Подходит для овощных, плодовых, ягодных и декоративно-цветочных культур. Абсолютно безопасен для людей, животных и окружающей среды.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: "Leaf", text: "100% органический состав" },
                  { icon: "Shield", text: "Без химии и пестицидов" },
                  { icon: "Sprout", text: "Повышает урожайность" },
                  { icon: "MapPin", text: "Производство Башкирия" },
                ].map(item => (
                  <div key={item.text} className="flex items-center gap-3">
                    <Icon name={item.icon as IconName} size={16} className="text-gold flex-shrink-0" />
                    <span className="font-body text-sm text-muted-foreground">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {/* What is it */}
              <div className="bg-card border border-border p-6 hover-lift">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 border border-gold/30 flex items-center justify-center">
                    <Icon name="FlaskConical" size={15} className="text-gold" />
                  </div>
                  <div className="font-display font-semibold text-foreground uppercase text-sm tracking-wide">Что такое биогумус?</div>
                </div>
                <p className="font-body text-xs text-muted-foreground leading-relaxed">
                  Биогумус — это продукт жизнедеятельности дождевых (калифорнийских) червей, переработавших конский навоз. Богат гуминовыми кислотами, макро- и микроэлементами.
                </p>
              </div>

              <div className="bg-card border border-border p-6 hover-lift">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 border border-gold/30 flex items-center justify-center">
                    <Icon name="Sprout" size={15} className="text-gold" />
                  </div>
                  <div className="font-display font-semibold text-foreground uppercase text-sm tracking-wide">Для чего применять?</div>
                </div>
                <p className="font-body text-xs text-muted-foreground leading-relaxed">
                  Для подкормки овощей, ягод, плодовых деревьев, цветов и комнатных растений. Улучшает структуру почвы, ускоряет рост и повышает иммунитет растений.
                </p>
              </div>

              <div className="bg-card border border-border p-6 hover-lift">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 border border-gold/30 flex items-center justify-center">
                    <Icon name="Star" size={15} className="text-gold" />
                  </div>
                  <div className="font-display font-semibold text-foreground uppercase text-sm tracking-wide">Преимущества</div>
                </div>
                <p className="font-body text-xs text-muted-foreground leading-relaxed">
                  Увеличивает урожайность до 30–50%, ускоряет прорастание семян, улучшает вкус и качество плодов, восстанавливает истощённые почвы.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 bg-card/30">
        <div ref={servicesSection.ref} className="max-w-7xl mx-auto px-6">
          <div className={`text-center mb-16 ${servicesSection.inView ? "animate-fade-in" : "opacity-0"}`}>
            <div className="text-xs text-gold font-body font-medium tracking-widest uppercase mb-4">Наша продукция</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase text-foreground mb-4">
              Биогумус для любых<br />культур и масштабов
            </h2>
            <div className="w-12 h-0.5 bg-gold mx-auto" />
          </div>

          <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border ${servicesSection.inView ? "animate-fade-in" : "opacity-0"}`}>
            {SERVICES.map(svc => (
              <div key={svc.title} className="bg-card p-8 hover-lift group cursor-pointer relative">
                {svc.badge && (
                  <span className="absolute top-4 right-4 bg-gold text-background text-[10px] font-display font-semibold px-2 py-0.5 uppercase tracking-wider">
                    {svc.badge}
                  </span>
                )}
                <div className="w-10 h-10 border border-gold/30 flex items-center justify-center mb-6 group-hover:bg-gold/10 transition-colors">
                  <Icon name={svc.icon as IconName} size={20} className="text-gold" />
                </div>
                <h3 className="font-display font-semibold uppercase tracking-wide text-foreground text-sm mb-3">{svc.title}</h3>
                <p className="font-body text-muted-foreground text-sm leading-relaxed">{svc.desc}</p>
                <div className="mt-6 flex items-center gap-2 text-gold text-xs font-body font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Заказать</span>
                  <Icon name="ArrowRight" size={12} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="calculator" className="py-24 bg-background">
        <div ref={calcSection.ref} className="max-w-5xl mx-auto px-6">
          <div className={`text-center mb-12 ${calcSection.inView ? "animate-fade-in" : "opacity-0"}`}>
            <div className="text-xs text-gold font-body font-medium tracking-widest uppercase mb-4">Калькулятор стоимости</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase text-foreground mb-4">
              Рассчитайте стоимость<br />вашего проекта
            </h2>
            <div className="w-12 h-0.5 bg-gold mx-auto" />
          </div>

          <div className={`grid md:grid-cols-5 gap-px bg-border ${calcSection.inView ? "animate-fade-in" : "opacity-0"}`}>
            <div className="md:col-span-3 bg-card p-8 space-y-8">
              <div>
                <label className="font-display text-xs uppercase tracking-widest text-muted-foreground block mb-3">Тип услуги</label>
                <div className="grid grid-cols-2 gap-2">
                  {SERVICE_TYPES.map(s => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedService(s.id)}
                      className={`px-4 py-2.5 text-xs font-body font-medium text-left border transition-colors ${
                        selectedService === s.id
                          ? "border-gold bg-gold/10 text-gold"
                          : "border-border text-muted-foreground hover:border-gold/50 hover:text-foreground"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="font-display text-xs uppercase tracking-widest text-muted-foreground">Сотрудников</label>
                  <span className="font-display font-semibold text-gold text-lg">{employees.toLocaleString("ru-RU")}</span>
                </div>
                <input type="range" min={10} max={5000} step={10} value={employees} onChange={e => setEmployees(+e.target.value)} className="w-full" />
                <div className="flex justify-between text-xs text-muted-foreground mt-1 font-body">
                  <span>10</span><span>5 000</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="font-display text-xs uppercase tracking-widest text-muted-foreground">Выручка (млн ₽/год)</label>
                  <span className="font-display font-semibold text-gold text-lg">{revenue.toLocaleString("ru-RU")}</span>
                </div>
                <input type="range" min={10} max={5000} step={10} value={revenue} onChange={e => setRevenue(+e.target.value)} className="w-full" />
                <div className="flex justify-between text-xs text-muted-foreground mt-1 font-body">
                  <span>10 млн</span><span>5 000 млн</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="font-display text-xs uppercase tracking-widest text-muted-foreground">Длительность (месяцев)</label>
                  <span className="font-display font-semibold text-gold text-lg">{duration} мес</span>
                </div>
                <input type="range" min={1} max={24} step={1} value={duration} onChange={e => setDuration(+e.target.value)} className="w-full" />
                <div className="flex justify-between text-xs text-muted-foreground mt-1 font-body">
                  <span>1 мес</span><span>24 мес</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 bg-card p-8 flex flex-col justify-between">
              <div>
                <div className="font-display text-xs uppercase tracking-widest text-muted-foreground mb-6">Расчёт стоимости</div>
                <div className="space-y-5">
                  <div className="pb-4 border-b border-border">
                    <div className="font-body text-xs text-muted-foreground mb-1">Ежемесячно</div>
                    <div className="font-display text-3xl font-bold text-foreground">₽ {fmt(monthly)}</div>
                  </div>
                  <div className="pb-4 border-b border-border">
                    <div className="font-body text-xs text-muted-foreground mb-1">Итого за {duration} мес</div>
                    <div className="font-display text-2xl font-semibold text-foreground">₽ {fmt(total)}</div>
                  </div>
                  <div className="pb-4 border-b border-border/50">
                    <div className="font-body text-xs text-muted-foreground mb-1">Ожидаемый эффект</div>
                    <div className="font-display text-2xl font-bold text-gold">₽ {fmt(roi)}</div>
                    <div className="font-body text-xs text-muted-foreground mt-1">+{Math.round(roi / total * 100)}% ROI</div>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-gold/5 border border-gold/20">
                  <p className="font-body text-xs text-muted-foreground leading-relaxed">
                    * Расчёт является предварительным. Точная стоимость определяется после диагностики.
                  </p>
                </div>
              </div>
              <a href="#contacts" className="mt-8 block text-center px-6 py-3.5 bg-gold text-background font-display font-medium text-sm tracking-wide uppercase hover:opacity-90 transition-opacity">
                Получить предложение
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 bg-card/30">
        <div ref={pricingSection.ref} className="max-w-6xl mx-auto px-6">
          <div className={`text-center mb-16 ${pricingSection.inView ? "animate-fade-in" : "opacity-0"}`}>
            <div className="text-xs text-gold font-body font-medium tracking-widest uppercase mb-4">Цены</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase text-foreground mb-4">
              Прозрачные цены<br />на всю продукцию
            </h2>
            <div className="w-12 h-0.5 bg-gold mx-auto" />
          </div>

          <div className={`grid md:grid-cols-3 gap-px bg-border ${pricingSection.inView ? "animate-fade-in" : "opacity-0"}`}>
            {PRICING_PLANS.map(plan => (
              <div key={plan.category} className={`bg-card p-8 flex flex-col ${plan.highlight ? "relative" : ""}`}>
                {plan.highlight && <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold" />}
                {plan.highlight && (
                  <div className="absolute -top-3 left-8">
                    <span className="bg-gold text-background text-[10px] font-display font-semibold px-3 py-1 uppercase tracking-wider">Популярное</span>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 border border-gold/30 flex items-center justify-center">
                    <Icon name={plan.icon as IconName} size={17} className="text-gold" />
                  </div>
                  <h3 className="font-display font-semibold uppercase tracking-wide text-foreground text-sm">{plan.category}</h3>
                </div>

                <div className="space-y-3 flex-1 mb-8">
                  {plan.items.map(item => (
                    <div key={item.name} className="flex items-center justify-between py-3 border-b border-border/50">
                      <div className="flex items-center gap-2">
                        <span className="font-body text-sm text-foreground">{item.name}</span>
                        {item.badge && (
                          <span className="bg-gold/15 text-gold text-[10px] font-display font-semibold px-1.5 py-0.5 uppercase tracking-wide">{item.badge}</span>
                        )}
                      </div>
                      <div className="text-right">
                        {item.price === "По запросу" ? (
                          <span className="font-body text-xs text-muted-foreground">По запросу</span>
                        ) : (
                          <>
                            <span className="font-display font-bold text-gold text-lg">₽ {item.price}</span>
                            {item.unit && <div className="font-body text-[10px] text-muted-foreground">{item.unit}</div>}
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <a
                  href="#contacts"
                  className={`block text-center px-6 py-3 font-display font-medium text-sm tracking-wide uppercase transition-colors ${
                    plan.highlight
                      ? "bg-gold text-background hover:opacity-90"
                      : "border border-border text-foreground hover:border-gold hover:text-gold"
                  }`}
                >
                  Заказать
                </a>
              </div>
            ))}
          </div>

          <p className={`text-center font-body text-xs text-muted-foreground mt-8 ${pricingSection.inView ? "animate-fade-in" : "opacity-0"}`}>
            * Цены указаны с учётом НДС. Доставка рассчитывается отдельно. Скидки при крупных заказах.
          </p>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 bg-background">
        <div ref={contactSection.ref} className="max-w-6xl mx-auto px-6">
          <div className={`grid md:grid-cols-2 gap-16 ${contactSection.inView ? "animate-fade-in" : "opacity-0"}`}>
            <div>
              <div className="text-xs text-gold font-body font-medium tracking-widest uppercase mb-4">Контакты</div>
              <h2 className="font-display text-4xl md:text-5xl font-bold uppercase leading-tight text-foreground gold-line mb-8">
                Заказать<br />биогумус<br />сейчас
              </h2>
              <p className="font-body text-muted-foreground leading-relaxed mb-10">
                Свяжитесь с нами любым удобным способом — ответим быстро, поможем выбрать нужный продукт и объём, организуем доставку по всей России.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 border border-border flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name="Phone" size={15} className="text-gold" />
                  </div>
                  <div>
                    <div className="font-body text-xs text-muted-foreground uppercase tracking-wide mb-1">Телефон</div>
                    <a href="tel:+79639008585" className="font-body text-sm text-foreground hover:text-gold transition-colors block">+7 (963) 900-85-85</a>
                    <a href="tel:+79193350101" className="font-body text-sm text-foreground hover:text-gold transition-colors block">+7 (919) 335-01-01</a>
                    <a href="tel:+79273088585" className="font-body text-sm text-foreground hover:text-gold transition-colors block">+7 (927) 308-85-85</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 border border-border flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name="Mail" size={15} className="text-gold" />
                  </div>
                  <div>
                    <div className="font-body text-xs text-muted-foreground uppercase tracking-wide mb-1">E-mail</div>
                    <a href="mailto:rbbiohumus@mail.ru" className="font-body text-sm text-foreground hover:text-gold transition-colors">rbbiohumus@mail.ru</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 border border-border flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name="MapPin" size={15} className="text-gold" />
                  </div>
                  <div>
                    <div className="font-body text-xs text-muted-foreground uppercase tracking-wide mb-1">Адрес</div>
                    <p className="font-body text-sm text-foreground leading-relaxed">453837, Республика Башкортостан,<br />ул. Сельхозтехника, дом 18/1</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 border border-border flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name="Users" size={15} className="text-gold" />
                  </div>
                  <div>
                    <div className="font-body text-xs text-muted-foreground uppercase tracking-wide mb-1">ВКонтакте</div>
                    <a href="https://vk.com/rbbiohumus" target="_blank" rel="noopener noreferrer" className="font-body text-sm text-foreground hover:text-gold transition-colors">https://vk.com/bashproduct02</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border p-8">
              <h3 className="font-display font-semibold uppercase tracking-wide text-sm text-foreground mb-6">Оставить заявку</h3>
              <div className="space-y-4">
                <div>
                  <label className="font-display text-xs uppercase tracking-widest text-muted-foreground block mb-2">Ваше имя</label>
                  <input
                    type="text"
                    value={contactForm.name}
                    onChange={e => setContactForm(p => ({ ...p, name: e.target.value }))}
                    className="w-full bg-background border border-border px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:border-gold transition-colors"
                    placeholder="Иван Иванов"
                  />
                </div>
                <div>
                  <label className="font-display text-xs uppercase tracking-widest text-muted-foreground block mb-2">Регион доставки</label>
                  <input
                    type="text"
                    value={contactForm.company}
                    onChange={e => setContactForm(p => ({ ...p, company: e.target.value }))}
                    className="w-full bg-background border border-border px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:border-gold transition-colors"
                    placeholder="Москва, Краснодар, Уфа..."
                  />
                </div>
                <div>
                  <label className="font-display text-xs uppercase tracking-widest text-muted-foreground block mb-2">Email</label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={e => setContactForm(p => ({ ...p, email: e.target.value }))}
                    className="w-full bg-background border border-border px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:border-gold transition-colors"
                    placeholder="ivan@company.ru"
                  />
                </div>
                <div>
                  <label className="font-display text-xs uppercase tracking-widest text-muted-foreground block mb-2">Ваша задача</label>
                  <textarea
                    rows={3}
                    value={contactForm.message}
                    onChange={e => setContactForm(p => ({ ...p, message: e.target.value }))}
                    className="w-full bg-background border border-border px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:border-gold transition-colors resize-none"
                    placeholder="Опишите вашу задачу или вопрос..."
                  />
                </div>
                <button className="w-full py-4 bg-gold text-background font-display font-medium text-sm tracking-widest uppercase hover:opacity-90 transition-opacity">
                  Отправить заявку
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-10 bg-background">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gold flex items-center justify-center">
              <Icon name="Leaf" size={12} className="text-background" />
            </div>
            <span className="font-display text-sm font-semibold">БИО<span className="text-gold">ГУМУС</span></span>
          </div>
          <p className="font-body text-xs text-muted-foreground">© 2024 Apex Group. Все права защищены.</p>
          <div className="flex gap-6">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} className="font-body text-xs text-muted-foreground hover:text-gold transition-colors">{l.label}</a>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
}