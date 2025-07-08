# Matelink

Matelink es una plataforma desarrollada con [Next.js](https://nextjs.org) que integra un marketplace, mensajería, perfiles de usuario y más, enfocada en la experiencia social y comercial.

## Características principales
- Marketplace con productos, filtros y edición visual
- Sistema de autenticación y perfiles de usuario
- Mensajería interna entre usuarios
- Componentes reutilizables y diseño moderno
- Integración con Supabase (opcional, actualmente usando datos mock para el marketplace)

## Estructura de carpetas

```
matelink/
├── app/
│   ├── (main)/
│   │   ├── components/           # Componentes generales
│   │   ├── explore/              # Explorador de contenido
│   │   ├── marketplace/          # Marketplace y sus subcomponentes
│   │   ├── message/              # Mensajería
│   │   ├── notifications/        # Notificaciones
│   │   ├── profile/              # Perfiles de usuario
│   │   └── page.tsx              # Página principal
│   ├── auth/                     # Autenticación
│   ├── error/                    # Página de error
│   ├── homepage/                 # Landing page
│   ├── job/                      # Sección de empleos
│   ├── login/                    # Login
│   ├── premium/                  # Premium
│   └── signup/                   # Registro
├── components/                   # Componentes UI globales
│   └── ui/                       # Librería de componentes UI (botones, formularios, etc.)
├── hooks/                        # Custom React hooks
├── lib/                          # Utilidades y helpers
├── public/                       # Recursos estáticos (imágenes, logos, etc.)
├── types/                        # Tipos TypeScript globales
├── utils/                        # Utilidades generales y helpers de base de datos
├── .vscode/                      # Configuración de VSCode
├── package.json                  # Dependencias y scripts
├── tsconfig.json                 # Configuración TypeScript
└── README.md                     # Este archivo
```

## Instalación y ejecución

1. Instala las dependencias:
   ```bash
   npm install
   ```
2. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
3. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Notas
- El marketplace actualmente utiliza datos mock para visualización rápida.
- Para conectar con Supabase, revisa la carpeta `utils/supabase/` y los tipos en `types/supabase.ts`.
- Personaliza los componentes en `components/` y las páginas en `app/` según tus necesidades.

---

¡Contribuciones y sugerencias son bienvenidas!
