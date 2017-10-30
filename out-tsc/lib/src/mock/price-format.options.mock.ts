export class PriceFormatOptionsMock {

  options = {};

  public updateOptions(options: any) {
    this.options = options;
  }

  public getOptions() {
      return this.options;
  }
}
