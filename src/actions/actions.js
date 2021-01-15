export const findPassDifferences = (oldPasses, newPasses) => {
    const differenceInPasses = {};
    Object.keys(newPasses).forEach(key => {
      const oldPassQuantity = oldPasses[key] === undefined ? 0 : oldPasses[key];
      const newPassQuantity = newPasses[key];
      differenceInPasses[key] = newPassQuantity - oldPassQuantity;
    })
    return differenceInPasses;
  }