import { useState } from "react";
import { remedyPhilosophy } from "@/data/letters";
import { remedyMachiavellian } from "@/data/remedy-machiavellian";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import PhilosophySidebar from "@/components/PhilosophySidebar";
import EpicurusMapAdvanced from "@/components/EpicurusMapAdvanced";
import { ChevronDown, Sparkles, Heart, Brain, Leaf, Check, X, AlertCircle, Shield, Clock, Award } from "lucide-react";

export default function Home() {
  const [language, setLanguage] = useState<'el' | 'pt'>('pt');
  const [showMap, setShowMap] = useState(false);
  
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'el' ? 'pt' : 'el');
  };

  const scrollToContent = () => {
    document.getElementById('remedy-content')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Product - Mobile First */}
      <section className="relative min-h-screen flex items-center px-3 sm:px-4 py-12 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-2 text-6xl sm:text-9xl">Φ</div>
          <div className="absolute bottom-10 right-2 text-6xl sm:text-9xl">Ε</div>
        </div>

        <div className="w-full relative z-10">
          <div className="flex justify-end mb-6 sm:mb-8">
            <Button
              onClick={toggleLanguage}
              variant="outline"
              size="sm"
              className="border-2 text-xs sm:text-sm"
            >
              {language === 'el' ? 'ΕΛ' : 'PT'}
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            {/* Left: Copy */}
            <div className="space-y-4 sm:space-y-6 lg:space-y-8">
              <div className="wax-seal-small inline-block" style={{ width: '50px', height: '50px', fontSize: '1.5rem' }}>
                Φ
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                {remedyPhilosophy.title[language]}
              </h1>
              
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-accent">
                {remedyMachiavellian.hero.tagline[language]}
              </p>

              <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
                {remedyMachiavellian.hero.subtagline[language]}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button
                  onClick={scrollToContent}
                  size="lg"
                  className="gap-2 text-sm sm:text-base px-4 sm:px-8 py-5 sm:py-6 w-full sm:w-auto"
                >
                  <Sparkles className="h-4 sm:h-5 w-4 sm:w-5" />
                  {remedyMachiavellian.cta.primary[language]}
                </Button>
                
                <PhilosophySidebar language={language} />
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground italic">
                {remedyMachiavellian.cta.subtle}
              </p>
            </div>

            {/* Right: Product Image */}
            <div className="relative mt-6 sm:mt-0">
              <div className="relative z-10">
                <img 
                  src="https://imgur.com/a/58PcRbU" 
                  alt="Epicurus® - Frasco de Suplemento Filosófico"
                  className="w-full h-auto drop-shadow-2xl"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-accent/5 blur-3xl -z-10"></div>
            </div>
          </div>

          <div className="mt-12 sm:mt-16 text-center">
            <Button
              onClick={scrollToContent}
              variant="ghost"
              size="lg"
              className="animate-bounce"
            >
              <ChevronDown className="h-6 sm:h-8 w-6 sm:w-8" />
            </Button>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section id="remedy-content" className="py-12 sm:py-16 md:py-20 px-3 sm:px-4 bg-muted/30">
        <div className="w-full max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-3 sm:mb-4">
            {remedyMachiavellian.problems.title}
          </h2>
          <p className="text-center text-base sm:text-lg md:text-xl text-muted-foreground mb-8 sm:mb-12 max-w-3xl mx-auto">
            {remedyMachiavellian.problems.intro}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {remedyMachiavellian.problems.list.map((problem, idx) => (
              <Card key={idx} className="p-4 sm:p-6 border-2 border-destructive/30 hover:border-destructive transition-all hover:shadow-lg">
                <div className="flex items-start gap-3 mb-3">
                  <AlertCircle className="h-5 sm:h-6 w-5 sm:w-6 text-destructive shrink-0 mt-1" />
                  <h3 className="font-bold text-base sm:text-lg leading-tight">{problem.symptom}</h3>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {problem.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-12 sm:py-16 md:py-20 px-3 sm:px-4">
        <div className="w-full max-w-5xl mx-auto">
          <Card className="letter-card p-6 sm:p-8 md:p-12 border-2 border-accent/30">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-center">
              {remedyMachiavellian.solution.title}
            </h2>
            <div className="space-y-4 sm:space-y-6 text-base sm:text-lg leading-relaxed">
              <p>{remedyMachiavellian.solution.intro}</p>
              <p className="font-semibold text-accent">{remedyMachiavellian.solution.revelation}</p>
              <p>{remedyMachiavellian.solution.bridge}</p>
              <div className="p-4 sm:p-6 bg-accent/10 border-l-4 border-accent rounded-r mt-6">
                <p className="text-lg sm:text-xl font-bold italic">
                  {remedyMachiavellian.solution.keyInsight}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 sm:py-16 md:py-20 px-3 sm:px-4 bg-muted/30">
        <div className="w-full max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-3 sm:mb-4">
            {remedyMachiavellian.howItWorks.title}
          </h2>
          <p className="text-center text-base sm:text-lg md:text-xl text-muted-foreground mb-4">
            {remedyMachiavellian.howItWorks.subtitle}
          </p>
          <p className="text-center text-sm sm:text-base md:text-lg mb-8 sm:mb-12 max-w-3xl mx-auto">
            {remedyMachiavellian.howItWorks.intro}
          </p>

          <div className="space-y-4 sm:space-y-6 md:space-y-8">
            {remedyMachiavellian.howItWorks.principles.map((principle) => (
              <Card key={principle.number} className="letter-card p-4 sm:p-6 md:p-8 hover:shadow-xl transition-all border-2 hover:border-accent/50">
                <div className="flex gap-4 sm:gap-6">
                  <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-accent shrink-0 w-16 sm:w-20 text-center">
                    {principle.number}
                  </div>
                  <div className="flex-1 space-y-3 sm:space-y-4">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold">
                      {principle.name}
                      <span className="ml-2 sm:ml-3 text-sm sm:text-base font-normal greek-text opacity-70">
                        ({principle.greek})
                      </span>
                    </h3>
                    <div>
                      <span className="text-xs sm:text-sm font-semibold text-accent uppercase tracking-wide">Mecanismo: </span>
                      <span className="text-xs sm:text-sm">{principle.mechanism}</span>
                    </div>
                    <p className="text-sm sm:text-base leading-relaxed">
                      {principle.effect}
                    </p>
                    <div className="text-xs sm:text-sm text-muted-foreground italic flex items-center gap-2">
                      <Clock className="h-3 sm:h-4 w-3 sm:w-4" />
                      {principle.duration}
                    </div>
                    {principle.testimonial && (
                      <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-muted/50 border-l-4 border-accent/50 rounded-r italic text-xs sm:text-sm">
                        {principle.testimonial}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Scarcity */}
      <section className="py-12 sm:py-16 md:py-20 px-3 sm:px-4">
        <div className="w-full max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-12">
            {remedyMachiavellian.scarcity.title}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {remedyMachiavellian.scarcity.reasons.map((item, idx) => (
              <Card key={idx} className="p-4 sm:p-6 text-center border-2 border-accent/30 hover:border-accent transition-all">
                <div className="inline-flex items-center justify-center w-12 sm:w-16 h-12 sm:h-16 rounded-full bg-accent/10 mb-4">
                  <Shield className="h-6 sm:h-8 w-6 sm:w-8 text-accent" />
                </div>
                <h3 className="font-bold text-lg sm:text-xl mb-3">{item.reason}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {item.explanation}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After */}
      <section className="py-12 sm:py-16 md:py-20 px-3 sm:px-4 bg-muted/30">
        <div className="w-full max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4">
            {remedyMachiavellian.beforeAfter.title}
          </h2>
          <p className="text-center text-base sm:text-lg md:text-xl text-muted-foreground mb-8 sm:mb-12">
            {remedyMachiavellian.beforeAfter.subtitle}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {/* Before */}
            <Card className="p-4 sm:p-6 md:p-8 border-2 border-destructive/30">
              <div className="flex items-center gap-3 mb-2">
                <X className="h-6 sm:h-8 w-6 sm:w-8 text-destructive" />
                <div>
                  <h3 className="text-lg sm:text-2xl font-bold">
                    {remedyMachiavellian.beforeAfter.comparison.before.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-destructive font-semibold">
                    {remedyMachiavellian.beforeAfter.comparison.before.state}
                  </p>
                </div>
              </div>
              <ul className="space-y-2 sm:space-y-3 mt-6">
                {remedyMachiavellian.beforeAfter.comparison.before.characteristics.map((char, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <X className="h-4 sm:h-5 w-4 sm:w-5 text-destructive shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm">{char}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* After */}
            <Card className="p-4 sm:p-6 md:p-8 border-2 border-accent">
              <div className="flex items-center gap-3 mb-2">
                <Check className="h-6 sm:h-8 w-6 sm:w-8 text-accent" />
                <div>
                  <h3 className="text-lg sm:text-2xl font-bold">
                    {remedyMachiavellian.beforeAfter.comparison.after.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-accent font-semibold">
                    {remedyMachiavellian.beforeAfter.comparison.after.state}
                  </p>
                </div>
              </div>
              <ul className="space-y-2 sm:space-y-3 mt-6">
                {remedyMachiavellian.beforeAfter.comparison.after.characteristics.map((char, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="h-4 sm:h-5 w-4 sm:w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm">{char}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 sm:py-16 md:py-20 px-3 sm:px-4">
        <div className="w-full max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4">
            {remedyMachiavellian.socialProof.title}
          </h2>
          <p className="text-center text-base sm:text-lg md:text-xl text-muted-foreground mb-8 sm:mb-12">
            {remedyMachiavellian.socialProof.subtitle}
          </p>

          <div className="space-y-4 sm:space-y-6">
            {remedyMachiavellian.socialProof.testimonials.map((testimonial, idx) => (
              <Card key={idx} className="letter-card p-4 sm:p-6 md:p-8 border-2 hover:border-accent/50 transition-all">
                <div className="flex items-start gap-3 sm:gap-4 mb-4">
                  <div className="wax-seal-small shrink-0 text-sm sm:text-base">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-base sm:text-lg md:text-xl">{testimonial.name}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                  <Award className="h-5 sm:h-6 w-5 sm:w-6 text-accent shrink-0" />
                </div>
                <blockquote className="text-sm sm:text-base italic mb-4 border-l-4 border-accent pl-3 sm:pl-4">
                  "{testimonial.quote}"
                </blockquote>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                  <div>
                    <span className="font-semibold">Resultado: </span>
                    {testimonial.result}
                  </div>
                  <div>
                    <span className="font-semibold text-accent">Impacto: </span>
                    {testimonial.impact}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Composition */}
      <section className="py-12 sm:py-16 md:py-20 px-3 sm:px-4 bg-muted/30">
        <div className="w-full max-w-5xl mx-auto">
          <Card className="letter-card p-4 sm:p-6 md:p-8 lg:p-12 border-2 border-accent/30">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center">
              Composição de Epicurus®
            </h2>
            
            <div className="space-y-4 sm:space-y-6">
              {remedyPhilosophy.composition.ingredients.map((ingredient, idx) => (
                <div 
                  key={idx} 
                  className="flex gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-border last:border-0 hover:bg-muted/30 p-3 sm:p-4 rounded-lg transition-colors"
                >
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent shrink-0 w-12 sm:w-16 text-center">
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-base sm:text-lg md:text-xl mb-2">
                      {ingredient.name}
                      <span className="ml-2 sm:ml-3 text-xs sm:text-sm font-normal greek-text opacity-70">
                        ({ingredient.greek})
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground mb-2 font-semibold">
                      Origem: {ingredient.dose}
                    </div>
                    <div className="text-sm sm:text-base italic">
                      Efeito: {ingredient.effect}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Guarantee */}
      <section className="py-12 sm:py-16 md:py-20 px-3 sm:px-4">
        <div className="w-full max-w-4xl mx-auto">
          <Card className="p-6 sm:p-8 md:p-12 bg-accent/10 border-2 border-accent">
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-flex items-center justify-center w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-accent/20 mb-4">
                <Shield className="h-8 sm:h-10 w-8 sm:w-10 text-accent" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                {remedyMachiavellian.guarantee.title}
              </h2>
            </div>
            
            <div className="space-y-4 sm:space-y-6 text-base sm:text-lg leading-relaxed">
              <p className="text-xl sm:text-2xl font-bold text-center text-accent">
                {remedyMachiavellian.guarantee.main}
              </p>
              <p>{remedyMachiavellian.guarantee.explanation}</p>
              <p className="font-semibold">{remedyMachiavellian.guarantee.commitment}</p>
              <p className="text-xs sm:text-sm italic text-muted-foreground">{remedyMachiavellian.guarantee.caveat}</p>
            </div>
          </Card>
        </div>
      </section>

      {/* Dosage & Warnings */}
      <section className="py-12 sm:py-16 md:py-20 px-3 sm:px-4 bg-muted/30">
        <div className="w-full max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            <Card className="letter-card p-4 sm:p-6 md:p-8 border-l-4 border-accent">
              <h3 className="text-lg sm:text-2xl font-bold mb-4">Modo de Uso</h3>
              <p className="text-sm sm:text-base leading-relaxed">
                {remedyPhilosophy.dosage.pt}
              </p>
            </Card>

            <Card className="p-4 sm:p-6 md:p-8 bg-destructive/10 border-2 border-destructive/30">
              <h3 className="text-lg sm:text-2xl font-bold mb-4 text-destructive">Advertências</h3>
              <p className="text-sm sm:text-base leading-relaxed">
                {remedyPhilosophy.warnings.pt}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Section */}
      {showMap && (
        <section className="py-12 sm:py-16 px-3 sm:px-4 bg-muted/30 animate-in fade-in slide-in-from-top-8 duration-500">
          <div className="w-full max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">
              {language === 'el' ? 'Ταξίδια τοῦ Ἐπικούρου' : 'Viagens de Epicuro'}
            </h2>
            <EpicurusMapAdvanced language={language} />
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-12 sm:py-16 md:py-20 px-3 sm:px-4 bg-accent/10">
        <div className="w-full max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            {remedyMachiavellian.cta.primary[language]}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-4">
            {remedyMachiavellian.cta.urgency}
          </p>
          <p className="text-sm sm:text-base lg:text-lg italic mb-6 sm:mb-8">
            {remedyMachiavellian.cta.subtle}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <PhilosophySidebar language={language} />
            <Button
              onClick={() => setShowMap(!showMap)}
              variant="outline"
              size="lg"
              className="gap-2 border-2 text-sm sm:text-base px-4 sm:px-6"
            >
              <Leaf className="h-4 sm:h-5 w-4 sm:w-5" />
              {language === 'el' ? 'Ταξίδια Ἐπικούρου' : 'Viagens de Epicuro'}
            </Button>
          </div>
        </div>
      </section>

      {/* Manufacturer */}
      <section className="py-8 sm:py-12 px-3 sm:px-4">
        <div className="w-full max-w-5xl mx-auto">
          <Card className="letter-card p-4 sm:p-6 md:p-8 text-center">
            <div className="text-xs sm:text-sm text-muted-foreground mb-2">
              Fabricado por:
            </div>
            <div className="text-lg sm:text-xl mb-2 font-bold">
              Jardim do Prazer Moderado S.A.
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground">
              Sob licença de Epicuro de Samos (341-270 a.C.)
            </div>
            <div className="text-xs text-muted-foreground mt-2">
              Registo filosófico n.º 342-A
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 sm:py-8 px-3 sm:px-4 border-t border-border bg-muted/30">
        <div className="w-full max-w-6xl mx-auto text-center">
          <p className="text-xs sm:text-sm text-muted-foreground mb-2">
            © 341-270 π.Χ. — Todos os direitos filosóficos reservados
          </p>
          <p className="text-xs text-muted-foreground">
            {language === 'el' 
              ? 'Κατασκευασθὲν ἐν τῷ Κήπῳ, Ἀθήνησιν' 
              : 'Fabricado no Jardim, Atenas'}
          </p>
        </div>
      </footer>
    </div>
  );
}
