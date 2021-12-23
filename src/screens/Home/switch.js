import React, { useRef, useState, useMemo, useEffect } from "react";
import { Animated, TouchableOpacity,StyleSheet } from "react-native";
import { COLORS } from "../../Utils/theme";

/**
 *
 * @param {props} parentViewActiveColor - switch parent view active color
 * @param {props} parentViewInActiveColor - switch parent view inactive color
 * @param {props} childViewActiveColor - switch child view active color
 * @param {props} childViewInActiveColor - switch child view inactive color
 * @param {props} parentViewHeight - switch parent view height
 * @param {props} parentViewWidth - switch child view width
 * @param {props} onValueChange - returns value on switch toggles operation
 * @returns
 */
// const { lightGreen, lightGray, white } = COLORS;
const SwitchComponent = (props) => {
  const {
    parentViewActiveColor,
    parentViewInActiveColor,
    childViewActiveColor,
    childViewInActiveColor,
    onValueChange,
  } = props;

  const [value, setValue] = useState(false);
  const [parentViewHeight, setParentViewHeight] = useState(props.parentViewHeight);
  const [parentViewWidth, setParentViewWidth] = useState(props.parentViewWidth);
  const animatedSwitchButton = useRef(new Animated.Value(0));

  const onSwitchToggle = () => {
    Animated.timing(animatedSwitchButton.current, {
      toValue: value ? 0 : 1,
      duration: 150,
    }).start(() => {
      setValue(!value);
    });
    onValueChange && onValueChange(value);
  };

  useEffect(() => {
       Animated.timing(animatedSwitchButton.current, {
      toValue:  1,
      duration: 0,
    }).start(() => {
      setValue(!value);
    onValueChange && onValueChange(value);
    });
  }, []);

  useMemo(() => {
    const { parentViewHeight, parentViewWidth } = props;
    if (parentViewHeight < 33 || parentViewWidth < 50) {
      setParentViewWidth(50);
      setParentViewHeight(33);
    } else if (parentViewWidth - parentViewHeight <= 17) {
      setParentViewWidth(parentViewHeight + 17);
      setParentViewHeight(parentViewHeight);
    }
  }, [props.parentViewHeight, props.parentViewWidth]);

  const shiftInterpolateMotion = animatedSwitchButton.current.interpolate({
    inputRange: [0, 1],
    outputRange: [1, parentViewWidth - (parentViewHeight - 5) - 1],
  });
  const shiftAnimatedStyle = {
    marginLeft: shiftInterpolateMotion,
  };
  const parentViewStyle = {
    backgroundColor: value ? parentViewActiveColor : parentViewInActiveColor,
    height: parentViewHeight - 17,
    width: parentViewWidth - 13,
    borderRadius: parentViewHeight - 13,
  };

  const childButtonViewStyle = {
    backgroundColor: value ? childViewActiveColor : childViewInActiveColor,
    height: parentViewHeight - 22,
    width: parentViewHeight - 20,
    borderRadius: parentViewHeight ,
  };
  return (
    <TouchableOpacity
      onPress={onSwitchToggle}
      style={[styles.wholeViewStyle, parentViewStyle]}
      activeOpacity={0.99}
    >
      <Animated.View
        style={[
          styles.movingButtonStyle,
          childButtonViewStyle,
          shiftAnimatedStyle,
        ]}
      />
    </TouchableOpacity>
  );
};

export default SwitchComponent;

 const styles = StyleSheet.create({
    wholeViewStyle: {
         justifyContent: 'center',
    },

    movingButtonStyle: {
        marginLeft: 1
    }
});