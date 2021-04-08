import React from 'react';
import { MoreOutlined } from '@ant-design/icons';
import { Calendar, Select, Col, Row, Typography } from 'antd';
import Deposit from './Deposit';
import styles from './style.less';

const ReminderCalendar = () => {
  function onPanelChange(value, mode) {
    console.log(value, mode);
  }

  return (
    <div className={styles.calendar}>
      <div>
        <Calendar
          fullscreen={false}
          onPanelChange={onPanelChange}
          headerRender={({ value, onChange }) => {
            const start = 0;
            const end = 12;
            const monthOptions = [];

            const current = value.clone();
            const localeData = value.localeData();
            const months = [];
            for (let i = 0; i < 12; i += 1) {
              current.month(i);
              months.push(localeData.monthsShort(current));
            }

            for (let index = start; index < end; index += 1) {
              monthOptions.push(
                <Select.Option className="month-item" key={`${index}`}>
                  {months[index]}
                </Select.Option>,
              );
            }
            const month = value.month();

            const year = value.year();
            const options = [];
            for (let i = year - 10; i < year + 10; i += 1) {
              options.push(
                <Select.Option key={i} value={i} className="year-item">
                  {i}
                </Select.Option>,
              );
            }
            return (
              <div className={styles.calendarTitle}>
                <Row gutter={8}>
                  <Col>
                    <Typography.Title level={5}>提醒事项</Typography.Title>
                  </Col>
                </Row>
                <Row gutter={8}>
                  <Col>
                    <Select
                      size="small"
                      dropdownMatchSelectWidth={false}
                      className="my-year-select"
                      onChange={(newYear) => {
                        const now = value.clone().year(newYear);
                        onChange(now);
                      }}
                      value={String(year)}
                    >
                      {options}
                    </Select>
                  </Col>
                  <Col>
                    <Select
                      size="small"
                      dropdownMatchSelectWidth={false}
                      value={String(month)}
                      onChange={(selectedMonth) => {
                        const newValue = value.clone();
                        newValue.month(parseInt(selectedMonth, 10));
                        onChange(newValue);
                      }}
                    >
                      {monthOptions}
                    </Select>
                  </Col>
                  <Col>
                    <MoreOutlined className="h5" />
                  </Col>
                </Row>
              </div>
            );
          }}
        />
      </div>
      <div className={styles.deposit}>
        <Deposit />
      </div>
      <div className={styles.deposit}>
        <Deposit />
      </div>
    </div>
  );
};

export default ReminderCalendar;
