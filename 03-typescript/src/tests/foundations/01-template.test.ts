import {emailTemplate} from "../../foundations/01-template";

describe('js-foundations/01-template.ts', () => {
    test('email template should contain a greeting', () => {
        expect(emailTemplate).toContain('Hi, ');
    });

    test('email template should contain {{name}} and {{orderId}}', () => {
        expect(emailTemplate).toMatch(/{{name}}/);
        expect(emailTemplate).toMatch(/{{orderId}}/);
    });
})