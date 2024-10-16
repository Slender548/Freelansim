/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  VirtualizedList,
} from 'react-native';
import SideButton from './src/SideButton';
import {parse} from 'node-html-parser';
import ChosenOrder from './src/ChosenOrder';

type FullOrder = {
  title?: string;
  description?: string;
  price?: string;
  views?: string;
  responses?: string;
  published?: string;
  tags: string[];
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
  const [curOrderUrl, setCetOrderUrl] = useState<string | undefined>();
  const [curQuery, setCurQuery] = useState<string>('');
  const [curPage, setCurPage] = useState<number>(0);

  useEffect(() => {
    updateOrders();
  }, []);

  function updateOrders() {
    fetch('https://freelance.habr.com/tasks')
      .then(res => res.text())
      .then(text => {
        const res: Order[] = [];
        const dom = parse(text);
        dom
          .querySelectorAll('.content-list__item article')
          .forEach(jobListing => {
            const title = jobListing
              .querySelector('.task__title a')
              ?.textContent.trim();
            const url = jobListing.querySelector('a')?.getAttribute('href');
            const responses = jobListing
              .querySelector('.params__responses')
              ?.textContent.trim();
            const views = jobListing
              .querySelector('.params__views')
              ?.textContent.trim();
            const published = jobListing
              .querySelector('.params__published-at')
              ?.textContent.trim();
            const price = jobListing
              .querySelector('.task__price .count')
              ?.textContent.trim();
            const tags = Array.from(
              jobListing.querySelectorAll('.tags__item_link'),
            ).map(tag => tag.textContent.trim());
            res.push({title, responses, views, published, price, tags, url});
          });
        setOrders(res);
      });
  }

  function display(task_url: string | undefined) {
    if (!task_url) {
      return;
    }
    const url = `https://freelance.habr.com${task_url}`;
    setCetOrderUrl(url);
    fetch(url)
      .then(res => res.text())
      .then(text => {
        const dom = parse(text);
        const title = dom.querySelector('.task__title ')?.textContent.trim();
        const price = dom.querySelector('.task__finance')?.textContent.trim();
        const tags = Array.from(dom.querySelectorAll('.tags__item_link')).map(
          tag => tag.textContent.trim(),
        );
        const description = dom
          .querySelector('.task__description')
          ?.textContent.trim();
        const metaText = dom.querySelector('.task__meta')?.textContent.trim();
        if (metaText) {
          const [published, responses, views] = metaText
            .trim()
            .replaceAll('\n', '')
            .split('•');
          setCurOrder({
            published,
            responses,
            views,
            description,
            title,
            price,
            tags,
            url,
          });
        }
      });
  }

  function addMoreOrders() {
    setOrders([...orders, ...orders]);
  }

  return (
    <View style={styles.wholeWindow}>
      <VirtualizedList style={styles.ordersMenu}
        renderItem={({item}: {item: Order}) => <SideButton display={display} {...item} />}
        keyExtractor={(_item, index) => index.toString()}
        getItemCount={() => orders.length}
        getItem={(_data, index) => orders[index]}
        onEndReached={addMoreOrders}
        onEndReachedThreshold={0.5}
      />
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
