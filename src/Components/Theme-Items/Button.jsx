function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <ThemeProvider value={theme}>
      <div
        className={`min-h-screen flex flex-col items-center justify-center p-6 transition-all ${
          darkMode ? "bg-darkBg text-darkText" : "bg-white text-black"
        }`}
      >
        <h1 className="text-3xl font-bold mb-4">Material Tailwind Theme</h1>
        <Button className="mb-4">Themed Button</Button>
        <Button onClick={toggleDarkMode} className="bg-secondary text-black">
          Toggle Dark Mode
        </Button>
      </div>
    </ThemeProvider>
  );
}

export default App;
