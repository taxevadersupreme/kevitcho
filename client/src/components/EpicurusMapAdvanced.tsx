import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface Location {
  id: string;
  name: string;
  nameGreek: string;
  lat: number;
  lng: number;
  year?: string;
  description: string;
}

const locations: Location[] = [
  {
    id: "samos",
    name: "Samos",
    nameGreek: "Σάμος",
    lat: 37.75,
    lng: 26.98,
    year: "341 π.Χ.",
    description: "Ilha natal de Epicuro. Nasceu aqui de pais atenienses, sendo portanto cidadão de Atenas por direito de nascimento."
  },
  {
    id: "teos",
    name: "Teos",
    nameGreek: "Τέως",
    lat: 38.18,
    lng: 26.78,
    year: "323 π.Χ.",
    description: "Estudou filosofia com Nausífanes, discípulo de Demócrito, aprendendo a teoria atomista que viria a desenvolver."
  },
  {
    id: "colophon",
    name: "Colofão",
    nameGreek: "Κολοφών",
    lat: 38.05,
    lng: 27.23,
    description: "Passou algum tempo nesta cidade da Jónia, continuando os seus estudos filosóficos."
  },
  {
    id: "mytilene",
    name: "Mitilene",
    nameGreek: "Μυτιλήνη",
    lat: 39.11,
    lng: 26.55,
    year: "311 π.Χ.",
    description: "Fundou a sua primeira escola filosófica em Lesbos, mas enfrentou oposição e partiu após pouco tempo."
  },
  {
    id: "lampsacus",
    name: "Lâmpsaco",
    nameGreek: "Λάμψακος",
    lat: 40.35,
    lng: 26.69,
    year: "310 π.Χ.",
    description: "Estabeleceu uma escola bem-sucedida, ganhando discípulos importantes como Metrodoro, Pólien e Hermarco."
  },
  {
    id: "athens",
    name: "Atenas",
    nameGreek: "Ἀθῆναι",
    lat: 37.98,
    lng: 23.73,
    year: "307 π.Χ.",
    description: "Fundou o Jardim (Ὁ Κῆπος), a sua escola filosófica mais famosa, onde ensinou até à morte em 270 π.Χ. Aqui escreveu as suas obras principais e formou uma comunidade de amigos dedicados à filosofia."
  }
];

interface EpicurusMapAdvancedProps {
  language: 'el' | 'pt';
}

export default function EpicurusMapAdvanced({ language }: EpicurusMapAdvancedProps) {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapInstance, setMapInstance] = useState<any>(null);

  useEffect(() => {
    // Carregar CSS do Leaflet
    if (!document.querySelector('link[href*="leaflet.css"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
      link.crossOrigin = '';
      document.head.appendChild(link);
    }

    // Carregar Leaflet dinamicamente
    if (typeof window !== 'undefined' && !(window as any).L) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
      script.crossOrigin = '';
      script.onload = () => {
        setMapLoaded(true);
      };
      document.body.appendChild(script);
    } else if ((window as any).L) {
      setMapLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!mapLoaded || mapInstance) return;

    const L = (window as any).L;
    if (!L) return;

    // Criar mapa centrado no Mar Egeu
    const map = L.map('epicurus-map', {
      center: [38.5, 25.5],
      zoom: 7,
      minZoom: 6,
      maxZoom: 10,
      scrollWheelZoom: false,
      zoomControl: true
    });

    // Tile layer estilo antigo/sépia
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
      className: 'map-tiles-sepia'
    }).addTo(map);

    // Ícone personalizado para marcadores
    const customIcon = L.divIcon({
      className: 'custom-marker',
      html: `
        <div style="
          width: 32px;
          height: 32px;
          background: oklch(0.4 0.05 0);
          border: 3px solid oklch(0.96 0.015 42);
          border-radius: 50%;
          box-shadow: 0 3px 8px rgba(0, 0, 0, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          color: oklch(0.96 0.015 42);
          font-size: 14px;
          cursor: pointer;
          transition: transform 0.2s;
        ">
          Ε
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });

    // Adicionar marcadores
    locations.forEach((loc) => {
      const marker = L.marker([loc.lat, loc.lng], { icon: customIcon })
        .addTo(map)
        .on('click', () => {
          setSelectedLocation(loc);
          map.setView([loc.lat, loc.lng], 8, { animate: true });
        });
    });

    // Desenhar linhas conectando as cidades em ordem cronológica
    const orderedLocations = locations.filter(loc => loc.year).sort((a, b) => {
      const yearA = parseInt(a.year!.match(/\d+/)![0]);
      const yearB = parseInt(b.year!.match(/\d+/)![0]);
      return yearB - yearA; // Ordem decrescente (mais antigo primeiro)
    });

    const polylinePoints = orderedLocations.map(loc => [loc.lat, loc.lng] as [number, number]);
    L.polyline(polylinePoints, {
      color: 'oklch(0.4 0.05 0)',
      weight: 2,
      opacity: 0.5,
      dashArray: '10, 10',
      lineJoin: 'round'
    }).addTo(map);

    setMapInstance(map);

    return () => {
      map.remove();
    };
  }, [mapLoaded]);

  return (
    <div className="space-y-6">
      {/* Container do Mapa */}
      <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden border-2 border-border shadow-lg">
        <div id="epicurus-map" className="w-full h-full" />
        
        {!mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
              <p className="text-sm text-muted-foreground">
                {language === 'el' ? 'Φόρτωση χάρτη...' : 'A carregar mapa...'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Informação da localização seleccionada */}
      {selectedLocation && (
        <Card className="letter-card p-6 animate-in fade-in slide-in-from-bottom-4 duration-300 relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4"
            onClick={() => setSelectedLocation(null)}
          >
            <X className="h-4 w-4" />
          </Button>
          
          <div className="flex items-start gap-4 pr-8">
            <div className="wax-seal-small shrink-0">
              {selectedLocation.name.charAt(0)}
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

      {/* Cronologia */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-center">
          {language === 'el' ? 'Χρονολόγιο Ταξιδιῶν' : 'Cronologia das Viagens'}
        </h3>
        <div className="grid gap-3">
          {locations.filter(loc => loc.year).sort((a, b) => {
            const yearA = parseInt(a.year!.match(/\d+/)![0]);
            const yearB = parseInt(b.year!.match(/\d+/)![0]);
            return yearB - yearA;
          }).map((loc, idx) => (
            <button
              key={loc.id}
              className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg border border-border hover:bg-muted/50 hover:border-accent transition-all text-left w-full"
              onClick={() => {
                setSelectedLocation(loc);
                if (mapInstance) {
                  mapInstance.setView([loc.lat, loc.lng], 8, { animate: true });
                }
              }}
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
            </button>
          ))}
        </div>
      </div>

      <style>{`
        .map-tiles-sepia {
          filter: sepia(0.3) contrast(1.1);
        }
        
        .custom-marker:hover > div {
          transform: scale(1.2);
        }
        
        .leaflet-container {
          background: oklch(0.88 0.015 220) !important;
          font-family: 'Cinzel', serif !important;
        }
        
        .leaflet-popup-content-wrapper {
          background: oklch(0.92 0.02 42) !important;
          border: 2px solid oklch(0.75 0.02 38) !important;
          border-radius: 0.5rem !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
        }
        
        .leaflet-popup-tip {
          background: oklch(0.92 0.02 42) !important;
          border: 2px solid oklch(0.75 0.02 38) !important;
        }
      `}</style>
    </div>
  );
}
