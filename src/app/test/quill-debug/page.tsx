"use client";

import { useState, useEffect } from "react";

export default function QuillDebugPage() {
  const [debugInfo, setDebugInfo] = useState<Record<string, unknown>>({});
  const [quillLoaded, setQuillLoaded] = useState(false);

  useEffect(() => {
    const checkQuill = async () => {
      const info: Record<string, unknown> = {
        windowDefined: typeof window !== "undefined",
        documentDefined: typeof document !== "undefined",
        quillCSSPresent: false,
        quillLibraryAvailable: false,
        userAgent: navigator?.userAgent || "unknown",
        timestamp: new Date().toISOString(),
      };

      // Check if Quill CSS is loaded
      if (typeof document !== "undefined") {
        info.quillCSSPresent = !!document.querySelector('link[href*="quill"]');
        info.allStylesheets = Array.from(document.styleSheets)
          .map((sheet) => sheet.href)
          .filter(Boolean);
      }

      // Try to load Quill
      try {
        const Quill = (await import("quill")).default;
        info.quillLibraryAvailable = true;
        info.quillVersion = Quill.version || "unknown";
        setQuillLoaded(true);
      } catch (err) {
        info.quillError = err instanceof Error ? err.message : String(err);
        info.quillLibraryAvailable = false;
      }

      setDebugInfo(info);
    };

    checkQuill();
  }, []);

  const loadQuillCSS = () => {
    if (typeof document === "undefined") return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdn.quilljs.com/2.0.3/quill.snow.css";
    link.crossOrigin = "anonymous";

    link.onload = () => {
      alert("CSS loaded successfully!");
      window.location.reload();
    };

    link.onerror = () => {
      alert("Failed to load CSS!");
    };

    document.head.appendChild(link);
  };

  const testQuillInit = () => {
    if (!quillLoaded) {
      alert("Quill library not loaded!");
      return;
    }

    const testDiv = document.createElement("div");
    testDiv.id = "test-quill-editor";
    testDiv.style.cssText =
      "width: 300px; height: 200px; border: 1px solid #ccc; margin: 10px;";
    document.body.appendChild(testDiv);

    import("quill").then(({ default: Quill }) => {
      try {
        new Quill(testDiv, {
          theme: "snow",
          placeholder: "Test editor...",
        });
        alert(
          "Quill initialized successfully! Check the page for the test editor."
        );
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        alert(`Quill initialization failed: ${errorMessage}`);
        document.body.removeChild(testDiv);
      }
    });
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Quill.js Debug Page</h1>

      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Debug Information</h2>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
          {JSON.stringify(debugInfo, null, 2)}
        </pre>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Manual Tests</h2>
        <div className="space-x-4">
          <button
            onClick={loadQuillCSS}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Load Quill CSS
          </button>
          <button
            onClick={testQuillInit}
            disabled={!quillLoaded}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            Test Quill Initialization
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Reload Page
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-semibold mb-4">Network Check</h2>
        <div className="space-y-2">
          <p>
            <strong>CDN Status:</strong>
            <span className="ml-2">
              Check browser console for CDN accessibility
            </span>
          </p>
          <p>
            <strong>Alternative CDN:</strong>
            <button
              onClick={() => {
                const link = document.createElement("link");
                link.rel = "stylesheet";
                link.href = "https://unpkg.com/quill@2.0.3/dist/quill.snow.css";
                document.head.appendChild(link);
                alert("Alternative CSS loaded!");
              }}
              className="ml-2 px-2 py-1 bg-yellow-600 text-white rounded text-sm"
            >
              Load from unpkg
            </button>
          </p>
        </div>
      </div>

      <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-medium text-yellow-800 mb-2">
          🔍 Troubleshooting Steps
        </h3>
        <ol className="text-yellow-700 text-sm space-y-1 list-decimal list-inside">
          <li>Check if Quill CSS is loaded (should be true above)</li>
          <li>Verify network access to CDN</li>
          <li>Test manual Quill initialization</li>
          <li>Check browser console for errors</li>
          <li>Try alternative CDN if main one fails</li>
        </ol>
      </div>
    </div>
  );
}
