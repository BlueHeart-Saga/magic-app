import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, X } from 'lucide-react';

export default function FloatingCalculator() {
    const [isOpen, setIsOpen] = useState(false);
    const [display, setDisplay] = useState('0');
    const [equation, setEquation] = useState('');

    const handlePress = (val) => {
        if (val === 'C') {
            setDisplay('0');
            setEquation('');
            return;
        }

        if (val === '=') {
            try {
                // Safe evaluation since inputs are strictly sanitized by button presses
                // eslint-disable-next-line no-new-func
                const result = new Function('return ' + equation)();

                // Handle infinities and NaN
                if (!isFinite(result) || isNaN(result)) {
                    setDisplay('Error');
                    setEquation('');
                    return;
                }

                const safeStr = parseFloat(result.toFixed(5)).toString();
                setDisplay(safeStr);
                setEquation(safeStr);
            } catch (e) {
                setDisplay('Error');
                setEquation('');
            }
            return;
        }

        if (['+', '-', '*', '/'].includes(val)) {
            setEquation((prev) => prev + val);
            setDisplay(val);
            return;
        }

        // Numbers
        setEquation((prev) => (prev === '0' ? val : prev + val));
        setDisplay((prev) => {
            if (['+', '-', '*', '/', '0'].includes(prev) || display === 'Error') return val;
            return prev + val;
        });
    };

    const buttons = [
        '7', '8', '9', '/',
        '4', '5', '6', '*',
        '1', '2', '3', '-',
        'C', '0', '=', '+'
    ];

    return (
        <div className="fixed right-6 bottom-6 lg:right-10 lg:bottom-10 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                        className="mb-4 bg-[#140f26]/95 backdrop-blur-xl border border-purple-500/40 rounded-3xl w-72 shadow-2xl shadow-purple-900/40 overflow-hidden"
                    >
                        <div className="flex justify-between items-center px-4 py-3 bg-black/30 border-b border-purple-500/20">
                            <span className="text-sm font-semibold tracking-wider text-purple-300 flex items-center gap-2 uppercase">
                                <Calculator className="w-4 h-4" /> Math Helper
                            </span>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-slate-400 hover:text-white transition-colors hover:rotate-90 duration-200"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-5">
                            <div className="bg-[#0b0814] rounded-2xl p-4 mb-5 border border-purple-500/30 text-right overflow-hidden shadow-inner">
                                <div className="text-xs font-mono text-purple-400 h-4 break-all opacity-70 mb-1 tracking-widest">
                                    {equation || display}
                                </div>
                                <div className="text-3xl font-mono text-white tracking-wider mt-1 truncate">
                                    {display}
                                </div>
                            </div>

                            <div className="grid grid-cols-4 gap-3">
                                {buttons.map((btn) => (
                                    <motion.button
                                        key={btn}
                                        whileTap={{ scale: 0.85 }}
                                        onClick={() => handlePress(btn)}
                                        className={`h-14 rounded-2xl text-xl font-bold flex items-center justify-center transition-all shadow-sm
                      ${['+', '-', '*', '/', '='].includes(btn)
                                                ? 'bg-gradient-to-br from-purple-600/40 to-blue-600/40 hover:from-purple-500/60 hover:to-blue-500/60 text-purple-200 border border-purple-500/40'
                                                : btn === 'C'
                                                    ? 'bg-gradient-to-br from-red-500/20 to-orange-500/20 hover:from-red-500/40 text-red-300 border border-red-500/30'
                                                    : 'bg-white/5 hover:bg-white/10 text-slate-100 border border-white/10'
                                            }`}
                                    >
                                        {btn}
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {!isOpen && (
                <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(true)}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4 lg:p-5 rounded-full shadow-[0_4px_30px_rgba(168,85,247,0.5)] flex items-center gap-2 font-semibold hover:brightness-110 transition-all border border-purple-400/50 group"
                >
                    <Calculator className="w-7 h-7 group-hover:rotate-12 transition-transform" />
                </motion.button>
            )}
        </div>
    );
}
