export function reduceStrings(strings: string[]) {
    return strings.reduce(
        (combined: string, string: string, currentIndex: number) => {
            let seperator = ' ';
            if (currentIndex === 0) {
                seperator = '';
            }
            return combined + seperator + string;
        },
        ''
    );
}
