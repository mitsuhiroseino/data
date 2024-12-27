import clone from 'lodash/clone';
import { Entity, EntityItem } from '../../entities';
import CollectionBase, { COLLECTION_BASE_EVENTS } from '../CollectionBase';
import NoopCollection from '../NoopCollection';
import { Collection } from '../types';
import { ChainedCollectionConfig, ChainedCollectionEventHandlers } from './types';

/**
 * 他のコレクションと連動するコレクション
 */
class ChainedCollection<
  I extends EntityItem = EntityItem,
  S extends Collection<I> = Collection<I>,
  H extends ChainedCollectionEventHandlers<I> = ChainedCollectionEventHandlers<I>,
  C extends ChainedCollectionConfig<I, S, H> = ChainedCollectionConfig<I, S, H>,
> extends CollectionBase<I, S, H, C> {
  protected _setSource(source: S): void {
    const me = this,
      oldSource = me._source;
    if (oldSource) {
      // イベントハンドラーを削除
      oldSource.removeHandlers(me);
    }
    if (source) {
      // イベントハンドラーを設定
      source.on(
        COLLECTION_BASE_EVENTS.datachange,
        ({ params }) => {
          me._setSourceEntities(params.data);
        },
        { owner: me },
      );
    } else {
      source = new NoopCollection<I>() as any;
    }
    me._source = source;
  }

  protected _toSourceEntities(source: S = this._source): Entity<I>[] {
    return clone(source.getEntities());
  }

  destructor(): void {
    this._source.removeHandlers(this);
    super.destructor();
  }
}
export default ChainedCollection;
