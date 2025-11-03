import { useState } from "react";
import { Card } from "@/components/ui/card";

interface Location {
  id: string;
  name: string;
  nameGreek: string;
  x: number; // percentagem da largura
  y: number; // percentagem da altura
  year?: string;
  description: string;
}

const locations: Location[] = [
  {
    id: "samos",
    name: "Samos",
    nameGreek: "Σάμος",
    x: 72,
    y: 58,
    year: "341 π.Χ.",
    description: "Ilha natal de Epicuro. Nasceu aqui de pais atenienses, sendo portanto cidadão de Atenas por direito de nascimento."
  },
  {
    id: "teos",
    name: "Teos",
    nameGreek: "Τέως",
    x: 70,
    y: 54,
    year: "323 π.Χ.",
    description: "Estudou filosofia com Nausífanes, discípulo de Demócrito, aprendendo a teoria atomista que viria a desenvolver."
  },
  {
    id: "colophon",
    name: "Colofão",
    nameGreek: "Κολοφών",
    x: 71,
    y: 55,
    description: "Passou algum tempo nesta cidade da Jónia, continuando os seus estudos filosóficos."
  },
  {
    id: "mytilene",
    name: "Mitilene",
    nameGreek: "Μυτιλήνη",
    x: 68,
    y: 50,
    year: "311 π.Χ.",
    description: "Fundou a sua primeira escola filosófica em Lesbos, mas enfrentou oposição e partiu após pouco tempo."
  },
  {
    id: "lampsacus",
    name: "Lâmpsaco",
    nameGreek: "Λάμψακος",
    x: 70,
    y: 47,
    year: "310 π.Χ.",
    description: "Estabeleceu uma escola bem-sucedida, ganhando discípulos importantes como Metrodoro, Pólien e Hermarco."
  },
  {
    id: "athens",
    name: "Atenas",
    nameGreek: "Ἀθῆναι",
    x: 60,
    y: 62,
    year: "307 π.Χ.",
    description: "Fundou o Jardim (Ὁ Κῆπος), a sua escola filosófica mais famosa, onde ensinou até à morte em 270 π.Χ. Aqui escreveu as suas obras principais e formou uma comunidade de amigos dedicados à filosofia."
  }
];

interface EpicurusMapProps {
  language: 'el' | 'pt';
}

export default function EpicurusMap({ language }: EpicurusMapProps) {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  return (
    <div className="space-y-8">
      {/* Mapa */}
      <div className="relative w-full aspect-[16/10] bg-muted/30 rounded-lg border-2 border-border overflow-hidden">
        {/* Fundo do mapa estilizado */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 625" preserveAspectRatio="xMidYMid slice">
          {/* Mar Mediterrâneo */}
          <rect x="0" y="0" width="1000" height="625" fill="oklch(0.88 0.015 220)" opacity="0.3" />
          
          {/* Grécia (simplificado) */}
          <path
            d="M 550 550 L 580 520 L 600 540 L 620 520 L 640 550 L 620 580 L 580 600 L 550 580 Z"
            fill="oklch(0.75 0.02 40)"
            stroke="oklch(0.5 0.02 40)"
            strokeWidth="2"
          />
          
          {/* Ásia Menor (simplificado) */}
          <path
            d="M 650 400 L 750 420 L 780 480 L 760 540 L 720 580 L 680 560 L 660 500 L 670 450 Z"
            fill="oklch(0.75 0.02 40)"
            stroke="oklch(0.5 0.02 40)"
            strokeWidth="2"
          />
          
          {/* Ilhas (Lesbos, Samos, etc) */}
          <circle cx="680" cy="500" r="15" fill="oklch(0.75 0.02 40)" stroke="oklch(0.5 0.02 40)" strokeWidth="2" />
          <circle cx="720" cy="580" r="12" fill="oklch(0.75 0.02 40)" stroke="oklch(0.5 0.02 40)" strokeWidth="2" />
          
          {/* Rotas (linhas pontilhadas conectando as cidades) */}
          <path
            d="M 720 580 L 710 540 L 700 470 L 680 500 L 700 470 L 600 540"
            fill="none"
            stroke="oklch(0.4 0.05 0)"
            strokeWidth="2"
            strokeDasharray="8,4"
            opacity="0.4"
          />
        </svg>
        
        {/* Marcadores das cidades */}
        {locations.map((loc) => (
          <div
            key={loc.id}
            className="absolute cursor-pointer group"
            style={{
              left: `${loc.x}%`,
              top: `${loc.y}%`,
              transform: 'translate(-50%, -100%)'
            }}
            onClick={() => setSelectedLocation(loc)}
            onMouseEnter={() => setSelectedLocation(loc)}
          >
            {/* Marcador */}
            <div className="map-marker relative">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-foreground text-background px-2 py-1 rounded text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {language === 'el' ? loc.nameGreek : loc.name}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Informação da localização seleccionada */}
      {selectedLocation && (
        <Card className="letter-card p-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-start gap-4">
            <div className="wax-seal-small shrink-0">
              {selectedLocation.id.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2">
                {language === 'el' ? selectedLocation.nameGreek : selectedLocation.name}
              </h3>
              {selectedLocation.year && (
                <div className="text-sm font-semibold mb-3 text-accent">
                  {selectedLocation.year}
                </div>
              )}
              <p className="leading-relaxed text-base">
                {selectedLocation.description}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Legenda */}
      <div className="text-center text-sm text-muted-foreground italic">
        {language === 'el' 
          ? 'Κλικ στα σημεία για να δεις περισσότερες πληροφορίες'
          : 'Clique nos marcadores para ver mais informações sobre cada localização'}
      </div>

      {/* Cronologia */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-center mb-6">
          {language === 'el' ? 'Χρονολόγιο' : 'Cronologia das Viagens'}
        </h3>
        <div className="space-y-3">
          {locations.filter(loc => loc.year).map((loc, idx) => (
            <div 
              key={loc.id}
              className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={() => setSelectedLocation(loc)}
            >
              <div className="text-2xl font-bold text-accent shrink-0 w-12">
                {idx + 1}
              </div>
              <div className="flex-1">
                <div className="font-bold">
                  {language === 'el' ? loc.nameGreek : loc.name}
                </div>
                <div className="text-sm text-muted-foreground">
                  {loc.year}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
