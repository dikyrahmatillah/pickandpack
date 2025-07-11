"use client";

import { useState } from "react";
import QuillEditorV2 from "@/components/dashboard/QuillEditorV2";

export default function QuillV2TestPage() {
  const [content, setContent] = useState(
    "<p>Testing QuillEditorV2 with <strong>bold text</strong> and <em>italic text</em>.</p>"
  );

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Quill Editor V2 Test</h1>
      <p className="mb-6 text-gray-600">
        This is a simplified version of the Quill editor with inline CSS and
        better error handling.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4">Editor V2</h2>
          <QuillEditorV2
            value={content}
            onChange={setContent}
            placeholder="Type something to test the editor..."
            className="mb-4"
          />

          <div className="space-y-2 text-sm">
            <p>
              <strong>Content Length:</strong> {content.length} characters
            </p>
          </div>
        </div>

        {/* Preview */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4">Live Preview</h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Rendered HTML:</h3>
              <div
                className="border border-gray-200 rounded p-3 prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: content }}
              />
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
              "<blockquote>This is a blockquote</blockquote><p>With some text and formatting.</p>"
            )
          }
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Load Quote Content
        </button>
      </div>

      {/* Instructions */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-medium text-blue-800 mb-2">
          🔍 Testing Instructions
        </h3>
        <ul className="text-blue-700 text-sm space-y-1 list-disc list-inside">
          <li>
            Check if the editor toolbar appears correctly (not just triangles)
          </li>
          <li>Try typing in the editor</li>
          <li>Test formatting buttons (bold, italic, etc.)</li>
          <li>Check the browser console for any error messages</li>
          <li>Verify the live preview updates as you type</li>
        </ul>
      </div>
    </div>
  );
}
