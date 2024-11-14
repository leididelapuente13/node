const runCommand = async (args: string[]) => {
    process.argv = [...process.argv, ...args];

    const {yarg} = await import("../../plugins/yargs.plugin");

    return yarg;
}

describe("Yargs plugin", () => {

    const originalArgv = process.argv;
    beforeEach(() => {
        process.argv = originalArgv;
        jest.resetModules();
    })

    test('should return default values', async () => {
        const argv = await runCommand(['-b', '5'])

        expect(argv).toEqual(expect.objectContaining({
            b: 5,
            l: 10,
            s: false,
            n: 'table',
            d: './outputs'
        }));
    })

    test('should return configuration with custom values', async () => {
        const argv = await runCommand(['-b', '3', '-l', '20', '-s', 'true', '-n', 'custom-file', '-d', './custom-directory'])

        expect(argv).toEqual(expect.objectContaining({
            b: 3,
            l: 20,
            s: true,
            n: 'custom-file',
            d: './custom-directory'
        }));

    })
})