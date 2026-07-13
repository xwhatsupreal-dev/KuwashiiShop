const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Add global listener for toast
const listenerCode = `  useEffect(() => {
    const handleShowToast = (e: any) => {
      if (e.detail) {
        showToast(e.detail.message, e.detail.type);
      }
    };
    window.addEventListener('show-toast', handleShowToast);
    return () => window.removeEventListener('show-toast', handleShowToast);
  }, []);`;

content = content.replace(
  /const \[toasts, setToasts\] = useState<\{[^}]+\}\[\]>\(\[\]\);/g,
  `const [toasts, setToasts] = useState<{ id: string; text: string; type: "success" | "info" | "error" }[]>([]);\n\n${listenerCode}`
);

fs.writeFileSync('src/App.tsx', content);
