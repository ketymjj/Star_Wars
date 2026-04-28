# Star Wars API

Aplicação full-stack que consome a [SWAPI](https://swapi.dev) (Star Wars API pública) e exibe os dados em uma interface temática inspirada no universo Star Wars.

---

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Backend | ASP.NET Core 8 (Web API) |
| Frontend | Angular 17 (Standalone Components) |
| Estilo | SCSS com tema Star Wars |
| API externa | [swapi.dev](https://swapi.dev) |

---

## Funcionalidades

- Listagem paginada de **Personagens**, **Filmes**, **Planetas**, **Naves**, **Veículos** e **Espécies**
- **Campo de busca** em todas as telas (filtro local por nome/título)
- **Modal de detalhes** ao clicar em qualquer card
- Cache de 30 minutos no backend para reduzir chamadas à SWAPI
- Interface responsiva com tema galáctico (fonte Orbitron, fundo estrelado, paleta dourada)

---

## Estrutura do Projeto

```
The_Star_Wars_API/
├── StarWarsAPI/                  # Backend .NET 8
│   ├── Controllers/              # Endpoints: People, Films, Planets...
│   ├── Models/                   # Person, Film, Planet, Starship...
│   ├── Services/
│   │   └── SwapiService.cs       # Consome swapi.dev com cache
│   └── Program.cs
│
├── star-wars-frontend/           # Frontend Angular 17
│   └── src/app/
│       ├── components/           # Card, DetailModal, Navbar
│       ├── pages/                # People, Films, Planets, Starships, Vehicles, Species
│       ├── services/swapi.ts     # HttpClient para o backend
│       └── models/swapi.models.ts
│
└── global.json                   # Versão do SDK .NET fixada (8.0.419)
```

---

## Como Rodar

### Pré-requisitos

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8)
- [Node.js 18+](https://nodejs.org)
- [Angular CLI](https://angular.io/cli) — `npm install -g @angular/cli`

### Backend

```bash
cd StarWarsAPI
dotnet run
```

API disponível em: `http://localhost:5249`  
Swagger em: `http://localhost:5249/swagger`

### Frontend

```bash
cd star-wars-frontend
npm install
ng serve
```

Aplicação disponível em: `http://localhost:4200`

---

## Endpoints da API

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/people?page=1` | Lista personagens |
| GET | `/api/people/{id}` | Personagem por ID |
| GET | `/api/films` | Lista filmes |
| GET | `/api/planets?page=1` | Lista planetas |
| GET | `/api/starships?page=1` | Lista naves |
| GET | `/api/vehicles?page=1` | Lista veículos |
| GET | `/api/species?page=1` | Lista espécies |

---

## Screenshots

> Interface com tema galáctico inspirado em Star Wars

![Tela de Personagens](https://starwars-visualguide.com/assets/img/titles/characters.jpg)

---

## Licença

Projeto desenvolvido para fins educacionais.  
Dados fornecidos por [swapi.dev](https://swapi.dev) — Star Wars API.
