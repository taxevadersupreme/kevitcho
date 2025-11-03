# Instruções de Deployment - Epicurus®

## Estado Actual do Projecto

Todos os ficheiros estão correctamente rastreados pelo Git, incluindo:
- Imagens do produto (epicurus-label-mockup.png, epicurus-bottle.png)
- Ficheiro _redirects para SPA routing
- Ficheiro netlify.toml com configuração correcta
- Todo o código fonte

## Para Fazer Push para o GitHub

O projecto actual está a usar um repositório S3 interno do Manus. Para fazer push para o seu repositório GitHub:

### 1. Descarregar Ficheiros

Através do painel Code no interface de gestão, clique em "Download All Files" para obter o ZIP completo do projecto.

### 2. Criar Repositório GitHub

```bash
# Descomprimir o ZIP
unzip epicurus_pharmacy.zip
cd epicurus_pharmacy

# Inicializar git (se necessário)
git init

# Adicionar repositório remoto GitHub
git remote add github https://github.com/SEU_USERNAME/SEU_REPO.git

# Adicionar todos os ficheiros
git add .

# Fazer commit
git commit -m "Deploy inicial Epicurus® - Vending page completa"

# Fazer push
git push github master
```

### 3. Configurar Netlify

1. Aceda a https://app.netlify.com
2. Clique em "Add new site" → "Import an existing project"
3. Escolha GitHub e seleccione o repositório
4. Configurações de build (já estão no netlify.toml):
   - **Build command:** `pnpm run build`
   - **Publish directory:** `dist/public`
5. Clique em "Deploy site"

## Verificação

Após deployment, o sítio deve carregar correctamente em:
- Página inicial: `/`
- Navegação SPA funcional (sem erros 404)
- Todas as imagens visíveis
- Sidebar das cartas filosóficas funcional
- Mapa interactivo funcional

## Ficheiros Críticos

- `netlify.toml` - Configuração de build e redirects
- `client/public/_redirects` - Redirects para SPA routing
- `client/public/epicurus-label-mockup.png` - Imagem principal do produto
- `pnpm-lock.yaml` - Lockfile sem referências a patches

## Resolução de Problemas

### Erro 404 no Netlify
✅ **Resolvido** - ficheiro _redirects criado

### Erro de build com patches
✅ **Resolvido** - lockfile regenerado sem patches

### Imagens não carregam
- Verificar se as imagens estão em `client/public/`
- Verificar se o build copiou para `dist/public/`
- Verificar caminhos no código (devem ser `/nome-imagem.png`)

## Contacto

Para questões sobre deployment, consulte a documentação do Netlify:
https://docs.netlify.com/configure-builds/overview/
