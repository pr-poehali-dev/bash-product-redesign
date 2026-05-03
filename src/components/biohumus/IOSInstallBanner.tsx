import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

export default function IOSInstallBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
    const dismissed = sessionStorage.getItem("ios-banner-dismissed");
    if (isIOS && !isStandalone && !dismissed) {
      setTimeout(() => setVisible(true), 2000);
    }
  }, []);

  const dismiss = () => {
    sessionStorage.setItem("ios-banner-dismissed", "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pointer-events-none">
      <div className="pointer-events-auto max-w-sm mx-auto bg-card border border-gold/30 rounded-2xl shadow-2xl p-4 flex flex-col gap-3 animate-in slide-in-from-bottom-4 duration-300">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src="https://cdn.poehali.dev/projects/303eb9ae-730b-4b91-9067-7b12a1165491/files/favicon-1777226477666.png"
              alt="Биогумус"
              className="w-12 h-12 rounded-xl border border-border object-cover"
            />
            <div>
              <p className="font-display font-semibold text-sm">Биогумус</p>
              <p className="font-body text-xs text-muted-foreground">Башкирская органика</p>
            </div>
          </div>
          <button onClick={dismiss} className="text-muted-foreground hover:text-foreground p-1">
            <Icon name="X" size={16} />
          </button>
        </div>

        <p className="font-body text-sm text-foreground/80">
          Установите приложение на экран домой — открывается без браузера, как обычное приложение.
        </p>

        <div className="flex items-center gap-2 bg-muted/50 rounded-xl px-3 py-2">
          <Icon name="Share" size={16} className="text-gold shrink-0" />
          <span className="font-body text-xs text-muted-foreground">
            Нажмите <span className="text-foreground font-medium">«Поделиться»</span> внизу экрана
          </span>
        </div>
        <div className="flex items-center gap-2 bg-muted/50 rounded-xl px-3 py-2">
          <Icon name="Plus" size={16} className="text-gold shrink-0" />
          <span className="font-body text-xs text-muted-foreground">
            Выберите <span className="text-foreground font-medium">«На экран домой»</span>
          </span>
        </div>
      </div>
    </div>
  );
}
