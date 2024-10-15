/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {parse} from 'node-html-parser';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

// function Section({children, title}: SectionProps): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }
type FullOrder = {
  title?: string;
  description?: string,
  price?: string;
  views?: string;
  responses?: string;
  published?: Date;
  tags: string[];
}

type Order = {
  title?: string;
  price?: string;
  views?: string;
  responses?: string;
  published?: string;
  tags: string[];
};

function App(): React.JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';
  const [orders, setOrders] = useState<Order[]>([]);
  const [curOrder, setCurOrder] = useState<FullOrder|undefined>();

  function updateOrders() {
    fetch('https://freelance.habr.com/tasks?q=python')
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
            res.push({title, responses, views, published, price, tags});
          });
        setOrders(res);
      });
  }

  function display(task_url: string) {
    fetch(`https://freelance.habr.com${task_url}`)
      .then(res => res.text())
      .then(text => {
        const dom = parse(text);
        const title = dom.querySelector('.task__title ')?.textContent.trim();
        const price = dom.querySelector('.task__finance')?.textContent.trim();
        const tags = Array.from(dom.querySelectorAll('.task__tags ui li')).map(tag => tag.textContent.trim());
        const description = dom.querySelector('.task__description')?.textContent.trim();
      })
  }

  return (
    <View style={styles.wholeWindow}>
      <ScrollView style={styles.ordersMenu}>
        {orders.map((order, index) => (
          <TouchableHighlight key={index} onPress={() => display(order.url)}>
            <View style={styles.sideButton}>
              <View style={styles.sideButtonTitle}>
                <Text style={styles.sideButtonTitleText}>{order.title}</Text>
              </View>
              <View style={styles.sideButtonDownView}>
                <View>
                  <Text style={styles.sideButtonPrice}>
                    {order.price ? order.price : 'Договорная'}
                  </Text>
                </View>
                <View style={styles.sideButtonTags}>
                  {order.tags.map((tag, idx) => (
                    <Text style={styles.sideButtonTag} key={idx}>
                      {tag}
                    </Text>
                  ))}
                </View>
                <View style={styles.sideButtonSeen}>
                  <Text>{order.responses} </Text>
                  <Text>{order.views}</Text>
                </View>
                <View style={styles.sideButtonPub}>
                  <Text>{order.published} </Text>
                </View>
              </View>
            </View>
          </TouchableHighlight>
        ))}
      </ScrollView>
      <View style={styles.orderCur}>
        <Button title="Update" onPress={updateOrders} />
      </View>
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
  orderCur: {
    flex: 2,
  },
  sideButton: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 4,
  },
  sideButtonTitle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sideButtonTitleText: {
    textAlign: 'center',
  },
  sideButtonDownView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sideButtonPrice: {
    textDecorationLine: 'underline',
    textDecorationColor: 'red',
    textDecorationStyle: 'solid',
  },
  sideButtonTags: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    flexWrap: 'wrap',
  },
  sideButtonTag: {
    borderRadius: 4,
    borderColor: 'white',
    borderWidth: 1,
    paddingHorizontal: 2,
  },
  sideButtonSeen: {
    flexDirection: 'row',
    gap: 3,
  },
  sideButtonPub: {

  },
});

export default App;
