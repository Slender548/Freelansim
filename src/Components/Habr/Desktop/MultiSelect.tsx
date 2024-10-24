import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export type Item = {
  id: number;
  name: string;
  active: boolean | undefined;
  items?: SubItem[];
};

type SubItem = {
  id: number;
  name: string;
  active: boolean | undefined;
};

export default function MultiSelect({_items}: {_items: Item[]}) {
  const [items, setItems] = useState<Item[]>(_items);
  return (
    <View>
      {items.map(item => (
        <View key={item.id}>
          <Icon.Button name={'flag'} onPress={() => setItems(items.map(i => i.id === item.id ? {...i, active: !i.active} : i))}>{item.name}</Icon.Button>
          <ScrollView horizontal>
            {item.items?.map(subItem => (
                <Icon.Button key={subItem.id} name={'home'} onPress={() => setItems(items.map(i => i.id === subItem.id ? {...i, active: !i.active} : i))} >{subItem.name}</Icon.Button>
            ))}
          </ScrollView>
        </View>
      ))}
    </View>
  );
}
