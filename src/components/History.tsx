import { revealItemInDir, openPath } from "@tauri-apps/plugin-opener";
import { HistoryItem, formatBytes, FORMAT_LABELS } from "../types";

interface Props {
  items: HistoryItem[];
  onClear: () => void;
  onClose: () => void;
}

export function History({ items, onClear, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Panel */}
      <div className="relative w-96 bg-slate-900 border-l border-slate-700 flex flex-col h-full shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
          <h2 className="font-bold text-slate-200">Historique</h2>
          <div className="flex gap-2">
            {items.length > 0 && (
              <button
                onClick={onClear}
                className="text-xs text-red-400 hover:text-red-300 transition-colors"
              >
                Effacer
              </button>
            )}
            <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Liste */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <p className="text-slate-500 text-sm text-center mt-12">Aucune conversion effectuée</p>
          ) : (
            <ul className="divide-y divide-slate-800">
              {items.map((item) => (
                <li key={item.id} className="px-5 py-3 hover:bg-slate-800/50 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-slate-200 truncate font-medium">{item.inputName}</p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        <span className="uppercase text-slate-400">{item.inputExt}</span>
                        {" → "}
                        <span className="uppercase text-blue-400">
                          {FORMAT_LABELS[item.outputFormat] ?? item.outputFormat.toUpperCase()}
                        </span>
                        {" · "}
                        {formatBytes(item.outputSize)}
                      </p>
                      <p className="text-xs text-slate-600 mt-0.5">
                        {new Date(item.timestamp).toLocaleString("fr-FR")}
                      </p>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <button
                        onClick={() => openPath(item.outputPath)}
                        className="text-blue-400 hover:text-blue-300 p-1 rounded transition-colors"
                        title="Ouvrir"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </button>
                      <button
                        onClick={() => revealItemInDir(item.outputPath)}
                        className="text-slate-400 hover:text-slate-200 p-1 rounded transition-colors"
                        title="Afficher dans l'explorateur"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="px-5 py-3 border-t border-slate-800 text-xs text-slate-600">
          {items.length} conversion(s) enregistrée(s)
        </div>
      </div>
    </div>
  );
}
