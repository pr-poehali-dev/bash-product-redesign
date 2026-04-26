import Icon from "@/components/ui/icon";
import { HERO_IMAGE, STATS, useInView, type IconName } from "./constants";

export default function HeroSection() {
  const heroSection = useInView();

  return (
    <>
      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />

        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }} />

        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gold/5 hidden lg:block" />

        <div ref={heroSection.ref} className="relative max-w-7xl mx-auto px-6 pt-24 pb-16 w-full">
          <div className={`max-w-2xl ${heroSection.inView ? "animate-slide-up" : "opacity-0"}`}>

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

      {/* HOW IT WORKS */}
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
    </>
  );
}