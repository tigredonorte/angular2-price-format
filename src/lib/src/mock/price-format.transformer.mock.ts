export class PriceFormatTransformerMock {
    options = {};
    maxSize = 4;

    public updateOptions(options: any) {
        this.options = options;
    }

    public toNumber(price: string):  number {
        return 12345;
    }

    public addPrefix(price: string) {
        return 'R$ ' + price;
    }

    public addSuffix(price: string) {
        return price;
    }

    public clearPrefix(price: string) {
        return price;
    }

    public clearSuffix(price: string) {
        return price;
    }

    public change(newValue: string) {
        return newValue.substr(0, 3);
    }

    public getCleanValue(newValue: string): string {
        return '12345';
    }

    public priceFormat(str: string) {
        return '123.45';
    }

    public priceFormatNumber(num: number) {
        return '123.45';
    }

}
