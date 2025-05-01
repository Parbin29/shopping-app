# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

### Folder structure
```bash
/src
│
├── api/               # Axios API functions
│   └── api.js
│
├── components/        # Reusable components
│   ├── Header.jsx
│   ├── ProductCard.jsx
│   └── AdminPanel.jsx
│
├── pages/             # Page-level components
│   ├── Home.jsx
│   ├── ProductDetails.jsx
│   ├── Cart.jsx
│   ├── Admin.jsx
│
├── context/           # Global state (cart)
│   └── CartContext.jsx
│
├── signalr/           # SignalR setup
│   └── connection.js
│
├── App.jsx
└── main.jsx

```

### Install Required Packages
```bash
pnpm install axios react-router-dom @microsoft/signalr
pnpm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Push to git
```bash
git remote add origin https://github.com/Parbin29/shopping-app.git
git branch -M main
git push -u origin main
```
