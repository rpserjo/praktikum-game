import React, { FC, useRef, useEffect } from 'react';

const Game: FC = () => {
    const ref = useRef<HTMLCanvasElement | null>(null);
    useEffect(() => {
        if (ref.current) {
            const ctx = ref.current.getContext('2d');
            ctx!.fillRect(0, 0, 100, 100);
        }
    }, []);
    return <canvas ref={ref} width={300} height={300} />;
};

export default Game;
