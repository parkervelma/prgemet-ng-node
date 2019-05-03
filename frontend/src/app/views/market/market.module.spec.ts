import { MarketModule } from './market.module';

describe('UserModule', () => {
  let userModule: MarketModule;

  beforeEach(() => {
    userModule = new MarketModule();
  });

  it('should create an instance', () => {
    expect(MarketModule).toBeTruthy();
  });
});
