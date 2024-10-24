import React, { useEffect, useState } from 'react';
import {Text, View} from 'react-native';
import { PageParse } from '../../../Parsers/Habr/PageParser';

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

export function Details({route}: {route: any}) {
  const [curOrder, setCurOrder] = useState<FullOrder | undefined>();

  useEffect(() => {
    const url = route.params.url;
    const res = PageParse(url);
    setCurOrder(res);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View>
      <Text>{curOrder?.title}</Text>
      <Text>{curOrder?.description}</Text>
      <Text>{curOrder?.price}</Text>
      <Text>{curOrder?.views}</Text>
      <Text>{curOrder?.responses}</Text>
      <Text>{curOrder?.published}</Text>
      <Text>{curOrder?.tags}</Text>
      <Text>{curOrder?.url}</Text>
    </View>
  );
}
