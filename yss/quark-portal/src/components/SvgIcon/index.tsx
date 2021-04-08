import React from 'react';

export interface SvgIconProps {
  icon: any;
  fill?: string;
  style?: React.CSSProperties;
  className?: string;
  options?: object;
}

const SvgIcon = (props: SvgIconProps) => {
  const { icon, fill = 'currentcolor', className = '', style = {}, options = {} } = props;
  if (typeof icon == 'string') {
    const svgIcon = require(`@/assets/icons/${icon}.svg`);
    return (
      <svg className={`svg-icon ${className}`} style={style} {...options}>
        <use xlinkHref={`#${svgIcon.default.id}`} fill={fill} />
      </svg>
    );
  } else {
    return icon;
  }
};

export default SvgIcon;
