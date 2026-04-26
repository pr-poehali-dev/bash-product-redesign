import Icon from "@/components/ui/icon";
import { SERVICES, useInView, type IconName } from "./constants";

const HORSE_IMAGE = "https://cdn.poehali.dev/projects/303eb9ae-730b-4b91-9067-7b12a1165491/files/8b7793cd-fa91-4aa7-9c03-6227e01690e9.jpg";

export default function AboutServices() {
  const aboutSection = useInView();
  const servicesSection = useInView();

  return (
    <>
      {/* ABOUT */}
      <section id="about" className="py-24 bg-background overflow-hidden">
        <div ref={aboutSection.ref} className="max-w-7xl mx-auto px-6">

          <div className={`relative mb-16 rounded-sm overflow-hidden ${aboutSection.inView ? "animate-fade-in" : "opacity-0"}`}>
            <img
              src={HORSE_IMAGE}
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
    </>
  );
}
