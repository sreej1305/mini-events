import { useEffect, useState } from 'react';

const ScrollProgress = () => {
    const [width, setWidth] = useState(0);

    const handleScroll = () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPosition = window.scrollY;
        const percentage = (scrollPosition / totalHeight) * 100;
        setWidth(percentage);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return <div className="scroll-progress" style={{ width: `${width}%` }}></div>;
};

export default ScrollProgress;
