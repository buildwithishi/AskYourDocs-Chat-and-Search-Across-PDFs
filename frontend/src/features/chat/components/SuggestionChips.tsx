export function SuggestionChips({ suggestions, onSelect }: { suggestions: string[]; onSelect: (s: string) => void }) {
  return (
    <div className="flex flex-wrap justify-center gap-3 pt-4">
      {suggestions.map((suggestion) => (
        <button
          key={suggestion}
          onClick={() => onSelect(suggestion)}
          className="glass-panel rounded-full border border-white/10 px-4 py-2 font-label-md text-[13px] text-on-surface-variant transition-all hover:border-white/20 active:scale-95"
        >
          {suggestion}
        </button>
      ))}
    </div>
  )
}
