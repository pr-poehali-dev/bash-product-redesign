import { useState } from "react";
import Icon from "@/components/ui/icon";
import { PRICING_PLANS, SERVICE_TYPES, useInView, type IconName } from "./constants";

export default function PricingCalculator() {
  const pricingSection = useInView();
  const calcSection = useInView();

  const [selectedService, setSelectedService] = useState("strategy");
  const [employees, setEmployees] = useState(100);
  const [revenue, setRevenue] = useState(200);
  const [duration, setDuration] = useState(6);

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

  return (
    <>
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
                        {"badge" in item && item.badge && (
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
    </>
  );
}
