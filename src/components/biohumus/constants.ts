import { useRef, useState, useEffect } from "react";

export type IconName = string;

export const HERO_IMAGE = "https://cdn.poehali.dev/projects/303eb9ae-730b-4b91-9067-7b12a1165491/files/5255d4de-f8fd-4305-997e-f2b171b5480e.jpg";

export const NAV_LINKS = [
  { label: "Главная", href: "#home" },
  { label: "О нас", href: "#about" },
  { label: "Услуги", href: "#services" },
  { label: "Цены", href: "#pricing" },
  { label: "Контакты", href: "#contacts" },
];

export const SERVICES = [
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

export const PRICING_PLANS = [
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

export const STATS = [
  { value: "100%", label: "органический состав" },
  { value: "50%", label: "рост урожайности" },
  { value: "5+", label: "лет на рынке" },
  { value: "1 000+", label: "довольных клиентов" },
];

export const SERVICE_TYPES = [
  { id: "strategy", label: "Стратегический консалтинг", base: 120000 },
  { id: "operations", label: "Операционная оптимизация", base: 95000 },
  { id: "financial", label: "Финансовое моделирование", base: 80000 },
  { id: "team", label: "Трансформация команды", base: 70000 },
];

export function useInView(threshold = 0.15) {
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
