import * as React from "react";
import * as ReactNative from "react-native";


type RNViewStyleProp = ReactNative.StyleProp<ReactNative.ViewStyle>;

export interface Testable {
  testID?: string;
}

export interface PaginationProps extends Testable {
  defaultCurrent?: number;
  defaultPageSize?: number;
  disabled?: boolean;
  total?: number;
  onChange?: Function;
  size?: "default" | "middle" | "small";
  borderColor?: string;
  borderColorActive?: string;
  activeOpacity?: number;
  prevIcon?: React.ReactElement<any>;
  nextIcon?: React.ReactElement<any>;
}

/** 
Pagination
*/
export class Pagination extends React.Component<PaginationProps, any> { }