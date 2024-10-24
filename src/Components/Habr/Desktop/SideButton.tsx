import React from 'react';
import { TouchableHighlight, View, Text, StyleSheet } from 'react-native';

type Order = {
    title?: string;
    price?: string;
    views?: string;
    responses?: string;
    published?: string;
    tags: string[];
    url?: string;
    display: (url: string) => void;
  };

const styles = StyleSheet.create({
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
      sideButtonPub: {},
});

export default function SideButton({ title, price, views, responses, published, tags, url, display }: Order) {
    return (
        <TouchableHighlight onPress={() => {display(url!);}}>
            <View style={styles.sideButton}>
              <View style={styles.sideButtonTitle}>
                <Text style={styles.sideButtonTitleText}>{title}</Text>
              </View>
              <View style={styles.sideButtonDownView}>
                <View>
                  <Text style={styles.sideButtonPrice}>
                    {price ? price : 'Договорная'}
                  </Text>
                </View>
                <View style={styles.sideButtonTags}>
                  {tags.map((tag, idx) => (
                    <Text style={styles.sideButtonTag} key={idx}>
                      {tag}
                    </Text>
                  ))}
                </View>
                <View style={styles.sideButtonSeen}>
                  <Text>{responses} </Text>
                  <Text>{views}</Text>
                </View>
                <View style={styles.sideButtonPub}>
                  <Text>{published} </Text>
                </View>
              </View>
            </View>
          </TouchableHighlight>
    );
}
