import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { BookOpen, X } from "lucide-react";
import { epicurusLetters } from "@/data/letters";

interface PhilosophySidebarProps {
  language: 'el' | 'pt';
}

type LetterType = 'menoikeus' | 'herodotus' | 'pythocles';

export default function PhilosophySidebar({ language }: PhilosophySidebarProps) {
  const [open, setOpen] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState<LetterType | null>(null);

  const letters = [
    {
      id: 'menoikeus' as LetterType,
      title: { pt: 'Carta a Meneceu', el: 'Πρὸς Μενοικέα' },
      subtitle: 'Sobre a Vida Feliz',
      icon: 'Ⅰ'
    },
    {
      id: 'herodotus' as LetterType,
      title: { pt: 'Carta a Heródoto', el: 'Πρὸς Ἡρόδοτον' },
      subtitle: 'Sobre a Física',
      icon: 'Ⅱ'
    },
    {
      id: 'pythocles' as LetterType,
      title: { pt: 'Carta a Pítocles', el: 'Πρὸς Πυθοκλέα' },
      subtitle: 'Sobre os Fenómenos Celestes',
      icon: 'Ⅲ'
    }
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="gap-2 border-2 hover:border-accent hover:bg-accent/10 transition-all"
        >
          <BookOpen className="h-5 w-5" />
          {language === 'el' ? 'Φιλοσοφικαὶ Ἐπιστολαί' : 'Cartas Filosóficas'}
        </Button>
      </SheetTrigger>
      
      <SheetContent side="right" className="w-full overflow-y-auto p-8 md:p-12">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-2xl font-bold">
            {language === 'el' ? 'Αἱ Τρεῖς Ἐπιστολαί' : 'As Três Cartas'}
          </SheetTitle>
        </SheetHeader>

        {!selectedLetter ? (
          <div className="space-y-4">
            {letters.map((letter, idx) => (
              <button
                key={letter.id}
                onClick={() => setSelectedLetter(letter.id)}
                className="sidebar-letter-card w-full p-6 rounded-lg text-left group sidebar-animate-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="wax-seal-small shrink-0 group-hover:scale-110 transition-transform">
                    {letter.icon}
                  </div>
                  <div className="flex-1 sidebar-content">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                      {letter.title[language]}
                    </h3>
                    <p className="text-sm text-muted-foreground italic">
                      {letter.subtitle}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedLetter(null)}
              className="mb-4"
            >
              ← {language === 'el' ? 'Πίσω' : 'Voltar'}
            </Button>

            {/* Carta a Meneceu */}
            {selectedLetter === 'menoikeus' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex items-start gap-4">
                  <div className="wax-seal-small shrink-0">Ⅰ</div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">
                      {epicurusLetters.toMenoikeus.title[language]}
                    </h2>
                    <p className="text-muted-foreground italic">Sobre a Vida Feliz</p>
                  </div>
                </div>

                <div className="prose prose-sm max-w-none">
                  <p className={`leading-relaxed mb-4 ${language === 'el' ? 'greek-text' : ''}`}>
                    {epicurusLetters.toMenoikeus.introduction[language]}
                  </p>

                  {language === 'pt' && (
                    <p className="leading-relaxed mb-6">
                      Pois nunca é demasiado cedo nem demasiado tarde para cuidar da saúde da alma.
                    </p>
                  )}

                  <div className="space-y-6 mt-6">
                    {epicurusLetters.toMenoikeus.sections.map((section, idx) => (
                      <div key={idx} className="sidebar-section">
                        <h3>
                          {section.topic}
                        </h3>
                        <p className="sidebar-text">
                          {section.portuguese}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="sidebar-conclusion">
                    <p className={`${language === 'el' ? 'greek-text' : ''}`}>
                      {epicurusLetters.toMenoikeus.conclusion[language]}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Carta a Heródoto */}
            {selectedLetter === 'herodotus' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex items-start gap-4">
                  <div className="wax-seal-small shrink-0">Ⅱ</div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">
                      {epicurusLetters.toHerodotus.title[language]}
                    </h2>
                    <p className="text-muted-foreground italic">Sobre a Física</p>
                  </div>
                </div>

                <div className="prose prose-sm max-w-none">
                  <p className={`leading-relaxed mb-4 ${language === 'el' ? 'greek-text' : ''}`}>
                    {epicurusLetters.toHerodotus.introduction[language]}
                  </p>

                  {language === 'pt' && (
                    <p className="leading-relaxed mb-6">
                      {epicurusLetters.toHerodotus.summary}
                    </p>
                  )}

                  <div className="space-y-6 mt-6">
                    {epicurusLetters.toHerodotus.keyPoints.map((point, idx) => (
                      <div key={idx} className="sidebar-section">
                        <h3>
                          {point.topic}
                        </h3>
                        <p className="sidebar-text">
                          {point.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Carta a Pítocles */}
            {selectedLetter === 'pythocles' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex items-start gap-4">
                  <div className="wax-seal-small shrink-0">Ⅲ</div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">
                      {epicurusLetters.toPythocles.title[language]}
                    </h2>
                    <p className="text-muted-foreground italic">Sobre os Fenómenos Celestes</p>
                  </div>
                </div>

                <div className="prose prose-sm max-w-none">
                  <p className={`leading-relaxed mb-4 ${language === 'el' ? 'greek-text' : ''}`}>
                    {epicurusLetters.toPythocles.introduction[language]}
                  </p>

                  {language === 'pt' && (
                    <p className="leading-relaxed mb-6">
                      {epicurusLetters.toPythocles.summary}
                    </p>
                  )}

                  <div className="space-y-6 mt-6">
                    {epicurusLetters.toPythocles.keyPoints.map((point, idx) => (
                      <div key={idx} className="sidebar-section">
                        <h3>
                          {point.topic}
                        </h3>
                        <p className="sidebar-text">
                          {point.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
