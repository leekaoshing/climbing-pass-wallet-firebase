import { useEffect, useState } from 'react';

export const findPassDifferences = (oldPasses, newPasses) => {
    const differenceInPasses = {};
    Object.keys(newPasses).forEach(key => {
        const oldPassQuantity = oldPasses[key] === undefined ? 0 : oldPasses[key];
        const newPassQuantity = newPasses[key];
        const change = newPassQuantity - oldPassQuantity;
        if (change !== 0) differenceInPasses[key] = newPassQuantity - oldPassQuantity;
    })
    return differenceInPasses;
}

export const useCheckMobileScreen = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const handleWindowSizeChange = () => {
            setWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    return (width <= 768);
}
