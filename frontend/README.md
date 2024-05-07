# Clean Architect

---

### Start Project

`yarn` and then `yarn dev`

##

---

#### Project Structure

    innovasive-nextjs
        ├── README.md
        ├── next-env.d.ts
        ├── next.config.js
        ├── package.json
        ├── pages
        │   ├── _app.tsx
        │   └── index.tsx
        ├── postcss.config.js
        ├── public
        │   ├── favicon.ico
        │   └── fonts
        │       ├── Kanit-Light.ttf
        │       └── Kanit-Medium.ttf
        ├── src
        │   ├── core
        │   │   ├── hooks
        │   │   │   ├── use_debounce.tsx
        │   │   │   └── use_modal.tsx
        │   │   └── lib
        │   │       └── axios.ts
        │   ├── data
        │   │   ├── api
        │   │   │   └── todo_list
        │   │   │       └── todo_list.hook.ts
        │   │   └── contexts
        │   │       └── modal.context.tsx
        │   ├── domain
        │   │   └── todo_list
        │   │       └── todo_list.domain.tsx
        │   └── presentation
        │       ├── components
        │       │   ├── buttons
        │       │   │   └── primary.tsx
        │       │   ├── input
        │       │   │   └── index.tsx
        │       │   └── modal.tsx
        │       └── todo_list
        │           ├── components
        │           │   └── collapse_panel.tsx
        │           └── pages
        │               └── todo_list_page.tsx
        ├── styles
        │   ├── font.css
        │   └── global.css
        ├── tailwind.config.js
        ├── tsconfig.json
        └── yarn.lock
