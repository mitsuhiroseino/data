import { Entity, EntityItem } from '../../entities';
import CollectionBase from '../CollectionBase';
import { NoopCollectionConfig, NoopCollectionEventHandlers } from './types';

/**
 * 常にエンティティが0件のコレクション
 */
class NoopCollection<
  I extends EntityItem = EntityItem,
  S = any,
  H extends NoopCollectionEventHandlers<I> = NoopCollectionEventHandlers<I>,
  C extends NoopCollectionConfig<I, S, H> = NoopCollectionConfig<I, S, H>,
> extends CollectionBase<I, S, H, C> {
  protected _setSource(source: S): void {}

  protected _toSourceEntities(source: S): Entity<I>[] {
    return [];
  }

  protected _toSourceItems(source: S): I[] {
    return [];
  }

  getSourceItems(): I[] {
    return [];
  }

  getSourceEntities(): Entity<I>[] {
    return [];
  }

  getSourceSize(): number {
    return 0;
  }
}
export default NoopCollection;
