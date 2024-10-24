import React, {useCallback, useEffect, useState} from 'react';
import {VirtualizedList, View, Text, ScrollView} from 'react-native';
import {SideButton} from './SideButton';
import DelayInput from 'react-native-debounce-input';
import {SearchParse} from '../../../Parsers/Habr/SearchParser';
import parse from 'node-html-parser';

type Order = {
  title?: string;
  price?: string;
  views?: string;
  responses?: string;
  published?: string;
  tags: string[];
  url?: string;
};

// const styles = StyleSheet.create({});

export function Main({navigation}: {navigation: any}) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [curQuery, setCurQuery] = useState<string>('');
  const [curPage, setCurPage] = useState<number>(1);
  const [query, setQuery] = useState<string>('');

  const updateOrders = useCallback(() => {
    setCurPage(1);
    const res = SearchParse(curQuery, 1);
    // console.log(res);
    // const res = [{
    //   title: '1',
    //   price: '2',
    //   views: '3',
    //   responses: '4',
    //   published: '5',
    //   tags: ['6', '7'],
    //   url: '8',
    // }];
    setOrders(res);
  }, [curQuery]);

  function navigate(url: string) {
    navigation.navigate('Details', {url});
  }

  useEffect(() => {
    updateOrders();
  }, [updateOrders]);

  function addMoreOrders() {
    setCurPage(_curPage => {
      return _curPage + 1;
    });
    const res = SearchParse(curQuery, curPage);
    setOrders([...orders, ...res]);
  }

  function handleChangeQuery(query: string | number) {
    setCurQuery(typeof query === 'string' ? query : String(query));
  }


  return (
    <View>
      <DelayInput
        value={curQuery}
        onChangeText={handleChangeQuery}
        placeholder="Search..."
        minLength={2}
        delayTimeout={1500}
      />
      <Text>{orders?.length}</Text>
      <VirtualizedList
        renderItem={({item}: {item: Order}) => (
          <SideButton navigate={navigate} {...item} />
        )}
        keyExtractor={(_item, index) => index.toString()}
        getItemCount={() => orders.length}
        getItem={(_data, index) => orders[index]}
        onEndReached={addMoreOrders}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}
