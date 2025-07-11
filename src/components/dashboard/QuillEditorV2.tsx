"use client";

import React, { useEffect, useRef, useState } from "react";

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

interface QuillInstance {
  root: { innerHTML: string };
  clipboard?: { convert: (options: { html: string }) => unknown };
  setContents: (delta: unknown, source?: string) => void;
  getSemanticHTML?: () => string;
  on: (event: string, callback: () => void) => void;
  getSelection: () => unknown;
  setSelection: (selection: unknown) => void;
}

const QuillEditorV2: React.FC<QuillEditorProps> = ({
  value,
  onChange,
  placeholder = "Start writing your journal...",
  className = "",
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<QuillInstance | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const initQuill = async () => {
      try {
        if (!isMounted || !editorRef.current || quillRef.current) return;

        console.log("🔄 Starting Quill initialization...");

        // Simple CSS injection
        if (!document.querySelector("style[data-quill-css]")) {
          const style = document.createElement("style");
          style.setAttribute("data-quill-css", "true");
          style.textContent = `
            .ql-toolbar {
              border: 1px solid #ccc;
              border-bottom: none;
              background: white;
              padding: 8px;
              font-family: Arial, sans-serif;
            }
            .ql-container {
              border: 1px solid #ccc;
              background: white;
              font-family: Arial, sans-serif;
            }
            .ql-editor {
              min-height: 200px;
              padding: 12px 15px;
              line-height: 1.42;
              background: white;
              color: black;
            }
            .ql-editor.ql-blank::before {
              color: #aaa;
              content: attr(data-placeholder);
              font-style: italic;
              pointer-events: none;
              position: absolute;
            }
            .ql-toolbar button {
              background: none;
              border: none;
              cursor: pointer;
              padding: 5px;
              margin: 2px;
              border-radius: 3px;
            }
            .ql-toolbar button:hover {
              background: #f0f0f0;
            }
            .ql-toolbar .ql-active {
              background: #e0e0e0;
            }
            .ql-stroke {
              fill: none;
              stroke: #444;
              stroke-width: 2;
            }
            .ql-fill {
              fill: #444;
            }
          `;
          document.head.appendChild(style);
        }

        // Wait a moment for styles to apply
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Import Quill
        const QuillModule = await import("quill");
        const Quill = QuillModule.default;

        console.log("✅ Quill imported successfully");

        // Clear container
        editorRef.current.innerHTML = "";

        // Basic toolbar configuration
        const toolbarOptions = [
          ["bold", "italic", "underline"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["blockquote", "code-block"],
          ["clean"],
        ];

        // Initialize Quill with minimal configuration
        quillRef.current = new Quill(editorRef.current, {
          theme: "snow",
          placeholder: placeholder,
          modules: {
            toolbar: toolbarOptions,
          },
        }) as QuillInstance;

        console.log("✅ Quill initialized successfully");

        // Set initial content using the most compatible method
        if (value && isMounted && quillRef.current) {
          try {
            // Try modern approach first
            if (
              quillRef.current.clipboard &&
              typeof quillRef.current.clipboard.convert === "function"
            ) {
              const delta = quillRef.current.clipboard.convert({ html: value });
              quillRef.current.setContents(delta, "silent");
              console.log("✅ Content set using modern API");
            } else {
              // Fallback to innerHTML
              quillRef.current.root.innerHTML = value;
              console.log("✅ Content set using fallback method");
            }
          } catch (err) {
            console.warn("⚠️ Failed to set content:", err);
            if (quillRef.current) {
              quillRef.current.root.innerHTML = value;
            }
          }
        }

        // Listen for text changes
        if (quillRef.current) {
          quillRef.current.on("text-change", () => {
            if (quillRef.current && isMounted) {
              try {
                // Try modern API first
                if (quillRef.current.getSemanticHTML) {
                  const html = quillRef.current.getSemanticHTML();
                  onChange(html);
                } else {
                  // Fallback to innerHTML
                  const html = quillRef.current.root.innerHTML;
                  onChange(html);
                }
              } catch (err) {
                console.warn("⚠️ Failed to get content:", err);
                if (quillRef.current) {
                  const html = quillRef.current.root.innerHTML;
                  onChange(html);
                }
              }
            }
          });
        }

        if (isMounted) {
          setIsLoading(false);
          setError(null);
          console.log("🎉 Quill setup completed!");
        }
      } catch (err) {
        console.error("❌ Failed to initialize Quill:", err);
        if (isMounted) {
          setError("Failed to load the editor. Please refresh the page.");
          setIsLoading(false);
        }
      }
    };

    initQuill();

    return () => {
      isMounted = false;
      if (quillRef.current) {
        quillRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update content when value prop changes
  useEffect(() => {
    if (quillRef.current && value !== undefined) {
      try {
        let currentContent;

        // Get current content using most compatible method
        if (quillRef.current.getSemanticHTML) {
          currentContent = quillRef.current.getSemanticHTML();
        } else {
          currentContent = quillRef.current.root.innerHTML;
        }

        if (value !== currentContent) {
          const currentSelection = quillRef.current.getSelection();

          try {
            // Set content using most compatible method
            if (
              quillRef.current.clipboard &&
              typeof quillRef.current.clipboard.convert === "function"
            ) {
              const delta = quillRef.current.clipboard.convert({ html: value });
              quillRef.current.setContents(delta, "silent");
            } else {
              quillRef.current.root.innerHTML = value;
            }
          } catch (err) {
            console.warn("⚠️ Failed to update content:", err);
            if (quillRef.current) {
              quillRef.current.root.innerHTML = value;
            }
          }

          if (currentSelection) {
            quillRef.current.setSelection(currentSelection);
          }
        }
      } catch (err) {
        console.warn("⚠️ Failed to check/update content:", err);
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
    </div>
  );
};

export default QuillEditorV2;
