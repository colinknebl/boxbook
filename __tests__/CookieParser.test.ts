import 'jest';
import CookieParser from '../src/components/utils/CookieParser';

global['document'] = {};
document.cookie = 'token=123; foo=bar;';

describe('CookieParser Tests', () => {
    let cookieParser: CookieParser;
    beforeEach(() => {
        cookieParser = new CookieParser(document.cookie);
        cookieParser['_isClient'] = true;
    });

    afterAll(() => {
        global['document'] = undefined;
    });

    test('cookies getter', () => {
        expect(cookieParser.cookies).toEqual({
            token: '123',
            foo: 'bar',
        });
    });

    test('get', () => {
        expect(cookieParser.get('token')).toBe('123');
        expect(cookieParser.get('foo')).toBe('bar');
    });

    test('delete', () => {
        cookieParser.delete('foo');
        expect(cookieParser.cookies).toEqual({
            foo: '',
            expires: 'Thu, 01 Jan 1970 00:00:00 UTC',
        });
    });

    test('set', () => {
        cookieParser.set('test', 'baz');
        expect(document.cookie).toBe('test=baz;');
        expect(cookieParser.cookies).toEqual({
            test: 'baz',
        });
    });
});
