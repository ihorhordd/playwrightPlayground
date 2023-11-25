import {Page} from "@playwright/test";
import {test} from "@fixture";
import {stringifyObject} from "@helpers";

export class MockService {
    constructor(public page: Page) {
    }


    private async unroute(url: string) {
        return await this.page.unroute(url)
    }

    public replaceResponse(url: string, config: FulFillConfig) {
        test.step(`Intercepting api call with endpoint ${url} and config ${stringifyObject(config)}`, async () =>
            await this.page.route(url, route => route.fulfill(config)
                .finally(async () => this.unroute(url))
            )
        )
    }


}

type FulFillConfig = { body: string } | { path: string }