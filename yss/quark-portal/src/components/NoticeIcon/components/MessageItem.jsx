import React, {useMemo} from "react";
import style from "./style.less";

const MessageItem = ({ item, markRead, setVisible, setCurrentItem }) => {
  const { title, typeText, description, time, read } = item;
  const overflow = useMemo(() => {
    return description.length > 54;
  }, []);
  return (
    <div
      // className={`px-5 py-3 ${style.messageItem} ${read ? style.read : ''}`}
      // style={{ cursor: 'pointer' }}
      className={style.messageItem}
      onClick={() => {
        markRead(item);
      }}
    >
      <div className={style.title}>
        <span className="text-secondary">[{typeText}]</span>
        <span>{title}</span>
        <span>{title}</span>
      </div>
      <div className={style.description}>
        {description.length > 54 ? `${description.slice(0, 54)}......` : description}
        {overflow ? (
          <a
            href="#"
            className="ml-2"
            style={{ color: '#40a9ff' }}
            onClick={(e) => {
              e.preventDefault();
              // e.stopPropagation();
              console.log('setVisible');
              setCurrentItem(item);
              setVisible(true);
            }}
          >
            查看全部
          </a>
        ) : null}
      </div>
      <div className={`${style.time} text-secondary`}>{time}</div>
    </div>
  );
};
export default MessageItem
