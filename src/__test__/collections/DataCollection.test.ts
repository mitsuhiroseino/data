import { NumberFilterConfig, RELATIONAL_OPERATOR } from '@visue/datakit/filters/NumberFilter';
import { LengthSorterConfig } from '@visue/datakit/sorters/LengthSorter';
import { NumberSorterConfig } from '@visue/datakit/sorters/NumberSorter';
import { ValueSorterConfig } from '@visue/datakit/sorters/ValueSorter';
import { COLLECTION_TYPES, CollectionFactory } from 'src/collections';
import DataCollection, { DATA_COLLECTION_EVENTS } from 'src/collections/DataCollection';

const getData = () => {
  const VALUE_RULES = [
      { type: 'typed', name: 'property0', valueType: 'number' },
      { type: 'typed', name: 'property1', valueType: 'number' },
      { type: 'typed', name: 'property2', valueType: 'number' },
      { type: 'typed', name: 'property3', valueType: 'string' },
    ],
    ITEM0 = { $id: 'ID0', property0: 0, property1: 4, property2: 0, property3: '!!' },
    ITEM1 = { $id: 'ID1', property0: 1, property1: 3, property2: 1, property3: '!!' },
    ITEM2 = { $id: 'ID2', property0: 2, property1: 2, property2: 0, property3: '!' },
    ITEM3 = { $id: 'ID3', property0: 3, property1: 1, property2: 1, property3: '!' },
    ITEM4 = { $id: 'ID4', property0: 4, property1: 0, property2: 0, property3: '!' },
    SOURCE5 = [ITEM0, ITEM1, ITEM2, ITEM3, ITEM4],
    SOURCE3 = [ITEM0, ITEM1, ITEM2],
    SOURCE0 = [],
    EXPECTED_ENTITY0 = { item: ITEM0 },
    EXPECTED_ENTITY1 = { item: ITEM1 },
    EXPECTED_ENTITY2 = { item: ITEM2 },
    EXPECTED_ENTITY3 = { item: ITEM3 },
    EXPECTED_ENTITY4 = { item: ITEM4 },
    EXPECTED_ENTITIES5 = [EXPECTED_ENTITY0, EXPECTED_ENTITY1, EXPECTED_ENTITY2, EXPECTED_ENTITY3, EXPECTED_ENTITY4],
    EXPECTED_ENTITIES3 = [EXPECTED_ENTITY0, EXPECTED_ENTITY1, EXPECTED_ENTITY2],
    EXPECTED_ENTITIES0 = [];
  return {
    VALUE_RULES,
    ITEM0,
    ITEM1,
    ITEM2,
    ITEM3,
    ITEM4,
    SOURCE5,
    SOURCE3,
    SOURCE0,
    ENTITY0: EXPECTED_ENTITY0,
    ENTITY1: EXPECTED_ENTITY1,
    ENTITY2: EXPECTED_ENTITY2,
    ENTITY3: EXPECTED_ENTITY3,
    ENTITY4: EXPECTED_ENTITY4,
    ENTITIES5: EXPECTED_ENTITIES5,
    ENTITIES3: EXPECTED_ENTITIES3,
    ENTITIES0: EXPECTED_ENTITIES0,
  };
};

