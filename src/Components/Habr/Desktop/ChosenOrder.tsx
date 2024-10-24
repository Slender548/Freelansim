import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  Linking,
} from 'react-native';

const styles = StyleSheet.create({
  curOrderTitleText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  curOrderTitleView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  curOrderDescription: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: '90%',
  },
  curOrderMetaView: {
    flexDirection: 'row',
    width: '60%',
    gap: 100,
    alignSelf: 'flex-end',
  },
  curOrderInteractionsView: {
    borderWidth: 1,
    marginTop: 10,
    borderColor: 'white',
    borderRadius: 4,
  },
  curOrderResponsesText: {
    borderBottomWidth: 1,
    borderColor: 'white',
  },
  curOrderPublishedText: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  curOrderTags: {
    flexDirection: 'row',
    gap: 5,
    marginTop: 10,
  },
  curOrderTag: {
    borderRadius: 4,
    borderColor: 'white',
    borderWidth: 1,
    paddingHorizontal: 2,
  },
  curOrderButtonView: {
      marginTop: 20, width: '90%', alignSelf: 'center',
  },
  orderCur: {
    flex: 2,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

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

type ChosenOrderProps = {
  curOrder?: FullOrder;
};

export default function ChosenOrder({curOrder}: ChosenOrderProps) {
  return (
    <View style={styles.orderCur}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        {curOrder ? (
          <View>
            <View style={styles.curOrderTitleView}>
              <View>
                <Text style={styles.curOrderTitleText}>
                  {curOrder.title?.replaceAll('\n', '')}
                </Text>
              </View>
              <View>
                <Text style={styles.curOrderTitleText}>
                  {curOrder.price ? curOrder.price : 'Договорная'}
                </Text>
              </View>
              <View style={styles.curOrderTags}>
                {curOrder.tags ? curOrder.tags.map((tag, idx) => (
                  <Text key={idx} style={styles.curOrderTag}>
                    {tag}
                  </Text>
                )) : null}
              </View>
              <View style={styles.curOrderMetaView}>
                <View style={styles.curOrderInteractionsView}>
                  <Text style={styles.curOrderResponsesText}>
                    {curOrder.responses}
                  </Text>
                  <Text>{curOrder.views}</Text>
                </View>
                <View style={styles.curOrderPublishedText}>
                  <Text>{curOrder.published}</Text>
                </View>
              </View>
            </View>
            <View style={styles.curOrderDescription}>
              <Text>{curOrder.description}</Text>
            </View>
            <View style={styles.curOrderButtonView}>
              <Button
                title="Перейти"
                onPress={() => Linking.openURL(curOrder.url!)}
              />
            </View>
          </View>
        ) : (
          <View style={styles.center}>
            <Text>Выберите задание</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
