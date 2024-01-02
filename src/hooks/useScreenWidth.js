import { useState, useEffect } from 'react'

const getIsMobile575 = () => window.innerWidth <= 575;
const getIsMobile768 = () => window.innerWidth >= 576 && window.innerWidth <= 768;
const getIsMobile992 = () => window.innerWidth >= 769 && window.innerWidth <= 992;

export default function useIsMobile() {
    const [isMobile575, setIsMobile575] = useState(getIsMobile575());
    const [isMobile768, setIsMobile768] = useState(getIsMobile768());
    const [isMobile992, setIsMobile992] = useState(getIsMobile992());

    useEffect(() => {
        const onResize = () => {
            setIsMobile575(getIsMobile575());
            setIsMobile768(getIsMobile768());
            setIsMobile992(getIsMobile992());
        }

        window.addEventListener("resize", onResize);

        return () => {
            window.removeEventListener("resize", onResize);
        }
    }, []);

    return [isMobile575, isMobile768, isMobile992];
}