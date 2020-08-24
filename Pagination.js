import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const getSize = size => {
  if (size === "middle") {
    return 6;
  }
  if (size === "small") {
    return 3;
  }
  return 9;
}

const Box = ({
  size,
  children,
  borderColor,
  style,
  ...rest
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.box,
        {
          borderColor,
          paddingHorizontal: getSize(size),
          paddingVertical: getSize(size) / 2,
          marginRight: getSize(size),
          ...style,
        }
      ]}
      {...rest}
    >
      {children}
    </TouchableOpacity>
  )
}

const Pagination = ({
  defaultCurrent,
  total,
  defaultPageSize,
  disabled,
  size,
  onChange,
  borderColor,
  borderColorActive,
  activeOpacity,
  prevIcon,
  nextIcon,
  styleBox,
  testID,
}) => {
  const [currentPage, _setPage] = useState(defaultCurrent);

  let paginations = [];
  for (let i = 1; i < total / defaultPageSize; i++) {
    paginations.push(i);
  }

  const _onChange = page => {
    let newPage = page;
    if (page === "PREV") {
      newPage = currentPage - 1;
    } else if (page === "NEXT") {
      newPage = currentPage + 1;
    }
    _setPage(newPage);
    onChange && onChange(newPage, defaultPageSize);
  }

  return (
    <View style={styles.row} testID={testID}>
      <Box
        borderColor={borderColor}
        disabled={currentPage === paginations[0] ? true : false}
        onPress={() => _onChange("PREV")}
        style={styleBox}
        {...{ size, activeOpacity }}
      >
        {prevIcon ?
          prevIcon :
          <Text style={{ color: currentPage === paginations[0] ? borderColor : '#000' }}>
            {`<`}
          </Text>
        }
      </Box>
      {paginations.map(p => {
        let isCurrentPage = currentPage === p ? true : false;
        return (
          <Box
            key={p}
            borderColor={isCurrentPage ? borderColorActive : borderColor}
            onPress={() => _onChange(p)}
            style={styleBox}
            {...{ size, disabled, activeOpacity }}
          >
            <Text style={{ color: isCurrentPage ? borderColorActive : '#000' }}>
              {p}
            </Text>
          </Box>
        )
      })}
      <Box
        borderColor={borderColor}
        disabled={currentPage === paginations[paginations.length - 1] ? true : false}
        onPress={() => _onChange("NEXT")}
        style={styleBox}
        {...{ size, activeOpacity }}
      >
        {nextIcon ?
          nextIcon :
          <Text style={{ color: currentPage === paginations[paginations.length - 1] ? borderColor : '#000' }}>
            {`>`}
          </Text>
        }
      </Box>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  box: {
    borderWidth: 1,
    borderRadius: 2,
  },
});

Pagination.defaultProps = {
  defaultCurrent: 1,
  defaultPageSize: 10,
  disabled: false,
  total: 0,
  size: "default",
  borderColor: '#d9d9d9',
  borderColorActive: '#1890ff',
  activeOpacity: 1,
}

Pagination.propTypes = {
  defaultCurrent: PropTypes.number,
  defaultPageSize: PropTypes.number,
  disabled: PropTypes.bool,
  total: PropTypes.number,
  onChange: PropTypes.func,
  size: PropTypes.oneOf(["default", "middle", "small"]),
  borderColor: PropTypes.string,
  borderColorActive: PropTypes.string,
  activeOpacity: PropTypes.number,
  prevIcon: PropTypes.element,
  nextIcon: PropTypes.element,
  styleBox: PropTypes.object,
}

export default Pagination;