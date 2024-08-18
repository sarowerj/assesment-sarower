import { View } from 'react-native';

type Props = {
    size:number
}

export function Gap({ size }: Props) {
  return (
    <View style={{marginBottom:size}}/>
  );
}
