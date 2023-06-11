export default function renderHorizontalText(context: CanvasRenderingContext2D, text: string, x: number, y: number, spacing: number) {
    const totalWidth = context.measureText(text).width + spacing * (text.length - 1);

    const align = context.textAlign;
    context.textAlign = 'left';
    /* eslint-disable */
    switch (align) {
        case 'right':
            x -= totalWidth;
            break;
        case 'center':
            x -= totalWidth / 2;
            break;
    }
    /* eslint-enable */

    let offset;
    let pairWidth;
    let charWidth;
    let charNextWidth;
    let pairSpacing;
    let char;
    let charNext;

    // eslint-disable-next-line
    for (offset = 0; offset < text.length; offset = offset + 1) {
        char = text.charAt(offset);
        pairSpacing = 0;
        if (offset + 1 < text.length) {
            charNext = text.charAt(offset + 1);

            pairWidth = context.measureText(char + charNext).width;
            charWidth = context.measureText(char).width;
            charNextWidth = context.measureText(charNext).width;
            pairSpacing = pairWidth - charWidth - charNextWidth;
        }

        context.fillText(char, x, y);
        if (charWidth) {
            // eslint-disable-next-line
            x = x + pairSpacing + spacing + charWidth;
        }
    }

    context.textAlign = align;
}
