import { Button } from "@/components/ui/button";

interface LanguageToggleProps {
  language: 'el' | 'pt';
  onToggle: () => void;
}

export default function LanguageToggle({ language, onToggle }: LanguageToggleProps) {
  return (
    <Button
      onClick={onToggle}
      variant="outline"
      size="sm"
      className="border-2 border-foreground font-bold hover:bg-accent hover:text-accent-foreground"
    >
      {language === 'el' ? 'ΕΛΛΗΝΙΚΑ' : 'PORTUGUÊS'}
      <span className="ml-2 text-xs opacity-70">
        {language === 'el' ? '→ PT' : '→ ΕΛ'}
      </span>
    </Button>
  );
}