describe('DataCollection', () => {
  describe('Factory', () => {
    test('create', () => {
      const result: DataCollection = CollectionFactory.create(COLLECTION_TYPES.DATA);
      expect(result).toBeInstanceOf(DataCollection);
    });
  });

  describe('コレクションの操作', () => {
    test('初期状態', () => {
      const { VALUE_RULES, SOURCE5, ENTITIES5 } = getData();
      const collection = new DataCollection({
        source: SOURCE5,
        valueRules: VALUE_RULES,
      });

      // sourceの状態
      expect(collection.getSourceSize()).toBe(5);
      expect(collection.getSourceItems()).toEqual(SOURCE5);
      expect(collection.getSourceEntities()).toMatchObject(ENTITIES5);
      // dataの状態
      expect(collection.getSize()).toBe(5);
      expect(collection.getItems()).toEqual(SOURCE5);
      expect(collection.getEntities()).toMatchObject(ENTITIES5);
    });

    test('フィルタリング', () => {
      const {
        VALUE_RULES,
        ITEM0,
        ITEM1,
        ITEM2,
        ITEM3,
        ITEM4,
        SOURCE5,
        ENTITY0,
        ENTITY1,
        ENTITY2,
        ENTITY3,
        ENTITY4,
        ENTITIES5,
      } = getData();

      const filters: NumberFilterConfig = { $id: 'filter0', type: 'number', path: 'property1', not: true, value: 2 },
        collection = new DataCollection({
          source: SOURCE5,
          filters,
          valueRules: VALUE_RULES,
        });

      // sourceの状態
      expect(collection.getSourceSize()).toBe(5);
      expect(collection.getSourceItems()).toEqual(SOURCE5);
      expect(collection.getSourceEntities()).toMatchObject(ENTITIES5);
      // dataの状態
      expect(collection.getSize()).toBe(4);
      expect(collection.getItems()).toEqual([ITEM0, ITEM1, ITEM3, ITEM4]);
      expect(collection.getEntities()).toMatchObject([ENTITY0, ENTITY1, ENTITY3, ENTITY4]);

      const filter: NumberFilterConfig = {
        $id: 'filter1',
        type: 'number',
        path: 'property0',
        value: 1,
        operator: RELATIONAL_OPERATOR.GT,
      };
      collection.addFilters(filter);

      // sourceの状態
      expect(collection.getSourceSize()).toBe(5);
      expect(collection.getSourceItems()).toEqual(SOURCE5);
      expect(collection.getSourceEntities()).toMatchObject(ENTITIES5);
      // dataの状態
      expect(collection.getSize()).toBe(2);
      expect(collection.getItems()).toEqual([ITEM3, ITEM4]);
      expect(collection.getEntities()).toMatchObject([ENTITY3, ENTITY4]);

      collection.removeFilters('filter0');

      // sourceの状態
      expect(collection.getSourceSize()).toBe(5);
      expect(collection.getSourceItems()).toEqual(SOURCE5);
      expect(collection.getSourceEntities()).toMatchObject(ENTITIES5);
      // dataの状態
      expect(collection.getSize()).toBe(3);
      expect(collection.getItems()).toEqual([ITEM2, ITEM3, ITEM4]);
      expect(collection.getEntities()).toMatchObject([ENTITY2, ENTITY3, ENTITY4]);
    });

    test('ソーティング', () => {
      const {
        VALUE_RULES,
        ITEM0,
        ITEM1,
        ITEM2,
        ITEM3,
        ITEM4,
        SOURCE5,
        ENTITY0,
        ENTITY1,
        ENTITY2,
        ENTITY3,
        ENTITY4,
        ENTITIES5,
      } = getData();

      const sorters: NumberSorterConfig = { $id: 'sort0', type: 'number', path: 'property2' },
        collection = new DataCollection({
          source: SOURCE5,
          sorters,
          valueRules: VALUE_RULES,
        });

      // sourceの状態
      expect(collection.getSourceSize()).toBe(5);
      expect(collection.getSourceItems()).toEqual(SOURCE5);
      expect(collection.getSourceEntities()).toMatchObject(ENTITIES5);
      // dataの状態
      expect(collection.getSize()).toBe(5);
      expect(collection.getItems()).toEqual([ITEM0, ITEM2, ITEM4, ITEM1, ITEM3]);
      expect(collection.getEntities()).toMatchObject([ENTITY0, ENTITY2, ENTITY4, ENTITY1, ENTITY3]);

      const sorter: LengthSorterConfig = { $id: 'sort1', type: 'length', path: 'property3' };
      collection.addSorters(sorter);

      // sourceの状態
      expect(collection.getSourceSize()).toBe(5);
      expect(collection.getSourceItems()).toEqual(SOURCE5);
      expect(collection.getSourceEntities()).toMatchObject(ENTITIES5);
      // dataの状態
      expect(collection.getSize()).toBe(5);
      expect(collection.getItems()).toEqual([ITEM2, ITEM4, ITEM3, ITEM0, ITEM1]);
      expect(collection.getEntities()).toMatchObject([ENTITY2, ENTITY4, ENTITY3, ENTITY0, ENTITY1]);

      collection.removeSorters('sort0');

      // sourceの状態
      expect(collection.getSourceSize()).toBe(5);
      expect(collection.getSourceItems()).toEqual(SOURCE5);
      expect(collection.getSourceEntities()).toMatchObject(ENTITIES5);
      // dataの状態
      expect(collection.getSize()).toBe(5);
      expect(collection.getItems()).toEqual([ITEM2, ITEM3, ITEM4, ITEM0, ITEM1]);
      expect(collection.getEntities()).toMatchObject([ENTITY2, ENTITY3, ENTITY4, ENTITY0, ENTITY1]);
    });
  });

  describe('events', () => {
    test('constructer', () => {
      const { VALUE_RULES, SOURCE5, SOURCE3, ENTITIES3, ITEM0, ITEM1, ITEM2 } = getData();

      const onSourceChange = jest.fn(),
        onDataChange = jest.fn(),
        collection = new DataCollection({
          source: SOURCE5,
          handlers: {
            [DATA_COLLECTION_EVENTS.sourcechange]: onSourceChange,
            [DATA_COLLECTION_EVENTS.datachange]: onDataChange,
          },
          valueRules: VALUE_RULES,
        });

      // イベントの発火状況
      expect(onSourceChange).toBeCalledTimes(0);
      expect(onDataChange).toBeCalledTimes(0);

      onSourceChange.mockReset();
      onDataChange.mockReset();

      // ソースの差し替え
      collection.setSource(SOURCE3);

      // イベントの発火状況
      expect(onSourceChange).toBeCalledTimes(1);
      expect(onSourceChange).toBeCalledWith(
        expect.objectContaining({
          type: DATA_COLLECTION_EVENTS.sourcechange,
          params: expect.objectContaining({
            source: [
              expect.objectContaining({ item: ITEM0 }),
              expect.objectContaining({ item: ITEM1 }),
              expect.objectContaining({ item: ITEM2 }),
            ],
          }),
        }),
      );
      expect(onDataChange).toBeCalledTimes(1);
      expect(onDataChange.mock.calls[0][0]).toMatchObject({
        type: DATA_COLLECTION_EVENTS.datachange,
        params: { data: ENTITIES3 },
      });
    });

    test('sourcechange & datachange', () => {
      const { VALUE_RULES, SOURCE5, SOURCE0, ENTITIES5 } = getData();

      const onSourceChange = jest.fn(),
        onDataChange = jest.fn(),
        collection = new DataCollection({ source: SOURCE0, valueRules: VALUE_RULES });
      // sourceの変更
      collection.on(DATA_COLLECTION_EVENTS.sourcechange, onSourceChange);
      // dataの変更
      collection.on(DATA_COLLECTION_EVENTS.datachange, onDataChange);

      // イベントの発火状況
      expect(onSourceChange).toBeCalledTimes(0);
      expect(onDataChange).toBeCalledTimes(0);

      onSourceChange.mockReset();
      onDataChange.mockReset();

      // ソースの差し替え
      collection.setSource(SOURCE5);

      // イベントの発火状況
      expect(onSourceChange).toBeCalledTimes(1);
      expect(onSourceChange.mock.calls[0][0]).toMatchObject({
        type: DATA_COLLECTION_EVENTS.sourcechange,
        params: { source: ENTITIES5 },
      });
      expect(onDataChange).toBeCalledTimes(1);
      expect(onDataChange.mock.calls[0][0]).toMatchObject({
        type: DATA_COLLECTION_EVENTS.datachange,
        params: { data: ENTITIES5 },
      });
    });

    test('filterchange & datachange', () => {
      const { VALUE_RULES, SOURCE5, ENTITY1, ENTITY2, ENTITY3, ENTITY4 } = getData();

      const onFilterChange = jest.fn(),
        onDataChange = jest.fn(),
        filters: NumberFilterConfig = {
          $id: 'filter0',
          type: 'number',
          path: 'property0',
          value: 4,
          operator: RELATIONAL_OPERATOR.LT,
        },
        collection = new DataCollection({
          source: SOURCE5,
          filters,
          handlers: {
            [DATA_COLLECTION_EVENTS.filterchange]: onFilterChange,
            [DATA_COLLECTION_EVENTS.datachange]: onDataChange,
          },
          valueRules: VALUE_RULES,
        });

      // イベントの発火状況
      expect(onFilterChange).toBeCalledTimes(0);
      expect(onDataChange).toBeCalledTimes(0);

      onFilterChange.mockReset();
      onDataChange.mockReset();

      // フィルターの追加
      const filter: NumberFilterConfig = {
        $id: 'filter1',
        type: 'number',
        path: 'property0',
        value: 0,
        operator: RELATIONAL_OPERATOR.GT,
      };
      collection.addFilters(filter);

      // イベントの発火状況
      expect(onFilterChange).toBeCalledTimes(1);
      expect(onDataChange).toBeCalledTimes(1);
      expect(onDataChange.mock.calls[0][0]).toMatchObject({
        type: DATA_COLLECTION_EVENTS.datachange,
        params: {
          data: [ENTITY1, ENTITY2, ENTITY3],
        },
      });

      onFilterChange.mockReset();
      onDataChange.mockReset();

      // フィルターの削除
      collection.removeFilters('filter0');

      // イベントの発火状況
      expect(onFilterChange).toBeCalledTimes(1);
      expect(onDataChange).toBeCalledTimes(1);
      expect(onDataChange.mock.calls[0][0]).toMatchObject({
        type: DATA_COLLECTION_EVENTS.datachange,
        params: {
          data: [ENTITY1, ENTITY2, ENTITY3, ENTITY4],
        },
      });
    });

    test('sortchange & datachange', () => {
      const { VALUE_RULES, SOURCE5, ENTITY0, ENTITY1, ENTITY2, ENTITY3, ENTITY4 } = getData();

      const onSortChange = jest.fn(),
        onDataChange = jest.fn(),
        sorters: ValueSorterConfig = { $id: 'sort0', type: 'value', path: 'property2' },
        collection = new DataCollection({
          source: SOURCE5,
          sorters,
          handlers: {
            [DATA_COLLECTION_EVENTS.sortchange]: onSortChange,
            [DATA_COLLECTION_EVENTS.datachange]: onDataChange,
          },
          valueRules: VALUE_RULES,
        });

      // イベントの発火状況
      expect(onSortChange).toBeCalledTimes(0);
      expect(onDataChange).toBeCalledTimes(0);

      onSortChange.mockReset();
      onDataChange.mockReset();

      // ソーターの追加
      const sorter: ValueSorterConfig = { $id: 'sort1', type: 'value', path: 'property3' };
      collection.addSorters(sorter);

      // イベントの発火状況
      expect(onSortChange).toBeCalledTimes(1);
      expect(onDataChange).toBeCalledTimes(1);
      expect(onDataChange.mock.calls[0][0]).toMatchObject({
        type: DATA_COLLECTION_EVENTS.datachange,
        params: {
          data: [ENTITY2, ENTITY4, ENTITY3, ENTITY0, ENTITY1],
        },
      });

      onSortChange.mockReset();
      onDataChange.mockReset();

      // フィルターの削除
      collection.removeSorters('sort0');

      // イベントの発火状況
      expect(onSortChange).toBeCalledTimes(1);
      expect(onDataChange).toBeCalledTimes(1);
      expect(onDataChange.mock.calls[0][0]).toMatchObject({
        type: DATA_COLLECTION_EVENTS.datachange,
        params: {
          data: [ENTITY2, ENTITY3, ENTITY4, ENTITY0, ENTITY1],
        },
      });
    });

    test('update', () => {
      const { VALUE_RULES, ITEM2, SOURCE5 } = getData();

      const onUpdate = jest.fn(),
        collection = new DataCollection({
          source: SOURCE5,
          handlers: {
            [DATA_COLLECTION_EVENTS.entitiesupdate]: onUpdate,
          },
          valueRules: VALUE_RULES,
        });

      // イベントの発火状況
      expect(onUpdate).toBeCalledTimes(0);

      onUpdate.mockReset();

      // entityを更新
      const entity = collection.get(ITEM2.$id);
      entity?.update({ property0: 20 });

      // 更新状況
      expect(entity?.get('property0')).toBe(20);
      // イベントの発火状況
      expect(onUpdate).toBeCalledTimes(1);
      expect(onUpdate.mock.calls[0][0]).toMatchObject({
        type: DATA_COLLECTION_EVENTS.entitiesupdate,
        params: {
          entities: [entity],
        },
      });
    });

    test('destroy', () => {
      const { VALUE_RULES, SOURCE5 } = getData();

      const onDestroy = jest.fn(),
        collection = new DataCollection({
          source: SOURCE5,
          handlers: {
            [DATA_COLLECTION_EVENTS.DESTROY]: onDestroy,
          },
          valueRules: VALUE_RULES,
        });

      // 破棄
      collection.destructor();

      // イベントの発火状況
      expect(onDestroy).toBeCalledTimes(1);
      expect(onDestroy.mock.calls[0][0]).toMatchObject({
        type: DATA_COLLECTION_EVENTS.DESTROY,
        params: {},
      });
    });
  });
});
