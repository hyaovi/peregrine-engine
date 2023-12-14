export class BaseEntity implements IBaseEntityClass {
  public engineContext!: IEngineContext;
  constructor() {}
  init({}: IEngineContext): void {}
  start({}: IEngineContext) {}
  stop({}: IEngineContext): void {}
  resize({}: IEngineContext): void {}
  update(delta: number, {}: IEngineContext): void {}
  destroy({}: IEngineContext): void {}
  raycasterClick(): void {}
}
