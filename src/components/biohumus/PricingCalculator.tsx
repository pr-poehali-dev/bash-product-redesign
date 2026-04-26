import { useState } from "react";
import Icon from "@/components/ui/icon";
import { PRICING_PLANS, useInView, type IconName } from "./constants";

const PRODUCTS = [
  { id: "dry5",    label: "Сухой, 5 л",     price: 290,   unit: "уп" },
  { id: "dry10",   label: "Сухой, 10 л",    price: 490,   unit: "уп" },
  { id: "dry40",   label: "Сухой, 40 л",    price: 1490,  unit: "уп" },
  { id: "liq05",   label: "Жидкий, 0.5 л",  price: 190,   unit: "фл" },
  { id: "liq1",    label: "Жидкий, 1 л",    price: 320,   unit: "фл" },
  { id: "liq5",    label: "Жидкий, 5 л",    price: 1200,  unit: "кан" },
];

const DELIVERY_OPTIONS = [
  { id: "pickup", label: "Самовывоз",      cost: 0 },
  { id: "rf",     label: "Почта России",   cost: 350 },
  { id: "sdek",   label: "СДЭК",           cost: 450 },
  { id: "company",label: "Транспортная компания", cost: 0, note: "по тарифу" },
];

export default function PricingCalculator() {
  const pricingSection = useInView();
  const calcSection = useInView();

  const [selectedProduct, setSelectedProduct] = useState("dry10");
  const [qty, setQty] = useState(5);
  const [selectedDelivery, setSelectedDelivery] = useState("pickup");

  const product = PRODUCTS.find(p => p.id === selectedProduct)!;
  const delivery = DELIVERY_OPTIONS.find(d => d.id === selectedDelivery)!;
  const subtotal = product.price * qty;
  const deliveryCost = delivery.cost;
  const total = subtotal + deliveryCost;
  const fmt = (n: number) => n.toLocaleString("ru-RU");

  return (
    <>
      {/* CALCULATOR */}
      <section id="calculator" className="py-24 bg-background">
        <div ref={calcSection.ref} className="max-w-5xl mx-auto px-6">
          <div className={`text-center mb-12 ${calcSection.inView ? "animate-fade-in" : "opacity-0"}`}>
            <div className="text-xs text-gold font-body font-medium tracking-widest uppercase mb-4">Калькулятор заказа</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase text-foreground mb-4">
              Рассчитайте стоимость<br />вашего заказа
            </h2>
            <div className="w-12 h-0.5 bg-gold mx-auto" />
          </div>

          <div className={`grid md:grid-cols-5 gap-px bg-border ${calcSection.inView ? "animate-fade-in" : "opacity-0"}`}>
            {/* Left: inputs */}
            <div className="md:col-span-3 bg-card p-8 space-y-8">

              {/* Product select */}
              <div>
                <label className="font-display text-xs uppercase tracking-widest text-muted-foreground block mb-3">Выберите продукт</label>
                <div className="grid grid-cols-2 gap-2">
                  {PRODUCTS.map(p => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedProduct(p.id)}
                      className={`px-4 py-2.5 text-xs font-body font-medium text-left border transition-colors ${
                        selectedProduct === p.id
                          ? "border-gold bg-gold/10 text-gold"
                          : "border-border text-muted-foreground hover:border-gold/50 hover:text-foreground"
                      }`}
                    >
                      {p.label}
                      <span className="block font-display font-bold mt-0.5">₽ {fmt(p.price)}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="font-display text-xs uppercase tracking-widest text-muted-foreground">Количество</label>
                  <span className="font-display font-semibold text-gold text-lg">{qty} {product.unit}</span>
                </div>
                <input
                  type="range"
                  min={1} max={100} step={1}
                  value={qty}
                  onChange={e => setQty(+e.target.value)}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1 font-body">
                  <span>1</span><span>100</span>
                </div>
              </div>

              {/* Delivery */}
              <div>
                <label className="font-display text-xs uppercase tracking-widest text-muted-foreground block mb-3">Способ доставки</label>
                <div className="space-y-2">
                  {DELIVERY_OPTIONS.map(d => (
                    <button
                      key={d.id}
                      onClick={() => setSelectedDelivery(d.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 text-xs font-body border transition-colors ${
                        selectedDelivery === d.id
                          ? "border-gold bg-gold/10 text-gold"
                          : "border-border text-muted-foreground hover:border-gold/50 hover:text-foreground"
                      }`}
                    >
                      <span className="font-medium">{d.label}</span>
                      <span className="font-display font-bold">
                        {d.cost === 0 ? (d.note ?? "Бесплатно") : `₽ ${fmt(d.cost)}`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: result */}
            <div className="md:col-span-2 bg-card p-8 flex flex-col justify-between">
              <div>
                <div className="font-display text-xs uppercase tracking-widest text-muted-foreground mb-6">Итого к оплате</div>

                <div className="space-y-5">
                  <div className="pb-4 border-b border-border">
                    <div className="font-body text-xs text-muted-foreground mb-1">Продукт</div>
                    <div className="font-display font-semibold text-foreground text-sm">{product.label}</div>
                  </div>

                  <div className="pb-4 border-b border-border">
                    <div className="font-body text-xs text-muted-foreground mb-1">Стоимость продукции</div>
                    <div className="font-display text-2xl font-bold text-foreground">₽ {fmt(subtotal)}</div>
                    <div className="font-body text-xs text-muted-foreground mt-1">
                      {qty} {product.unit} × ₽ {fmt(product.price)}
                    </div>
                  </div>

                  <div className="pb-4 border-b border-border">
                    <div className="font-body text-xs text-muted-foreground mb-1">Доставка</div>
                    <div className="font-display text-lg font-semibold text-foreground">
                      {deliveryCost === 0
                        ? (delivery.note ? delivery.note : "Бесплатно")
                        : `₽ ${fmt(deliveryCost)}`}
                    </div>
                  </div>

                  <div className="pb-2">
                    <div className="font-body text-xs text-muted-foreground mb-1">Итого</div>
                    <div className="font-display text-3xl font-bold text-gold">
                      {delivery.note ? `от ₽ ${fmt(subtotal)}` : `₽ ${fmt(total)}`}
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gold/5 border border-gold/20">
                  <p className="font-body text-xs text-muted-foreground leading-relaxed">
                    * Стоимость доставки транспортной компанией рассчитывается отдельно по вашему региону.
                  </p>
                </div>
              </div>

              <a href="#contacts" className="mt-8 block text-center px-6 py-3.5 bg-gold text-background font-display font-medium text-sm tracking-wide uppercase hover:opacity-90 transition-opacity">
                Оформить заказ
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
