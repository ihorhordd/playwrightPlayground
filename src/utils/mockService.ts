import {Page} from "@playwright/test";
import {test} from "@fixture";

export class MockService {
    constructor(public page: Page) {}


    private async unroute(url: string) {
        return await this.page.unroute(url)
    }

    public fulfillRequest(url: string) {
        return {
            withPayload: async (payload: string) => {
                return await test.step(`Intercepting api call with endpoint ${url} and payload ${payload}`, async () =>
                    await this.page.route(url, route => {
                        return route.fulfill({
                            body: payload
                        }).finally(async () => this.unroute(url))
                    })
                )
            },
            withJsonPath: async (pathToJson: string) => {
                return await test.step(`Intercepting api call with endpoint ${url} and json ${pathToJson}`, async () =>
                    await this.page.route(url, route => {
                        return route.fulfill({
                            path: pathToJson
                        })
                    }).finally(async () => this.unroute(url))
                )
            },
        }


    }

}