import type { Square as SquareType } from '../types/index';

interface SquareProps {
  square: SquareType;
  onClick: () => void;
  isWinner?: boolean;
}

export function Square({ square, onClick, isWinner }: SquareProps) {
  const getClasses = () => {
    let classes = 'border rounded sm:border-2 rounded-lg p-1 sm:p-2 min-h-[32px] min-w-[32px] sm:min-h-[80px] md:min-h-[100px] flex flex-col items-center justify-center gap-0.5 sm:gap-1 transition-all text-center text-xs sm:text-sm';
    
    if (isWinner) {
      classes += ' winner-square border-yellow-500 border-4';
    } else if (square.buyer_name) {
      classes += ' square-claimed border-blue-400';
    } else {
      classes += ' bg-gray-50 border-gray-300 hover:bg-gray-100 cursor-pointer active:scale-95';
    }
    
    return classes;
  };

  return (
    <button
      onClick={onClick}
      className={getClasses()}
    >
      {isWinner && <span className="text-base sm:text-2xl">🎉</span>}
      {square.buyer_name ? (
        <>
          <span className="hidden sm:inline text-xs text-gray-500">#{square.position}</span>
          <div className="flex items-center justify-center gap-0.5 sm:gap-1 min-w-0 w-full">
            <span className="text-green-600 shrink-0">✅</span>
            <span className="square-claimed-text text-[10px] sm:text-sm truncate max-w-full">{square.buyer_name}</span>
          </div>
        </>
      ) : (
        <>
          <span className="hidden sm:inline text-xs text-gray-400">#{square.position}</span>
          <span className="text-[10px] sm:text-sm text-gray-500">Avail</span>
        </>
      )}
    </button>
  );
}
