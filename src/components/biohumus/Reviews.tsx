import Icon from "@/components/ui/icon";
import { useInView } from "./constants";

const REVIEWS = [
  {
    name: "Светлана Морозова",
    city: "Казань",
    text: "Использую биогумус уже второй сезон. Помидоры выросли просто огромные, соседи спрашивают — в чём секрет. Заказывала жидкий 5 литров, хватило на весь огород. Доставка быстрая, упаковка целая.",
    product: "Жидкий биогумус, 5 л",
    rating: 5,
  },
  {
    name: "Алексей Петров",
    city: "Екатеринбург",
    text: "Брал сухой 40 литров для теплицы. Разница с прошлым годом заметна невооружённым глазом — рассада крепкая, болеет меньше. Цена адекватная, буду брать ещё.",
    product: "Сухой биогумус, 40 л",
    rating: 5,
  },
  {
    name: "Надежда Ильина",
    city: "Новосибирск",
    text: "Давно хотела попробовать органику вместо химии. Взяла на пробу 5 литров сухого. Клубника в этом году — просто загляденье, крупная и сладкая. Теперь только биогумус.",
    product: "Сухой биогумус, 5 л",
    rating: 5,
  },
  {
    name: "Виктор Соколов",
    city: "Уфа",
    text: "Закупаю оптом для своего садового центра уже полтора года. Клиенты довольны, возвращаются. Качество стабильное, с поставками проблем не было. Рекомендую как надёжного поставщика.",
    product: "Оптовые поставки",
    rating: 5,
  },
  {
    name: "Татьяна Волкова",
    city: "Самара",
    text: "Заказала жидкий концентрат 1 литр для комнатных цветов. Развожу 1:10 как написано в инструкции — цветы ожили, появились новые листья. Очень довольна, буду брать снова.",
    product: "Жидкий биогумус, 1 л",
    rating: 5,
  },
  {
    name: "Игорь Захаров",
    city: "Пермь",
    text: "Скептически относился к органическим удобрениям, но результат удивил. Картофель вырос крупный, без нитратов. Дети едят спокойно. Заказал уже третий раз, качество не меняется.",
    product: "Сухой биогумус, 10 л",
    rating: 5,
  },
  {
    name: "Ольга Смирнова",
    city: "Челябинск",
    text: "Получила посылку очень быстро — через 4 дня после заказа. Упаковка надёжная, ничего не просыпалось. Уже применила на грядках с огурцами, жду результата. По качеству самого продукта вопросов нет.",
    product: "Сухой биогумус, 5 л",
    rating: 5,
  },
];

export default function Reviews() {
  const section = useInView();

  return (
    <section id="reviews" className="py-24 bg-muted/30">
      <div
        ref={section.ref}
        className={`max-w-7xl mx-auto px-6 transition-all duration-700 ${section.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="text-center mb-14">
          <span className="text-xs font-body uppercase tracking-widest text-gold">Отзывы</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">
            Что говорят <span className="text-gold">покупатели</span>
          </h2>
          <p className="font-body text-muted-foreground mt-3 max-w-xl mx-auto">
            Более 1000 довольных клиентов по всей России
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((r, i) => (
            <div
              key={i}
              className="bg-background border border-border rounded-xl p-6 flex flex-col gap-4 hover:border-gold/40 transition-colors"
            >
              <div className="flex gap-1">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <Icon key={j} name="Star" size={14} className="text-gold fill-gold" />
                ))}
              </div>
              <p className="font-body text-sm text-foreground/80 leading-relaxed flex-1">"{r.text}"</p>
              <div className="border-t border-border pt-4 flex items-center justify-between">
                <div>
                  <p className="font-display text-sm font-semibold">{r.name}</p>
                  <p className="font-body text-xs text-muted-foreground">{r.city}</p>
                </div>
                <span className="text-xs font-body text-gold bg-gold/10 px-2 py-1 rounded-full">{r.product}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
