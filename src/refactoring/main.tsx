import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

async function enableMocking() {
  if (
    import.meta.env.VITE_RUN_MODE !== "api-mock" &&
    import.meta.env.MODE !== "production"
  ) {
    return;
  }

  const { worker } = await import("./mocks/browser");
  return worker.start({
    serviceWorker: {
      url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
    },
  });
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
