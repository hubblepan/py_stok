import SvgIcon from '@/components/SvgIcon/index';
const NoData = () => {
  return (
    <>
      <SvgIcon icon="no-data" style={{ width: 125, height: 125 }} />
      <br />
      <span style={{ color: 'rgba(255, 255, 255, .5)' }}>暂无数据</span>
    </>
  );
};
export default NoData;
