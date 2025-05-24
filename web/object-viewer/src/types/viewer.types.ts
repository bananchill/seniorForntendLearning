export interface IBaseRenderOptions {
    components: IComponentConstructorBase[]
}

export interface IComponentConstructorBase {
    new(...args: any[]): IComponentBase;

    readonly className: string;
}

export interface IComponentBase {
    readonly className: string;

    toHtml(): string;

    init(): void;

    destroy(): void;
}
