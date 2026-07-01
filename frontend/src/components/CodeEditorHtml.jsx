import Editor from "@monaco-editor/react";
import { Play, RotateCcw } from "lucide-react";

export default function CodeEditorHtml({
  code,
  setCode,
  runCode,
  resetGame,
  isRunning,
}) {
  return (
    <div className="font-mono rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-xl">

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200 bg-slate-50">
        <div className="flex gap-2">
          <span className="w-3 h-3 rounded-full bg-red-400" />
          <span className="w-3 h-3 rounded-full bg-yellow-400" />
          <span className="w-3 h-3 rounded-full bg-green-400" />
        </div>

        <span className="text-xs font-medium text-slate-500">
          index.html
        </span>

        <div className="w-10" />
      </div>

      {/* Tab */}
      <div className="flex px-5 border-b border-slate-200 bg-white">
        <div className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-orange-500 border-b-2 border-orange-500">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M14 3v4a1 1 0 0 0 1 1h4M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
          </svg>

          index.html
        </div>
      </div>

      {/* Monaco */}
      <Editor
      height="150px"
        defaultLanguage="html"
        theme="light"
        value={code}
        onChange={(value) => setCode(value || "")}
        options={{
          fontSize: 14,
          lineHeight: 24,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          padding: { top: 16 },
          fontFamily: "'JetBrains Mono', monospace",
        }}
      />

      {/* Status Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500">
        <span className="flex items-center gap-2 text-xs text-white">
          <span
            className={`w-2 h-2 rounded-full ${
              isRunning
                ? "bg-yellow-200 animate-pulse"
                : "bg-green-200"
            }`}
          />

          {isRunning ? "Running..." : "Ready"}
        </span>

        <span className="text-xs text-white/90">
          html
        </span>
      </div>

      {/* Actions */}
      <div className="flex gap-3 p-4 bg-slate-50 border-t border-slate-200">

        <button
          disabled={isRunning}
          onClick={runCode}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-white font-bold shadow-lg hover:scale-105 transition disabled:opacity-50"
          style={{
            background:
              "linear-gradient(135deg,#f97316,#ec4899)",
          }}
        >
          <Play size={16} />
          {isRunning ? "Exécution..." : "Exécuter"}
        </button>

        <button
          disabled={isRunning}
          onClick={resetGame}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border border-slate-200 bg-white text-slate-700 font-semibold hover:bg-slate-100 transition disabled:opacity-50"
        >
          <RotateCcw size={16} />
          Réinitialiser
        </button>

      </div>
    </div>
  );
}