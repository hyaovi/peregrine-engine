import { GridHelper} from 'three';
import { ObjectEntity } from '../Object';

export class Grid extends ObjectEntity {
  public readonly isRaycastable = false;
  constructor() {
    super();
    const size = 30;
    const divisions = 30;
    const gridHelper = new GridHelper(size, divisions, 0x888888);
    this.object.add(gridHelper);
  }
}
