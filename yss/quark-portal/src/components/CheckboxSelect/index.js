/**
 * 包含多选框的下拉列表，含全选和全不选操作
 * */
import { useEffect, useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Button } from 'antd';
import './index.less';
import RightContent from '../GlobalHeader/RightContent';

function CheckboxSelect(props) {
    const { optionsList, changeCallback,funCode,operate } = props;

    const cancelBtn = useRef();
    const [showState, setShowState] = useState("none");
    const [showIndex, setShowIndex] = useState("1");
    const [showWidth, setShowWidth] = useState("45px");
    const [showMarginLeft, setShowMarginLeft] = useState("-45px");
    const [showMorePosition, setMorePosition] = useState("0");
    const [isActive, setIsActive] = useState(false);
    const [checkAll, setCheckAll] = useState(false);
    const [indeterminate, setIndeterminate] = useState(false);
    const [checkboxValList, setCheckboxValList] = useState([]);
    const [checkboxOldValList, setCheckboxOldValList] = useState([]);

    // 多选框列表被触发的时候
    const checkboxChange = (list) => {
        setCheckboxValList(list);
        setIndeterminate(!!list.length && list.length < optionsList.length);
    };
    // 确定操作
    const confirm = () => {
        setIsActive(false);
        // 返回最终数据
        changeCallback(funCode,checkboxValList);

        setShowState("none");
        setShowIndex("1");
        setShowWidth("45px");
        setShowMarginLeft("-45px");
        setMorePosition("0");

        // 把选择的文本显示在框框内
        // if (checkboxValList.length === optionsList.length) {
        //     setShowText('更多');
        //     return;
        // }
        // const textArr = [];
        // optionsList.forEach((item1) => {
        //     checkboxValList.forEach((item2) => {
        //         if (item1.value === item2) {
        //             textArr.push(item1.label);
        //         }
        //     });
        // });
        // setShowText(textArr.join('，'));
    };
    // 取消操作
    const cancel = () => {
        setCheckboxValList(checkboxOldValList);
        setIsActive(false);
    };

    const setClassForShow = (display)=>{
      if(display === "none"){
        setShowState("block");
        setShowIndex("9999");
        setShowWidth("120px");
        setShowMarginLeft("-120px");
        setMorePosition("80px");
      }else{
        setShowState("none");
        setShowIndex("1");
        setShowWidth("45px");
        setShowMarginLeft("-45px");
        setMorePosition("0");
      }
    }

    // 点击操作
    const toggleClick = (ev) => {
        // 阻止事件冒泡
        ev.nativeEvent.stopImmediatePropagation();
        const status = !isActive;
        setIsActive(status);
        if(showState == "none"){
          setClassForShow("none");
          //重新初始化
          init();
        }else{
          setClassForShow("block");
        }
    };

    // 全选/全不选 操作
    const onCheckAllChange = () => {
        const status = !checkAll;
        setCheckAll(status);

        // 判断是全选还是全不选
        const listArr = [];
        if (status) {
            optionsList.forEach((item) => {
                listArr.push(item.value);
            });
        }
        setCheckboxValList(listArr);
        setIndeterminate(false);
    };

    // 触发内容区域
    const documentEvent = () => {
      //cancelBtn.current.click();
      setShowState("none");
      setShowIndex("1");
      setShowWidth("45px");
      setShowMarginLeft("-45px");
      setMorePosition("0");
    };

    // 监听全选/全不选状态
    useEffect(() => {
        setCheckAll(optionsList.length === checkboxValList.length);
        setIndeterminate(!!checkboxValList.length && checkboxValList.length < optionsList.length);
    }, [checkboxValList]);

    // 组件卸载
    const unComponent = () => {
        // console.log('组件卸载');
        document.removeEventListener('click', documentEvent);
    };

    // 初始操作
    const init = useCallback(() => {
        console.log("optionsList",optionsList);
        // 设置checkbox默认全选
        const selectList = [];
        optionsList.forEach((item) => {
          if(item.data.checked){
            selectList.push(item.value);
          }
        });
        setCheckboxValList(selectList);
        setCheckboxOldValList(selectList);
    }, []);

    useEffect(() => {
        init();
        // 空白文档处被点击
        document.addEventListener('click', documentEvent);
        return unComponent;
    }, []);

    return (
        <>
          <div style={{float:"right"}}>
            <div className={`checkbox-select ${isActive ? 'checkbox-select-active' : ''}`}
              style={{position: "absolute",width:showWidth,paddingTop:"2px",marginLeft: showMarginLeft,zIndex:showIndex}}>
                <div className="cs__input-wrap" onClick={toggleClick}>
                    <div className="cs__input-text" style={{paddingLeft:showMorePosition}}>更多...</div>
                    <span className="cs__input-icon"></span>
                </div>
                <div style={{ display: showState , backgroundColor:"white",border:'1px solid rgb(204, 204, 204)',padding:"2px"} }
                    className="cs__tool"
                    onClick={(ev) => {
                        ev.nativeEvent.stopImmediatePropagation();
                    }}
                >

                  <div className="cs__button" style={{ display: optionsList.length ? '' : 'none'}}>
                      <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll} disabled={operate != 'edit'} >
                          全选--
                      </Checkbox>
                  </div>
                    <Checkbox.Group onChange={checkboxChange} value={checkboxValList}>
                        <ul className="cs__checkbox-list">
                            {optionsList.length ? (
                                optionsList.map((item) => {
                                    return (
                                        <li key={item.value} style={{display:"inlineBlock"}}>
                                            <Checkbox disabled={operate != 'edit'} value={item.value} >{item.label}</Checkbox>
                                        </li>
                                    );
                                })
                            ) : (
                                <li className="empty">暂无数据</li>
                            )}
                        </ul>
                    </Checkbox.Group>
                    <div className="cs__button" style={{ display: optionsList.length ? '' : 'none' }}>
                        <Button type="primary" size="small" onClick={confirm}>
                            确定
                        </Button>
                        {/* <Button size="small" onClick={cancel} ref={cancelBtn}>
                            取消
                        </Button> */}
                    </div>
                </div>
            </div>
          </div>
        </>
    );
}

CheckboxSelect.propTypes = {
    //下拉列表数据
    optionsList: PropTypes.array,
    // 确定按钮触发返回函数：return array
    changeCallback: PropTypes.func,
};

CheckboxSelect.defaultProps = {
    optionsList: [],
};

export default CheckboxSelect;
