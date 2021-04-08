import { Tabs,Progress,Row,Col } from 'antd';
import styles from './style.less'
import CombinationAmount from "./CombinationAmount";
import PercentageCircle from "./PercentageCircle";

const AccountCombination = (props) => {
  const { TabPane } = Tabs;
  function callback(key) {
    console.log(key);
  }
  // 格式化"千分位"
  const formatAmount=(amount)=>{
    return (`${amount}`).replace(/\d{1,3}(?=(\d{3})+$)/g,function(s){ return `${s},`})
  }
  const combAmount=[{amount:'6,875',title:'组合统计'},{amount:'6,875',title:'未锁账组合个数'}]
  const combPercentage=[{title:"预警组合占比",color:"#F8CA45",amount:"1,928",percentage:61.5},
    {title:"异常组合占比",color:"#ff4d4f",amount:"1,928",percentage:30},{title:"未处理占比",color:"#1890ff",amount:"1,928",percentage:8}]
  const accountants=['会计 1','会计 2','会计 3','会计 4','会计 5','会计 6']
  return (
    <>
      <Tabs defaultActiveKey="1" onChange={callback} style={{overflowY:'auto',height:'100%'}} className={styles.accountTabs}>
        {
          accountants.map((item,index)=>{
            return (
              <TabPane tab={item} key={index+1}>
                <div style={{display:'flex',justifyContent:'space-around',flexWrap:'wrap'}}>
                  {
                    combAmount.map((item,index)=>{
                      const {amount,title}=item
                      return (
                        <CombinationAmount key={index} amount={amount} title={title}/>
                      )
                    })
                  }
                  {
                    combPercentage.map((item,index)=>{
                      const {title,color,amount,percentage}=item
                      return (
                        <PercentageCircle key={index} title={title} color={color} amount={amount} percentage={percentage} />
                      )
                    })
                  }
                </div>
              </TabPane>
            )
          })
        }
      </Tabs>
    </>
  );
};

export default AccountCombination;
