# SPEC — Infraestrutura e Arquitetura

## 1. Stack Principal

Frontend:
- Next.js (App Router)
- TailwindCSS
- Mobile-first

Backend:
- PHP Slim Framework (v4+)
- Composer for dependency management
- Structured API endpoints for dynamic content

Frontend:
- Next.js (App Router)
- TailwindCSS
- Shadcn UI (for Admin Dashboard)
- Lucide React (icons)
- Mobile-first

Banco de Dados:
- Supabase (Postgres)

Storage:
- Supabase Storage

DNS e SSL:
- Cloudflare

Deploy:
- Frontend: Vercel (conectado ao repositório)
- Backend: VPS Dedicada (Dockerized / Portainer)
- Subdomínio para API: api.dfacaosocial.org.br

---

## 2. Arquitetura Proposta

O projeto será estruturado como um monorepo ou pastas separadas, com o backend e frontend desacoplados.

Estrutura:
- `/frontend`: Aplicação Next.js
- `/backend`: Aplicação PHP Slim

Fluxo:
Usuário → Cloudflare (DNS)
  → Vercel (Frontend - /)
  → VPS / Docker (Backend - api.dfacaosocial.org.br)
    → Supabase (Postgres + Storage)

---

## 3. Estrutura de Dados (Payload Collections)

### pages
- title
- slug
- content (rich text)
- seo (title, description, image)

---

### campaigns
- title
- slug
- excerpt
- content
- featured (boolean)
- cover_image
- gallery (array)
- published_at

---

### people
- name
- role
- bio
- photo

---

### media
- file
- alt_text

---

### future: donations
- name
- email
- amount
- payment_method
- is_public (boolean)
- status
- created_at

---

## 4. Home Rendering Strategy

Carousel:
- Buscar campaigns com featured = true
- Se vazio, buscar últimas 5 publicadas
- Limite máximo: 5 slides

Demais blocos:
- Inicialmente estáticos
- Evolução futura: tornar dinâmicos via collection

---

## 5. Design System

### Identidade Visual

Cores principais:
- Amarelo (#FDF21D)
- Preto (#000000)
- Branco (#FFFFFF)

### Tokens sugeridos (Tailwind)

primary: #FDF21D (amarelo vibrante)
primary-hover: #EAB308
black: #00000000
background: #FFFFFF
muted: #F5F5F5

Botões:
- Fundo amarelo
- Texto preto
- Hover com amarelo mais escuro
- Bordas arredondadas médias

---

## 6. Performance

- Uso de Next Image
- Lazy loading
- Cache via Cloudflare
- Minimizar JS desnecessário
- Priorizar conteúdo acima da dobra

---

## 7. Escalabilidade

Se crescimento ocorrer:

Opção A:
- Upgrade Supabase

Opção B:
- Migrar storage para R2

Opção C:
- Separar Payload em instância dedicada

Arquitetura já preparada para evolução sem refatoração estrutural.