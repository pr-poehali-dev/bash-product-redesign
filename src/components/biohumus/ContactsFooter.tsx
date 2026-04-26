import { useState } from "react";
import Icon from "@/components/ui/icon";
import { NAV_LINKS, useInView, type IconName } from "./constants";

export default function ContactsFooter() {
  const contactSection = useInView();
  const [contactForm, setContactForm] = useState({ name: "", company: "", email: "", message: "" });

  return (
    <>
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
                    <a href="https://vk.com/bashproduct02" target="_blank" rel="noopener noreferrer" className="font-body text-sm text-foreground hover:text-gold transition-colors">vk.com/bashproduct02</a>
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
          <img
            src="https://cdn.poehali.dev/projects/303eb9ae-730b-4b91-9067-7b12a1165491/bucket/a1edf7d8-4bca-4621-aace-a1169d3c9f43.jpg"
            alt="Башкирская органика & продукция"
            className="h-8 w-auto object-contain brightness-[5] contrast-50 invert"
          />
          <p className="font-body text-xs text-muted-foreground">© 2025 Башкирская органика & продукция. Все права защищены.</p>
          <div className="flex gap-6">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} className="font-body text-xs text-muted-foreground hover:text-gold transition-colors">{l.label}</a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}