"use client";

import React, { useEffect, useRef, useState } from "react";
import type QuillType from "quill";

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  maxImageSize?: number; // in MB
}

const QuillEditor: React.FC<QuillEditorProps> = ({
  value,
  onChange,
  placeholder = "Start writing your journal...",
  className = "",
  maxImageSize = 5, // 5MB default
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  // Import type for Quill instance
  const quillRef = useRef<QuillType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const isInitialized = useRef(false);

  // Create stable refs for the callbacks
  const onChangeRef = useRef(onChange);
  const valueRef = useRef(value);

  // Update refs when props change
  useEffect(() => {
    onChangeRef.current = onChange;
    valueRef.current = value;
  });

  const loadQuillCSS = async (): Promise<void> => {
    // Check if CSS is already loaded
    if (document.querySelector('link[href*="quill.snow.css"]')) {
      return;
    }

    return new Promise((resolve, reject) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href =
        "https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.snow.css";

      link.onload = () => {
        console.log("Quill CSS loaded successfully");
        resolve();
      };

      link.onerror = () => {
        console.error("Failed to load Quill CSS");
        // Try alternative CDN
        const fallbackLink = document.createElement("link");
        fallbackLink.rel = "stylesheet";
        fallbackLink.href =
          "https://cdnjs.cloudflare.com/ajax/libs/quill/2.0.3/quill.snow.css";

        fallbackLink.onload = () => {
          console.log("Quill CSS loaded from fallback CDN");
          resolve();
        };

        fallbackLink.onerror = () => {
          console.error("Failed to load Quill CSS from fallback CDN");
          reject(new Error("Failed to load Quill CSS"));
        };

        document.head.appendChild(fallbackLink);
      };

      document.head.appendChild(link);
    });
  };

  // Convert file to base64
  // (Removed unused fileToBase64 function)

  // Resize image to fit max dimensions
  const resizeImage = React.useCallback(
    (
      file: File,
      maxWidth: number = 800,
      maxHeight: number = 600
    ): Promise<string> => {
      return new Promise((resolve, reject) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();

        img.onload = () => {
          // Calculate new dimensions
          let { width, height } = img;

          if (width > height) {
            if (width > maxWidth) {
              height = (height * maxWidth) / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = (width * maxHeight) / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;

          // Draw and compress
          ctx?.drawImage(img, 0, 0, width, height);
          const base64 = canvas.toDataURL("image/jpeg", 0.8);
          resolve(base64);
        };

        img.onerror = reject;
        img.src = URL.createObjectURL(file);
      });
    },
    []
  );

  // Custom image handler
  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      // Check file size
      if (file.size > maxImageSize * 1024 * 1024) {
        alert(`Image size should be less than ${maxImageSize}MB`);
        return;
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      try {
        // Show loading state
        const quill = quillRef.current;
        if (!quill) {
          alert("Editor is not ready yet. Please try again.");
          return;
        }
        const range = quill.getSelection();
        if (!range) {
          alert("Please place the cursor where you want to insert the image.");
          return;
        }

        // Insert placeholder
        quill.insertText(range.index, "🖼️ Loading image...", "user");

        // Resize and convert to base64
        const base64 = await resizeImage(file);

        // Remove placeholder
        quill.deleteText(range.index, "🖼️ Loading image...".length);

        // Insert image
        quill.insertEmbed(range.index, "image", base64);

        // Move cursor after image
        quill.setSelection(range.index + 1);
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Failed to upload image. Please try again.");
      }
    };
  };

  // Simplified image resize handles - proportional resizing only
  const addImageResizeHandles = () => {
    const images = editorRef.current?.querySelectorAll("img");
    images?.forEach((img) => {
      if (img.getAttribute("data-resizable")) return; // Already has handlers

      img.setAttribute("data-resizable", "true");
      img.style.cursor = "pointer";
      img.style.maxWidth = "100%";
      img.style.height = "auto";

      let isResizing = false;
      let startX: number, startWidth: number, aspectRatio: number;

      const onMouseDown = (e: MouseEvent) => {
        if (e.detail === 2) {
          // Double click to toggle between small, medium, and large sizes
          const currentWidth = parseInt(img.style.width || "100%", 10);
          if (currentWidth <= 200) {
            img.style.width = "400px";
          } else if (currentWidth <= 400) {
            img.style.width = "100%";
          } else {
            img.style.width = "200px";
          }
          return;
        }

        isResizing = true;
        startX = e.clientX;
        startWidth = parseInt(
          document.defaultView?.getComputedStyle(img).width || "0",
          10
        );

        // Calculate aspect ratio from natural dimensions
        aspectRatio = img.naturalWidth / img.naturalHeight;

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
        e.preventDefault();
      };

      const onMouseMove = (e: MouseEvent) => {
        if (!isResizing) return;

        const deltaX = e.clientX - startX;
        const newWidth = Math.max(50, startWidth + deltaX); // Minimum 50px width
        const newHeight = newWidth / aspectRatio;

        img.style.width = newWidth + "px";
        img.style.height = newHeight + "px";
        // Also set inline style attribute so it persists in HTML
        img.setAttribute(
          "style",
          `width: ${newWidth}px; height: ${newHeight}px; max-width: 100%; border-radius: 4px; margin: 10px 0; transition: all 0.2s ease;`
        );
      };

      const onMouseUp = () => {
        isResizing = false;
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };

      img.addEventListener("mousedown", onMouseDown);

      // Add visual indicator
      img.addEventListener("mouseenter", () => {
        img.style.border = "2px dashed #007bff";
      });

      img.addEventListener("mouseleave", () => {
        if (!isResizing) {
          img.style.border = "none";
        }
      });
    });
  };

  const retry = () => {
    setRetryCount((prev) => prev + 1);
    isInitialized.current = false;

    // Clean up completely before retry
    if (quillRef.current) {
      quillRef.current.off("text-change");
      quillRef.current = null;
    }

    // Remove ALL toolbars
    const allToolbars = document.querySelectorAll(".ql-toolbar");
    allToolbars.forEach((toolbar) => toolbar.remove());

    if (editorRef.current) {
      editorRef.current.innerHTML = "";
    }

    // Small delay before reinitializing
    setTimeout(() => {
      window.location.reload(); // Force a complete refresh for retry
    }, 100);
  };

  useEffect(() => {
    const initialize = async () => {
      if (!editorRef.current || isInitialized.current) return;

      try {
        setError(null);
        setIsLoading(true);

        console.log("Loading Quill CSS...");
        await loadQuillCSS();

        // Wait for CSS to be applied
        await new Promise((resolve) => setTimeout(resolve, 500));

        console.log("Importing Quill...");
        const QuillModule = await import("quill");
        const Quill = QuillModule.default;

        if (!editorRef.current) {
          throw new Error("Editor reference is null");
        }

        // Clean up any existing Quill instance first
        if (quillRef.current) {
          quillRef.current.off("text-change");
          quillRef.current = null;
        }

        // Remove ALL existing toolbars globally
        const allToolbars = document.querySelectorAll(".ql-toolbar");
        allToolbars.forEach((toolbar) => toolbar.remove());

        // Clear the editor container completely
        editorRef.current.innerHTML = "";

        console.log("Initializing Quill editor...");

        // Initialize Quill
        quillRef.current = new Quill(editorRef.current, {
          theme: "snow",
          placeholder,
          modules: {
            toolbar: {
              container: [
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ color: [] }, { background: [] }],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ indent: "-1" }, { indent: "+1" }],
                ["blockquote", "code-block"],
                ["link", "image"],
                [{ align: [] }],
                ["clean"],
              ],
              handlers: {
                image: imageHandler,
              },
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
            "blockquote",
            "code-block",
            "link",
            "image",
            "align",
          ],
        });

        // Set initial content
        if (valueRef.current) {
          try {
            quillRef.current.clipboard.dangerouslyPasteHTML(valueRef.current);
          } catch (e) {
            console.warn("Failed to set initial content:", e);
          }
        }

        // Listen for changes with debounce to prevent excessive updates
        let changeTimeout: NodeJS.Timeout;
        quillRef.current.on("text-change", () => {
          if (quillRef.current) {
            clearTimeout(changeTimeout);
            changeTimeout = setTimeout(() => {
              const html = quillRef.current?.getSemanticHTML();
              if (html) {
                onChangeRef.current(html);
              }

              // Add resize handles to new images
              setTimeout(() => {
                addImageResizeHandles();
              }, 100);
            }, 300); // 300ms debounce
          }
        });

        // Add resize handles to existing images
        setTimeout(() => {
          addImageResizeHandles();
        }, 100);

        isInitialized.current = true;
        setIsLoading(false);
        console.log("Quill editor initialized successfully");
      } catch (err) {
        console.error("Quill initialization failed:", err);
        setError(
          `Failed to load editor: ${
            err instanceof Error ? err.message : "Unknown error"
          }`
        );
        setIsLoading(false);
      }
    };

    if (typeof window !== "undefined" && !isInitialized.current) {
      initialize();
    }

    return () => {
      // Clean up function
      if (quillRef.current) {
        try {
          quillRef.current.off("text-change");
        } catch {
          // Ignore cleanup errors
        }
        quillRef.current = null;
      }

      // Remove ALL toolbars on unmount
      const allToolbars = document.querySelectorAll(".ql-toolbar");
      allToolbars.forEach((toolbar) => toolbar.remove());

      isInitialized.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  // Update content when value changes
  useEffect(() => {
    if (quillRef.current && isInitialized.current) {
      const currentContent = quillRef.current.getSemanticHTML();
      if (valueRef.current !== currentContent) {
        try {
          quillRef.current.clipboard.dangerouslyPasteHTML(valueRef.current);
          // Add resize handles to images after content update
          setTimeout(() => {
            addImageResizeHandles();
          }, 100);
        } catch (e) {
          console.warn("Failed to update content:", e);
        }
      }
    }
  }, [value]); // Keep this effect to update when external value changes

  if (error) {
    return (
      <div
        className={`border border-red-300 rounded-lg p-4 bg-red-50 ${className}`}
      >
        <div className="flex items-center justify-between mb-2">
          <p className="text-red-600 text-sm font-medium">
            Editor failed to load
          </p>
          <div className="flex gap-2">
            <button
              onClick={retry}
              className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
            >
              Retry ({retryCount + 1})
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
            >
              Refresh Page
            </button>
          </div>
        </div>
        <p className="text-red-500 text-xs">{error}</p>
        <details className="mt-2">
          <summary className="text-xs text-gray-600 cursor-pointer">
            Troubleshooting tips
          </summary>
          <ul className="text-xs text-gray-600 mt-1 ml-4">
            <li>• Check browser console for errors</li>
            <li>• Verify internet connection</li>
            <li>• Try refreshing the page</li>
            <li>• Check if ad blockers are interfering</li>
          </ul>
        </details>
      </div>
    );
  }

  return (
    <div className={`quill-editor-wrapper ${className}`}>
      {isLoading && (
        <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 min-h-[300px] flex items-center justify-center">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span className="text-gray-500 text-sm">
                Loading editor...
                {retryCount > 0 && ` (Attempt ${retryCount + 1})`}
              </span>
            </div>
          </div>
        </div>
      )}

      <div
        ref={editorRef}
        className="quill-container"
        style={{
          minHeight: "300px",
          display: isLoading ? "none" : "block",
        }}
      />

      {/* Image Upload Instructions */}
      <div className="mt-2 text-xs text-gray-500">
        💡 <strong>Image tips:</strong> Click the image button to upload •
        Double-click images to cycle through sizes • Drag to resize
        proportionally • Max size: {maxImageSize}MB
      </div>

      <style jsx global>{`
        .quill-editor-wrapper {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            sans-serif;
        }

        .quill-editor-wrapper .ql-toolbar {
          border: 1px solid #d1d5db;
          border-top-left-radius: 0.375rem;
          border-top-right-radius: 0.375rem;
          border-bottom: none;
          background: white;
        }

        .quill-editor-wrapper .ql-container {
          border: 1px solid #d1d5db;
          border-bottom-left-radius: 0.375rem;
          border-bottom-right-radius: 0.375rem;
          border-top: none;
        }

        .quill-editor-wrapper .ql-editor {
          min-height: 250px;
          padding: 12px 15px;
          color: #333;
          background: white;
          border-bottom-left-radius: 0.375rem;
          border-bottom-right-radius: 0.375rem;
        }

        /* Image styling */
        .quill-editor-wrapper .ql-editor img {
          display: block;
          max-width: 100%;
          height: auto;
          margin: 10px 0;
          border-radius: 4px;
          transition: all 0.2s ease;
        }

        .quill-editor-wrapper .ql-editor img:hover {
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .quill-editor-wrapper .ql-editor img[data-resizable="true"] {
          cursor: pointer;
          user-select: none;
        }

        /* Ensure only one toolbar exists */
        .ql-toolbar:not(.quill-editor-wrapper .ql-toolbar) {
          display: none !important;
        }

        /* Hide any orphaned toolbars */
        body > .ql-toolbar {
          display: none !important;
        }

        /* Image upload button styling */
        .quill-editor-wrapper .ql-toolbar .ql-image {
          position: relative;
        }

        .quill-editor-wrapper .ql-toolbar .ql-image::after {
          content: "📷";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 12px;
          opacity: 0.7;
        }
      `}</style>
    </div>
  );
};

export default QuillEditor;
