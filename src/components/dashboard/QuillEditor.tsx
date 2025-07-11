"use client";

import React, { useEffect, useRef, useState } from "react";

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const QuillEditor: React.FC<QuillEditorProps> = ({
  value,
  onChange,
  placeholder = "Start writing your journal...",
  className = "",
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const quillRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    // Load CSS with better error handling
    const loadCSS = () => {
      return new Promise<void>((resolve) => {
        // Check if CSS is already loaded
        if (
          document.querySelector('link[href*="quill.snow.css"]') ||
          document.querySelector('link[href*="quill-fallback.css"]')
        ) {
          resolve();
          return;
        }

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://cdn.quilljs.com/2.0.3/quill.snow.css";
        link.crossOrigin = "anonymous";

        link.onload = () => {
          console.log("Quill CSS loaded successfully from CDN");
          resolve();
        };

        link.onerror = () => {
          console.warn(
            "Failed to load Quill CSS from CDN, trying local fallback"
          );
          document.head.removeChild(link);

          // Try local fallback
          const fallbackLink = document.createElement("link");
          fallbackLink.rel = "stylesheet";
          fallbackLink.href = "/quill-fallback.css";

          fallbackLink.onload = () => {
            console.log("Quill CSS loaded from local fallback");
            resolve();
          };

          fallbackLink.onerror = () => {
            console.error(
              "Failed to load Quill CSS from all sources, continuing with inline styles"
            );
            resolve(); // Continue anyway
          };

          document.head.appendChild(fallbackLink);
        };

        document.head.appendChild(link);
      });
    };

    const initQuill = async () => {
      try {
        if (!isMounted || !editorRef.current || quillRef.current) return;

        console.log("Starting Quill initialization...");

        // Load CSS and wait for it
        await loadCSS();

        // Wait for CSS to be fully applied
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Import Quill dynamically
        const QuillModule = await import("quill");
        const Quill = QuillModule.default;

        console.log(
          "Quill imported successfully, version:",
          Quill.version || "2.0.3"
        );

        // Configure toolbar with better options
        const toolbarOptions = [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ indent: "-1" }, { indent: "+1" }],
          ["blockquote", "code-block"],
          ["link", "image"],
          [{ align: [] }],
          ["clean"],
        ];

        // Clear any existing content in the editor container
        if (editorRef.current) {
          editorRef.current.innerHTML = "";
        }

        // Initialize Quill with better configuration
        quillRef.current = new Quill(editorRef.current, {
          theme: "snow",
          placeholder: placeholder,
          modules: {
            toolbar: toolbarOptions,
            clipboard: {
              matchVisual: false,
            },
          },
          formats: [
            "header",
            "bold",
            "italic",
            "underline",
            "strike",
            "color",
            "background",
            "list",
            "indent",
            "link",
            "image",
            "align",
            "blockquote",
            "code-block",
          ],
        });

        console.log("Quill initialized successfully");

        // Set initial content
        if (value && isMounted) {
          try {
            // Use clipboard.convert for proper Delta conversion in Quill 2.x
            const delta = quillRef.current.clipboard.convert({ html: value });
            quillRef.current.setContents(delta, "silent");
            console.log("Initial content set successfully");
          } catch (err) {
            // Fallback for any conversion issues
            console.warn(
              "Failed to set content with Delta, using innerHTML fallback:",
              err
            );
            quillRef.current.root.innerHTML = value;
          }
        }

        // Listen for text changes
        quillRef.current.on("text-change", () => {
          if (quillRef.current && isMounted) {
            try {
              // Use getSemanticHTML() for Quill 2.x - this is the preferred method
              const html = quillRef.current.getSemanticHTML();
              onChange(html);
            } catch (err) {
              console.warn(
                "Failed to get semantic HTML, using innerHTML fallback:",
                err
              );
              onChange(quillRef.current.root.innerHTML);
            }
          }
        });

        if (isMounted) {
          setIsLoading(false);
          setError(null);
          console.log("Quill setup completed successfully");
        }
      } catch (err) {
        console.error("Failed to initialize Quill:", err);
        if (isMounted) {
          setError("Failed to load the editor. Please refresh the page.");
          setIsLoading(false);
        }
      }
    };

    if (typeof window !== "undefined") {
      initQuill();
    }

    return () => {
      isMounted = false;
      if (quillRef.current) {
        quillRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once to initialize Quill

  // Update content when value prop changes
  useEffect(() => {
    if (quillRef.current) {
      try {
        const currentContent = quillRef.current.getSemanticHTML();

        if (value !== currentContent) {
          const currentSelection = quillRef.current.getSelection();

          try {
            // Use clipboard.convert for proper Delta conversion in Quill 2.x
            const delta = quillRef.current.clipboard.convert({ html: value });
            quillRef.current.setContents(delta, "silent");
          } catch (err) {
            console.warn(
              "Failed to update content with Delta, using innerHTML fallback:",
              err
            );
            quillRef.current.root.innerHTML = value;
          }

          if (currentSelection) {
            quillRef.current.setSelection(currentSelection);
          }
        }
      } catch (err) {
        console.warn("Failed to check content:", err);
      }
    }
  }, [value]);

  if (error) {
    return (
      <div
        className={`border border-red-300 rounded-lg p-4 bg-red-50 ${className}`}
      >
        <p className="text-red-600 text-sm">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
        >
          Refresh Page
        </button>
      </div>
    );
  }

  return (
    <div className={`quill-editor-wrapper ${className}`}>
      {isLoading && (
        <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 min-h-[300px] flex items-center justify-center">
          <div className="text-gray-500 text-sm">Loading editor...</div>
        </div>
      )}

      <div
        ref={editorRef}
        style={{
          minHeight: "300px",
          display: isLoading ? "none" : "block",
        }}
      />

      <style jsx global>{`
        /* Ensure Quill editor is visible and properly styled */
        .quill-editor-wrapper .ql-toolbar,
        .quill-editor-wrapper .ql-container {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
            "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
            "Helvetica Neue", sans-serif;
        }

        .quill-editor-wrapper .ql-toolbar {
          border: 1px solid #d1d5db;
          border-top-left-radius: 0.375rem;
          border-top-right-radius: 0.375rem;
          border-bottom: none;
          background: #ffffff;
          padding: 8px;
        }

        .quill-editor-wrapper .ql-container {
          border: 1px solid #d1d5db;
          border-bottom-left-radius: 0.375rem;
          border-bottom-right-radius: 0.375rem;
          border-top: none;
          font-size: 14px;
          font-family: inherit;
        }

        .quill-editor-wrapper .ql-editor {
          min-height: 250px;
          padding: 1rem;
          line-height: 1.6;
          font-family: inherit;
          color: #111827;
          background: #ffffff;
        }

        .quill-editor-wrapper .ql-editor.ql-blank::before {
          color: #9ca3af;
          font-style: italic;
          left: 1rem;
          right: 1rem;
        }

        /* Toolbar button styling */
        .quill-editor-wrapper .ql-toolbar button {
          display: inline-block;
          cursor: pointer;
          border: none;
          background: none;
          padding: 5px;
          margin: 2px;
          border-radius: 3px;
        }

        .quill-editor-wrapper .ql-toolbar button:hover {
          background-color: #f3f4f6;
        }

        .quill-editor-wrapper .ql-toolbar button.ql-active {
          background-color: #e5e7eb;
        }

        /* Fix for toolbar icons */
        .quill-editor-wrapper .ql-toolbar .ql-stroke {
          fill: none;
          stroke: #374151;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-width: 2;
        }

        .quill-editor-wrapper .ql-toolbar .ql-fill {
          fill: #374151;
          stroke: none;
        }

        .quill-editor-wrapper .ql-toolbar button:hover .ql-stroke {
          stroke: #2563eb;
        }

        .quill-editor-wrapper .ql-toolbar button:hover .ql-fill {
          fill: #2563eb;
        }

        .quill-editor-wrapper .ql-toolbar button.ql-active .ql-stroke {
          stroke: #2563eb;
        }

        .quill-editor-wrapper .ql-toolbar button.ql-active .ql-fill {
          fill: #2563eb;
        }

        /* Dropdown styling */
        .quill-editor-wrapper .ql-toolbar .ql-picker {
          color: #374151;
        }

        .quill-editor-wrapper .ql-toolbar .ql-picker-options {
          background-color: #ffffff;
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        /* Content styling */
        .quill-editor-wrapper .ql-editor h1 {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 1rem;
          line-height: 1.2;
        }

        .quill-editor-wrapper .ql-editor h2 {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 0.75rem;
          line-height: 1.3;
        }

        .quill-editor-wrapper .ql-editor h3 {
          font-size: 1.25rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
          line-height: 1.4;
        }

        .quill-editor-wrapper .ql-editor p {
          margin-bottom: 1rem;
        }

        .quill-editor-wrapper .ql-editor ul,
        .quill-editor-wrapper .ql-editor ol {
          padding-left: 1.5rem;
          margin-bottom: 1rem;
        }

        .quill-editor-wrapper .ql-editor blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 1rem;
          margin: 1rem 0;
          font-style: italic;
          color: #6b7280;
        }

        .quill-editor-wrapper .ql-editor pre {
          background-color: #f3f4f6;
          padding: 1rem;
          border-radius: 0.375rem;
          overflow-x: auto;
          margin: 1rem 0;
        }

        .quill-editor-wrapper .ql-editor img {
          max-width: 100%;
          height: auto;
          border-radius: 0.375rem;
          margin: 1rem 0;
        }

        .quill-editor-wrapper .ql-editor a {
          color: #2563eb;
          text-decoration: underline;
        }

        .quill-editor-wrapper .ql-editor a:hover {
          color: #1d4ed8;
        }

        /* Force visibility of editor elements */
        .quill-editor-wrapper {
          position: relative;
        }

        .quill-editor-wrapper .ql-toolbar,
        .quill-editor-wrapper .ql-container {
          display: block !important;
          visibility: visible !important;
        }
      `}</style>
    </div>
  );
};

export default QuillEditor;
