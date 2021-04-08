import React from 'react';
import { Tooltip, Tag } from 'antd';
import styles from './ThemeColor.less';

const ThemeColor = (props) => {
  const { colors, formatMessage, onChange, value } = props;

  const colorList = colors || [];
  if (colorList.length < 1) {
    return null;
  }

  //   console.log(colorList);

  const themeConfig = {
    daybreak: 'daybreak',
    '#1890ff': 'daybreak',
    '#F5222D': 'dust',
    '#FA541C': 'volcano',
    '#FAAD14': 'sunset',
    '#13C2C2': 'cyan',
    '#52C41A': 'green',
    '#2F54EB': 'geekblue',
    '#722ED1': 'purple',
  };

  function genThemeToString(val) {
    return val || undefined;
  }

  return (
    <>
      <div className={styles.themeColor}>
        <div className={styles.themeColorContent}>
          {colorList.map(({ key, color }) => {
            // console.log(key, color);
            const themeKey = genThemeToString(color) || key;
            // console.log(themeKey);
            return (
              <Tooltip key={color} title={themeKey}>
                <Tag
                  className={styles.themeColorBlock}
                  color={color}
                  check={value.toString()}
                  onClick={() => onChange && onChange(key)}
                  style={{ height: '20px', width: '20px' }}
                />
              </Tooltip>
            );
          })}
          {/* {colorList.map(({ key, color }) => {
            const themeKey = genThemeToString(color) || key;
            return (
              <Tooltip
                key={color}
                title={
                  themeKey
                    ? formatMessage({
                        id: `app.setting.themecolor.${themeKey}`,
                      })
                    : key
                }
              >
                <Tag
                  className="theme-color-block"
                  color={color}
                  check={value === key || genThemeToString(value) === key}
                  onClick={() => onChange && onChange(key)}
                />
              </Tooltip>
            );
          })} */}
        </div>
      </div>
    </>
  );
};

export default ThemeColor;
