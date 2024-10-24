/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View, VirtualizedList} from 'react-native';
import SideButton from './src/Components/Habr/Desktop/SideButton';
import ChosenOrder from './src/Components/Habr/Desktop/ChosenOrder';
import DelayInput from 'react-native-debounce-input';
import Filters from './src/Filters';
import { SearchParse } from './src/Parsers/Habr/SearchParser';
import { PageParse } from './src/Parsers/Habr/PageParser';

type FullOrder = {
  title?: string;
  description?: string;
  price?: string;
  views?: string;
  responses?: string;
  published?: string;
  tags?: string[];
  url?: string;
};

type Order = {
  title?: string;
  price?: string;
  views?: string;
  responses?: string;
  published?: string;
  tags: string[];
  url?: string;
};

function App(): React.JSX.Element {
  const [orders, setOrders] = useState<Order[]>([]);
  const [curOrder, setCurOrder] = useState<FullOrder | undefined>();
  const [curQuery, setCurQuery] = useState<string>('');
  const [curPage, setCurPage] = useState<number>(1);
  const [filtersOpened, setFiltersOpened] = useState<boolean>(false);

  function updateOrders() {
    setCurPage(1);
    const res = SearchParse(curQuery, curPage);
    setOrders(res);
    console.log(res);
  }

  useEffect(() => {
    updateOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curQuery]);

  function display(task_url: string | undefined) {
    if (!task_url) {
      return;
    }
    const url = `https://freelance.habr.com${task_url}`;
    const res = PageParse(url);
    setCurOrder(res);
  }

  function addMoreOrders() {
    setCurPage((_curPage) => {return _curPage + 1;});
    const res = SearchParse(curQuery, curPage);
    setOrders([...orders, ...res]);
  }

  function handleChangeQuery(query: string | number) {
    setCurQuery(typeof query === 'string' ? query : String(query));
  }

  function showPopup() {
    setFiltersOpened(true);
  }

  return (
    <View style={styles.wholeWindow}>
      {filtersOpened && <Filters />}
      <View style={styles.ordersMenu}>
        {/* <SearchBar  */}
        <View style={{flexDirection: 'row', width: '100%',}}>
          <DelayInput
            style={{width: '90.5%'}}
            onChangeText={handleChangeQuery}
            value={curQuery}
            minLength={2}
            delayTimeout={500}
            placeholder="Search..."
          />
          <Button title="☰" onPress={showPopup} />
        </View>
        <VirtualizedList
          renderItem={({item}: {item: Order}) => (
            <SideButton display={display} {...item} />
          )}
          keyExtractor={(_item, index) => index.toString()}
          getItemCount={() => orders.length}
          getItem={(_data, index) => orders[index]}
          onEndReached={addMoreOrders}
          onEndReachedThreshold={0.5}
        />
      </View>
      <ChosenOrder curOrder={curOrder} />
    </View>
  );
}

const styles = StyleSheet.create({
  wholeWindow: {
    flexDirection: 'row',
  },
  ordersMenu: {
    flex: 1,
    flexDirection: 'column',
  },
});

export default App;
