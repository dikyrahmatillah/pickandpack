"use client";

import { useState } from "react";
import QuillEditor from "@/components/dashboard/QuillEditor";
import { quillToText, cleanQuillHtml, isQuillEmpty } from "@/lib/quillUtils";

export default function QuillTestPage() {
  const [content, setContent] = useState(
    "<p>This is a test with <strong>bold text</strong> and <em>italic text</em>.</p>"
  );

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Quill.js 2.0.3 Test Page</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4">Editor</h2>
          <QuillEditor
            value={content}
            onChange={setContent}
            placeholder="Type something to test the editor..."
            className="mb-4"
          />

          <div className="space-y-2 text-sm">
            <p>
              <strong>Content Length:</strong> {content.length} characters
            </p>
            <p>
              <strong>Is Empty:</strong> {isQuillEmpty(content) ? "Yes" : "No"}
            </p>
            <p>
              <strong>Plain Text Length:</strong> {quillToText(content).length}{" "}
              characters
            </p>
          </div>
        </div>

        {/* Preview & Debug */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4">Preview & Debug</h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Live Preview:</h3>
              <div
                className="border border-gray-200 rounded p-3 prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: cleanQuillHtml(content) }}
              />
            </div>

            <div>
              <h3 className="font-medium text-gray-700 mb-2">Plain Text:</h3>
              <div className="border border-gray-200 rounded p-3 bg-gray-50 text-sm">
                {quillToText(content)}
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-700 mb-2">Raw HTML:</h3>
              <div className="border border-gray-200 rounded p-3 bg-gray-50 text-xs font-mono">
                <pre className="whitespace-pre-wrap break-words">{content}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Test Buttons */}
      <div className="mt-6 flex flex-wrap gap-3">
        <button
          onClick={() => setContent("")}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Clear Content
        </button>
        <button
          onClick={() =>
            setContent(
              "<h1>Test Header</h1><p>This is a test paragraph with <strong>bold</strong> and <em>italic</em> text.</p><ul><li>List item 1</li><li>List item 2</li></ul>"
            )
          }
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Load Test Content
        </button>
        <button
          onClick={() =>
            setContent(
              "<blockquote>This is a blockquote</blockquote><p>With some <code>inline code</code> and a <a href='#'>link</a>.</p>"
            )
          }
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Load Rich Content
        </button>
      </div>

      {/* API Test */}
      <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-medium text-yellow-800 mb-2">
          🧪 Quill 2.x API Test
        </h3>
        <p className="text-yellow-700 text-sm">
          This page tests the modern Quill 2.x APIs including{" "}
          <code>getSemanticHTML()</code> and <code>clipboard.convert()</code>.
          Try editing the content above to see how the new APIs handle content
          conversion and HTML generation.
        </p>
      </div>
    </div>
  );
}
