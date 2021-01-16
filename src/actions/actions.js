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

