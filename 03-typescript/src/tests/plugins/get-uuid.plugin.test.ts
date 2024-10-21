import {getId} from "../../plugins";

describe("get-uuid.plugin.test.ts", () => {
    test('expect getId to return a valid uuid', ()=>{
        const uuid = getId();
        expect(typeof uuid).toBe('string');
        expect(uuid.length).toBe(36);
    })
})