import DataEntityBase, { DATA_ENTITY_BASE_EVENTS } from '../DataEntityBase';
import NoopEntity from '../NoopEntity';
import { Entity } from '../types';
import { ChainedEntityConfig, ChainedEntityEventHandlers } from './types';

/**
 * 他のエンティティと連動するエンティティ
 */
class ChainedEntity<
  I extends Entity = Entity,
  H extends ChainedEntityEventHandlers<I> = ChainedEntityEventHandlers<I>,
  C extends ChainedEntityConfig<I, H> = ChainedEntityConfig<I, H>,
> extends DataEntityBase<I, H, C> {
  protected _setItem(item: I): void {
    const me = this,
      oldItem = me._item;
    if (oldItem) {
      // イベントハンドラーを削除
      oldItem.removeHandlers(me);
    }
    if (item) {
      // イベントハンドラーを設定
      const handler = (({ entity }) => {
          me._setItem(entity);
        }) as any,
        options = { owner: me };
      item.addHandlers(
        { [DATA_ENTITY_BASE_EVENTS.update]: handler, [DATA_ENTITY_BASE_EVENTS.itemchange]: handler },
        options,
      );
    } else {
      me._setItem(new NoopEntity() as any);
    }
    me._item = item;
  }

  destructor(): void {
    this._item.removeHandlers(this);
    super.destructor();
  }
}
export default ChainedEntity;
