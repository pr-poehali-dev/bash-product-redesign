import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

type IconName = string;

const HERO_IMAGE = "https://cdn.poehali.dev/projects/303eb9ae-730b-4b91-9067-7b12a1165491/files/5c36e71f-d17f-4b1d-b77e-47d4390ddb69.jpg";

const NAV_LINKS = [
  { label: "Главная", href: "#home" },
  { label: "О нас", href: "#about" },
  { label: "Услуги", href: "#services" },
  { label: "Цены", href: "#pricing" },
  { label: "Контакты", href: "#contacts" },
];

const SERVICES = [
  {
    icon: "BarChart3",
    title: "Стратегический консалтинг",
    desc: "Разработка долгосрочных стратегий роста, анализ рынка и конкурентного окружения для устойчивого развития бизнеса.",
  },
  {
    icon: "Settings2",
    title: "Операционная оптимизация",
    desc: "Реинжиниринг бизнес-процессов, автоматизация и внедрение эффективных операционных моделей.",
  },
  {
    icon: "TrendingUp",
    title: "Финансовое моделирование",
    desc: "Построение финансовых моделей, оценка инвестиций и управление рисками для принятия обоснованных решений.",
  },
  {
    icon: "Users",
    title: "Трансформация команды",
    desc: "Развитие лидерских компетенций, построение высокоэффективных команд и корпоративной культуры.",
  },
  {
    icon: "Globe",
    title: "Выход на новые рынки",
    desc: "Анализ зарубежных рынков, локализация бизнес-модели и сопровождение международной экспансии.",
  },
  {
    icon: "Shield",
    title: "Управление рисками",
    desc: "Комплексная оценка операционных и стратегических рисков, разработка систем раннего предупреждения.",
  },
];

const PRICING_PLANS = [
  {
    name: "Базовый",
    price: "180 000",
    period: "/ месяц",
    features: [
      "До 3 проектов в работе",
      "Еженедельные отчёты",
      "Выделенный менеджер",
      "Поддержка в рабочее время",
    ],
    highlight: false,
  },
  {
    name: "Профессиональный",
    price: "450 000",
    period: "/ месяц",
    features: [
      "До 10 проектов в работе",
      "Ежедневные отчёты",
      "Команда экспертов",
      "Поддержка 24/7",
      "Стратегические сессии",
    ],
    highlight: true,
  },
  {
    name: "Корпоративный",
    price: "По запросу",
    period: "",
    features: [
      "Неограниченные проекты",
      "Персональная команда",
      "Прямой доступ к партнёрам",
      "Поддержка 24/7",
      "Полная интеграция в процессы",
      "SLA-гарантии",
    ],
    highlight: false,
  },
];

