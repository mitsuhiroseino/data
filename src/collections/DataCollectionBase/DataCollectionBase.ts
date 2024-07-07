import { EventsConfig } from '@visue/core/events/Events';
import asArray from '@visue/utils/array/asArray';
import clear from '@visue/utils/array/clear';
import remove from 'lodash/remove';
import { Entity, EntityItem } from '../../entities';
import DataEntity from '../../entities/DataEntity';
import toIds from '../../helpers/toIds';
import { ValueRule, ValueRuleFactory } from '../../valuerules';
import CollectionBase from '../CollectionBase';
import { IEditableCollection } from '../types';
import { DataCollectionBaseEvents } from './constants';
import { DataCollectionBaseConfig, DataCollectionBaseEventHandlers } from './types';

/**
 * 配列をソースとするコレクションの抽象クラス
 */
abstract class DataCollectionBase<
    I extends EntityItem = EntityItem,
    S = I[],
    H extends DataCollectionBaseEventHandlers<I> = DataCollectionBaseEventHandlers<I>,
    C extends DataCollectionBaseConfig<I, S, H> = DataCollectionBaseConfig<I, S, H>,
  >
  extends CollectionBase<I, S, H, C>
  implements IEditableCollection<I, S, H>
{
  /**
   * 値規定
   */
  private _valueRules!: ValueRule[];

  constructor(config?: C) {
    super(config);
    const me = this,
      { valueRules } = me.config;
    me._valueRules = ValueRuleFactory.from(valueRules);
  }

  protected _getEventsConfig(): EventsConfig<H> {
    return {
      eventTransformation: {
        // Entityの発火するupdateイベントはentitiesupdateに移譲
        update: {
          type: DataCollectionBaseEvents.entitiesupdate,
          convertParams: ({ entity, ...rest }) => ({ entities: [entity], ...rest }),
          target: this,
        },
      },
    };
  }

  protected _setSource(source: S) {
    const me = this;
    me._source = source || ([] as S);
  }

  protected _toSourceEntities(source: S = this._source): Entity<I>[] {
    return this._toEntities(source as I[]) as unknown as Entity<I>[];
  }

  /**
   * itemsをentitiesに変換
   * @param items
   * @returns
   */
  protected _toEntities(items: I | I[]): Entity<I>[] {
    return asArray(items).map((item) => this._toEntity(item));
  }

  /**
   * itemをentityに変換
   * @param items
   * @returns
   */
  protected _toEntity(item: I): Entity<I> {
    return new DataEntity({
      item,
      events: this._events as any,
      valueRules: this._valueRules,
    });
  }

  add(items: I | I[]): Entity<I>[] {
    const me = this,
      entities = me._toEntities(items);
    me._sourceEntities.push(...entities);
    me.fire(DataCollectionBaseEvents.entitiesadd, { entities });
    me._applyEntities();
    return entities;
  }

  update(updates: Partial<I> | Partial<I>[]): Entity<I>[] {
    const items = asArray(updates),
      entities: Entity<I>[] = [];
    for (const item of items) {
      const entity = this.get(item.$id as string);
      if (entity) {
        entity.update(item, true);
        entities.push(entity);
      }
    }
    this.fire(DataCollectionBaseEvents.entitiesupdate, { entities });
    this._applyEntities();
    return entities;
  }

  remove(targets: string | I | (string | I)[]): Entity<I>[] {
    const me = this,
      ids = toIds(targets).reduce((result, id) => {
        result[id] = true;
        return result;
      }, {});
    // 対象を削除
    const removed = remove(me._sourceEntities, (entity) => ids[entity.$id]),
      entities = removed.map(me._releaseEntity);
    me.fire(DataCollectionBaseEvents.entitiesremove, { entities });
    me._applyEntities();
    return entities;
  }

  claer(): Entity<I>[] {
    const me = this,
      entities = me._sourceEntities.map(me._releaseEntity);
    clear(me._sourceEntities);
    me.fire(DataCollectionBaseEvents.entitiesclear, { entities });
    me._applyEntities();
    return entities;
  }

  /**
   * Entityを管理対象から外す際の処理
   * @param entity
   * @returns
   */
  private _releaseEntity(entity: Entity<I>): Entity<I> {
    entity.initEvents();
    return entity;
  }
}
export default DataCollectionBase;
