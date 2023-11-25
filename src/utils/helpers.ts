export const sleep = async (ms: number) => {
    await new Promise(r => setTimeout(r, ms))
}

export const stringifyObject = (object: any): string => {
    return JSON.stringify(object, null, 2)
}

export function splitCssSelector(cssSelector: string): string[] {
    // Regular expression to match CSS selectors
    const pattern = /(?<=[^\s])\s(?=[^\s])/;

    // Split the CSS selector using the regular expression
    const parts = cssSelector.split(pattern);

    // Merge parts that are inside square brackets
    const result: string[] = [];
    let currentPart = '';
    for (const part of parts) {
        currentPart += part;
        if (currentPart.split('[').length === currentPart.split(']').length) {
            result.push(currentPart.trim());
            currentPart = '';
        }
    }

    return result;
}

// Example usage