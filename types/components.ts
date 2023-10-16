import {Locator} from "@playwright/test";

export interface TextComponent {
    getText(): string | undefined,
    shouldHaveText(): void,
}

export interface ButtonActions {
    hover(): void,
    doubleClick(): void
}

export interface ErrorMessage {
    errorMessage(action: string): string
}

export type Selector = string | Locator