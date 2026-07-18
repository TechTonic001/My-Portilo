import { useState, useEffect, useCallback } from 'react';

const ROWS = 9;
const COLS = 9;
const MINES = 10;

function createBoard() {
  const cells = Array.from({ length: ROWS * COLS }, (_, i) => ({
    idx: i,
    mine: false,
    revealed: false,
    flagged: false,
    adjacent: 0,
  }));

  // Place mines randomly
  let placed = 0;
  while (placed < MINES) {
    const r = Math.floor(Math.random() * ROWS * COLS);
    if (!cells[r].mine) {
      cells[r].mine = true;
      placed++;
    }
  }

  // Calculate adjacencies
  const neighbors = (idx) => {
    const r = Math.floor(idx / COLS);
    const c = idx % COLS;
    const ns = [];
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
          ns.push(nr * COLS + nc);
        }
      }
    }
    return ns;
  };

  cells.forEach((cell, idx) => {
    if (!cell.mine) {
      cell.adjacent = neighbors(idx).filter((n) => cells[n].mine).length;
    }
  });

  return { cells, neighbors };
}

const ADJ_COLORS = ['', '#3b82f6', '#22c55e', '#ef4444', '#7c3aed', '#991b1b', '#0891b2', '#111827', '#6b7280'];

const Minesweeper = () => {
  const [gameState, setGameState] = useState(() => {
    const { cells, neighbors } = createBoard();
    return { cells, neighborsOf: neighbors, status: 'idle', flagsLeft: MINES, time: 0 };
  });

  const [timer, setTimer] = useState(null);

  const newGame = useCallback(() => {
    if (timer) clearInterval(timer);
    const { cells, neighbors } = createBoard();
    setGameState({ cells, neighborsOf: neighbors, status: 'idle', flagsLeft: MINES, time: 0 });
    setTimer(null);
  }, [timer]);

  // Timer
  useEffect(() => {
    if (gameState.status === 'playing' && !timer) {
      const t = setInterval(() => {
        setGameState((prev) => ({ ...prev, time: prev.time + 1 }));
      }, 1000);
      setTimer(t);
    }
    if ((gameState.status === 'won' || gameState.status === 'lost') && timer) {
      clearInterval(timer);
      setTimer(null);
    }
    return () => {};
  }, [gameState.status, timer]);

  const reveal = useCallback((idx) => {
    setGameState((prev) => {
      if (prev.status === 'won' || prev.status === 'lost') return prev;
      const cells = [...prev.cells.map((c) => ({ ...c }))];
      if (cells[idx].revealed || cells[idx].flagged) return prev;

      let status = prev.status === 'idle' ? 'playing' : prev.status;

      if (cells[idx].mine) {
        // Reveal all mines
        cells.forEach((c) => { if (c.mine) c.revealed = true; });
        return { ...prev, cells, status: 'lost' };
      }

      // Flood fill
      const queue = [idx];
      while (queue.length) {
        const i = queue.shift();
        if (cells[i].revealed || cells[i].flagged) continue;
        cells[i].revealed = true;
        if (cells[i].adjacent === 0 && !cells[i].mine) {
          prev.neighborsOf(i).forEach((n) => {
            if (!cells[n].revealed) queue.push(n);
          });
        }
      }

      // Check win
      const won = cells.every((c) => c.mine || c.revealed);
      return { ...prev, cells, status: won ? 'won' : status };
    });
  }, []);

  const flag = useCallback((e, idx) => {
    e.preventDefault();
    setGameState((prev) => {
      if (prev.status === 'won' || prev.status === 'lost') return prev;
      if (prev.cells[idx].revealed) return prev;
      const cells = [...prev.cells.map((c) => ({ ...c }))];
      const wasF = cells[idx].flagged;
      cells[idx].flagged = !wasF;
      return { ...prev, cells, flagsLeft: prev.flagsLeft + (wasF ? 1 : -1) };
    });
  }, []);

  const face = gameState.status === 'won' ? '😎' : gameState.status === 'lost' ? '😵' : '🙂';

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: '#c0c0c0',
      fontFamily: '"Courier New", monospace',
      userSelect: 'none',
    }}>
      {/* Header */}
      <div style={{
        width: COLS * 32 + 16,
        background: '#c0c0c0',
        border: '2px solid',
        borderColor: '#fff #808080 #808080 #fff',
        padding: '8px 10px',
        marginTop: 16,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={sevenSeg}>{String(Math.max(0, gameState.flagsLeft)).padStart(3, '0')}</div>
        <button
          id="minesweeper-reset"
          onClick={newGame}
          style={{
            width: 32,
            height: 32,
            background: '#c0c0c0',
            border: '2px solid',
            borderColor: '#fff #808080 #808080 #fff',
            cursor: 'pointer',
            fontSize: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {face}
        </button>
        <div style={sevenSeg}>{String(Math.min(999, gameState.time)).padStart(3, '0')}</div>
      </div>

      {/* Board */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${COLS}, 32px)`,
        border: '2px solid',
        borderColor: '#808080 #fff #fff #808080',
        margin: '8px 0 16px',
      }}>
        {gameState.cells.map((cell, idx) => {
          const content = cell.revealed
            ? cell.mine ? '💥' : cell.adjacent > 0 ? cell.adjacent : ''
            : cell.flagged ? '🚩' : '';
          const bg = cell.revealed ? (cell.mine ? '#ff6666' : '#c0c0c0') : '#c0c0c0';
          return (
            <div
              key={idx}
              onClick={() => reveal(idx)}
              onContextMenu={(e) => flag(e, idx)}
              style={{
                width: 32,
                height: 32,
                background: bg,
                border: cell.revealed ? '1px solid #808080' : '2px solid',
                borderColor: cell.revealed ? '#808080' : '#fff #808080 #808080 #fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: cell.revealed && !cell.mine ? 14 : 16,
                fontWeight: 700,
                color: ADJ_COLORS[cell.adjacent] || '#000',
              }}
            >
              {content}
            </div>
          );
        })}
      </div>

      {gameState.status === 'won' && (
        <div style={{ fontSize: 14, fontWeight: 700, color: '#006600', marginBottom: 8 }}>
          🎉 You Win!
        </div>
      )}
      {gameState.status === 'lost' && (
        <div style={{ fontSize: 14, fontWeight: 700, color: '#cc0000', marginBottom: 8 }}>
          💥 Game Over
        </div>
      )}
    </div>
  );
};

const sevenSeg = {
  background: '#000',
  color: '#f00',
  fontFamily: '"Courier New", monospace',
  fontSize: 20,
  fontWeight: 700,
  padding: '2px 6px',
  letterSpacing: 2,
  minWidth: 44,
  textAlign: 'center',
};

export default Minesweeper;