const STATS = [
  { value: "12+", label: "лет на рынке" },
  { value: "340+", label: "завершённых проектов" },
  { value: "98%", label: "клиентов возвращаются" },
  { value: "₽2.4 млрд", label: "создано стоимости" },
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
              <span className="font-display font-bold text-sm text-background">A</span>
            </div>
            <span className="font-display font-semibold text-lg tracking-wide">APEX<span className="text-gold">GROUP</span></span>
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
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />

        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }} />

        <div ref={heroSection.ref} className="relative max-w-7xl mx-auto px-6 pt-24 pb-16">
          <div className={`max-w-2xl ${heroSection.inView ? "animate-slide-up" : "opacity-0"}`}>
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-gold/30 text-gold text-xs font-body font-medium tracking-widest uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              Стратегический консалтинг
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight uppercase text-foreground mb-6">
              Решения, которые<br />
              <span className="text-gold">масштабируют</span><br />
              ваш бизнес
            </h1>
            <p className="font-body text-muted-foreground text-lg leading-relaxed mb-10 max-w-xl">
              Мы помогаем компаниям B2B-сегмента достигать амбициозных целей через стратегический анализ, операционное совершенство и управление изменениями.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#contacts" className="px-8 py-3.5 bg-gold text-background font-display font-medium text-sm tracking-wide uppercase hover:opacity-90 transition-opacity">
                Обсудить проект
              </a>
              <a href="#services" className="px-8 py-3.5 border border-border text-foreground font-display font-medium text-sm tracking-wide uppercase hover:border-gold hover:text-gold transition-colors">
                Наши услуги
              </a>
            </div>
          </div>

          <div className={`mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-border ${heroSection.inView ? "animate-fade-in" : "opacity-0"}`}>
            {STATS.map(stat => (
              <div key={stat.value} className="bg-card/80 backdrop-blur-sm px-6 py-5">
                <div className="font-display text-2xl font-bold text-gold">{stat.value}</div>
                <div className="font-body text-xs text-muted-foreground mt-1 uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-background">
        <div ref={aboutSection.ref} className="max-w-7xl mx-auto px-6">
          <div className={`grid md:grid-cols-2 gap-16 items-center ${aboutSection.inView ? "animate-fade-in" : "opacity-0"}`}>
            <div>
              <div className="text-xs text-gold font-body font-medium tracking-widest uppercase mb-4">О компании</div>
              <h2 className="font-display text-4xl md:text-5xl font-bold uppercase leading-tight text-foreground gold-line mb-8">
                Экспертиза,<br />проверенная<br />результатами
              </h2>
              <p className="font-body text-muted-foreground leading-relaxed mb-6">
                Apex Group — ведущая консалтинговая компания, специализирующаяся на стратегическом развитии и операционной трансформации крупных B2B-предприятий. С 2012 года мы сопровождаем компании в ключевые моменты роста.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed mb-8">
                Наша команда из 80+ сертифицированных экспертов объединяет глубокую отраслевую экспертизу с передовыми методологиями управления, обеспечивая измеримые и устойчивые результаты.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: "Award", text: "Top-10 консультантов России" },
                  { icon: "CheckCircle2", text: "ISO 9001 сертификация" },
                  { icon: "Briefcase", text: "20+ отраслей" },
                  { icon: "Star", text: "NPS 94 балла" },
                ].map(item => (
                  <div key={item.text} className="flex items-center gap-3">
                    <Icon name={item.icon as IconName} size={16} className="text-gold flex-shrink-0" />
                    <span className="font-body text-sm text-muted-foreground">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { num: "01", title: "Диагностика", desc: "Глубокий анализ текущего состояния бизнеса и выявление точек роста" },
                { num: "02", title: "Стратегия", desc: "Разработка чёткого плана с измеримыми KPI и сроками реализации" },
                { num: "03", title: "Внедрение", desc: "Сопровождение команды на всех этапах трансформации" },
                { num: "04", title: "Результат", desc: "Контроль эффективности и закрепление достигнутых изменений" },
              ].map(item => (
                <div key={item.num} className="bg-card border border-border p-6 hover-lift">
                  <div className="font-display text-3xl font-bold text-gold/20 mb-3">{item.num}</div>
                  <div className="font-display font-semibold text-foreground uppercase text-sm tracking-wide mb-2">{item.title}</div>
                  <p className="font-body text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 bg-card/30">
        <div ref={servicesSection.ref} className="max-w-7xl mx-auto px-6">
          <div className={`text-center mb-16 ${servicesSection.inView ? "animate-fade-in" : "opacity-0"}`}>
            <div className="text-xs text-gold font-body font-medium tracking-widest uppercase mb-4">Наши услуги</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase text-foreground mb-4">
              Комплексные решения<br />для вашего бизнеса
            </h2>
            <div className="w-12 h-0.5 bg-gold mx-auto" />
          </div>

          <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border ${servicesSection.inView ? "animate-fade-in" : "opacity-0"}`}>
            {SERVICES.map(svc => (
              <div key={svc.title} className="bg-card p-8 hover-lift group cursor-pointer">
                <div className="w-10 h-10 border border-gold/30 flex items-center justify-center mb-6 group-hover:bg-gold/10 transition-colors">
                  <Icon name={svc.icon as IconName} size={20} className="text-gold" />
                </div>
                <h3 className="font-display font-semibold uppercase tracking-wide text-foreground text-sm mb-3">{svc.title}</h3>
                <p className="font-body text-muted-foreground text-sm leading-relaxed">{svc.desc}</p>
                <div className="mt-6 flex items-center gap-2 text-gold text-xs font-body font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Подробнее</span>
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
            <div className="text-xs text-gold font-body font-medium tracking-widest uppercase mb-4">Тарифы</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase text-foreground mb-4">
              Прозрачное<br />ценообразование
            </h2>
            <div className="w-12 h-0.5 bg-gold mx-auto" />
          </div>

          <div className={`grid md:grid-cols-3 gap-px bg-border ${pricingSection.inView ? "animate-fade-in" : "opacity-0"}`}>
            {PRICING_PLANS.map(plan => (
              <div key={plan.name} className={`bg-card p-8 flex flex-col ${plan.highlight ? "relative" : ""}`}>
                {plan.highlight && <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold" />}
                {plan.highlight && (
                  <div className="absolute -top-3 left-8">
                    <span className="bg-gold text-background text-[10px] font-display font-semibold px-3 py-1 uppercase tracking-wider">Популярный</span>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="font-display font-semibold uppercase tracking-widest text-xs text-muted-foreground mb-4">{plan.name}</h3>
                  <div className="font-display text-4xl font-bold text-foreground">
                    {plan.price === "По запросу" ? <span className="text-2xl">По запросу</span> : <>₽ {plan.price}</>}
                  </div>
                  {plan.period && <div className="font-body text-sm text-muted-foreground mt-1">{plan.period}</div>}
                </div>
                <div className="space-y-3 mb-8 flex-1">
                  {plan.features.map(f => (
                    <div key={f} className="flex items-start gap-3">
                      <Icon name="Check" size={14} className="text-gold mt-0.5 flex-shrink-0" />
                      <span className="font-body text-sm text-muted-foreground">{f}</span>
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
                  Выбрать план
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 bg-background">
        <div ref={contactSection.ref} className="max-w-6xl mx-auto px-6">
          <div className={`grid md:grid-cols-2 gap-16 ${contactSection.inView ? "animate-fade-in" : "opacity-0"}`}>
            <div>
              <div className="text-xs text-gold font-body font-medium tracking-widest uppercase mb-4">Контакты</div>
              <h2 className="font-display text-4xl md:text-5xl font-bold uppercase leading-tight text-foreground gold-line mb-8">
                Начнём работу<br />над вашим<br />проектом
              </h2>
              <p className="font-body text-muted-foreground leading-relaxed mb-10">
                Свяжитесь с нами для получения бесплатной предварительной консультации. Расскажите о своей задаче — мы предложим оптимальное решение.
              </p>
              <div className="space-y-5">
                {[
                  { icon: "Phone", label: "+7 (495) 000-00-00" },
                  { icon: "Mail", label: "info@apexgroup.ru" },
                  { icon: "MapPin", label: "Москва, Пресненская набережная, 10" },
                  { icon: "Clock", label: "Пн–Пт, 9:00–19:00" },
                ].map(c => (
                  <div key={c.label} className="flex items-center gap-4">
                    <div className="w-9 h-9 border border-border flex items-center justify-center flex-shrink-0">
                      <Icon name={c.icon as IconName} size={15} className="text-gold" />
                    </div>
                    <span className="font-body text-sm text-muted-foreground">{c.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border p-8">
              <h3 className="font-display font-semibold uppercase tracking-wide text-sm text-foreground mb-6">Оставить заявку</h3>
              <div className="space-y-4">
                <div>
                  <label className="font-display text-xs uppercase tracking-widest text-muted-foreground block mb-2">Имя и должность</label>
                  <input
                    type="text"
                    value={contactForm.name}
                    onChange={e => setContactForm(p => ({ ...p, name: e.target.value }))}
                    className="w-full bg-background border border-border px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:border-gold transition-colors"
                    placeholder="Иван Иванов, CEO"
                  />
                </div>
                <div>
                  <label className="font-display text-xs uppercase tracking-widest text-muted-foreground block mb-2">Компания</label>
                  <input
                    type="text"
                    value={contactForm.company}
                    onChange={e => setContactForm(p => ({ ...p, company: e.target.value }))}
                    className="w-full bg-background border border-border px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:border-gold transition-colors"
                    placeholder="ООО Ваша компания"
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
              <span className="font-display font-bold text-xs text-background">A</span>
            </div>
            <span className="font-display text-sm font-semibold">APEX<span className="text-gold">GROUP</span></span>
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