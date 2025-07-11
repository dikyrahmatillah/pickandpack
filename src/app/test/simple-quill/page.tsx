"use client";

import { useEffect, useRef } from "react";

export default function SimpleQuillTest() {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initSimpleQuill = async () => {
      if (!editorRef.current) return;

      try {
        // Load CSS first
        const cssLoaded = new Promise((resolve) => {
          if (document.querySelector('link[href*="quill"]')) {
            resolve(true);
            return;
          }

          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = "https://cdn.quilljs.com/2.0.3/quill.snow.css";
          link.onload = () => resolve(true);
          link.onerror = () => {
            console.log("CDN failed, using local CSS");
            link.href = "/quill-fallback.css";
            resolve(true);
          };
          document.head.appendChild(link);
        });

        await cssLoaded;

        // Wait a bit for CSS to apply
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Import and initialize Quill
        const { default: Quill } = await import("quill");

        console.log("Quill imported, initializing...");

        // Clear the container
        editorRef.current.innerHTML = "";

        const quill = new Quill(editorRef.current, {
          theme: "snow",
          placeholder: "Type something here...",
          modules: {
            toolbar: [
              ["bold", "italic"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["clean"],
            ],
          },
        });

        console.log("Quill initialized successfully!", quill);

        // Test setting content
        quill.setContents([
          { insert: "Hello World!\n" },
          { insert: "This is ", attributes: { bold: true } },
          { insert: "formatted text.\n" },
        ]);
      } catch (error) {
        console.error("Failed to initialize Quill:", error);
        if (editorRef.current) {
          editorRef.current.innerHTML = `
            <div style="border: 1px solid red; padding: 10px; background: #ffe6e6;">
              <strong>Error:</strong> Failed to load Quill editor<br>
              <small>${error}</small>
            </div>
          `;
        }
      }
    };

    initSimpleQuill();
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Simple Quill Test</h1>
      <p>This is a minimal Quill implementation to test basic functionality.</p>

      <div
        ref={editorRef}
        style={{
          minHeight: "200px",
          border: "1px solid #ccc",
          marginTop: "20px",
        }}
      >
        <div style={{ padding: "20px", color: "#666" }}>
          Loading Quill editor...
        </div>
      </div>

      <div style={{ marginTop: "20px", fontSize: "14px", color: "#666" }}>
        Check the browser console for debugging information.
      </div>
    </div>
  );
}
