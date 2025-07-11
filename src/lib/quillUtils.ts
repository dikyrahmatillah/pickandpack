// Utility functions for Quill.js content

// Convert Quill HTML content to plain text for excerpt generation
export const quillToText = (html: string): string => {
  if (!html || html.trim() === "") return "";

  // Create a temporary div to parse HTML
  if (typeof document !== "undefined") {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  }

  // Fallback for server-side rendering
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();
};

// Clean Quill HTML content for preview (remove empty paragraphs, etc.)
export const cleanQuillHtml = (html: string): string => {
  if (!html || html.trim() === "") return "";

  return html
    .replace(/<p><br><\/p>/g, "") // Remove empty paragraphs with line breaks
    .replace(/<p><\/p>/g, "") // Remove completely empty paragraphs
    .replace(/&nbsp;/g, " ") // Replace non-breaking spaces
    .trim();
};

// Check if Quill content is empty (only contains empty paragraphs or whitespace)
export const isQuillEmpty = (html: string): boolean => {
  if (!html || html.trim() === "") return true;

  const textContent = quillToText(html);
  return textContent.trim() === "";
};
