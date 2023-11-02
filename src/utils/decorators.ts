import {test} from "@fixture";


export function boxStep(target: Function, context: ClassMethodDecoratorContext) {
    return function replacementMethod(...args: any) {
        // @ts-ignore
        const name = this.constructor.name + '.' + (context.name as string);
        return test.step(name, async () => {
            // @ts-ignore
            return await target.call(this, ...args);
        }, {box: true});
    };
}