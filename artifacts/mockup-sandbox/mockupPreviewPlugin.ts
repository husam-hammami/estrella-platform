import type { Plugin } from "vite";

/**
 * Canvas-sandbox preview plugin.
 *
 * Adds two small conveniences so the compiled app can be mounted as an iframe
 * shape on a Canvas board:
 *   1. Injects a <meta name="sandbox-ready"> signal once index.html is parsed.
 *   2. Posts a lightweight "ready" message to the parent window so the sandbox
 *      can resize / frame the iframe without polling.
 *
 * Kept intentionally tiny — this file is a seam, not a framework.
 */
export default function mockupPreviewPlugin(): Plugin {
  return {
    name: "telos-mockup-preview",
    transformIndexHtml(html) {
      return html.replace(
        "</head>",
        [
          '    <meta name="sandbox-ready" content="1" />',
          "    <script>",
          "      (function () {",
          "        function ping() {",
          "          try { window.parent && window.parent.postMessage({ type: 'telos-mockup-ready' }, '*'); } catch (e) {}",
          "        }",
          "        if (document.readyState === 'complete') ping();",
          "        else window.addEventListener('load', ping);",
          "      })();",
          "    </script>",
          "  </head>",
        ].join("\n")
      );
    },
  };
}
