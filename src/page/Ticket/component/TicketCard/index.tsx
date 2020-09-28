import React, { memo, useEffect } from 'react';
import { Descriptions, message } from 'antd';
import './index.less';
import { createQrcodeImg } from '~/util/qrcode';
import { ITicketData } from '~/model/ticketData/actionTypes';
import { formatTicketCreateTime } from '~/util/timeFormat';
import printJS from 'print-js';
import market from '~/config/market';

export const PrintedTicketID = 'printed-ticket';

interface CardProps {
  ticket: ITicketData;
}

const printTicket = () => {
  printJS({
    printable: PrintedTicketID,
    type: 'html',
    targetStyles: ['*'],
    onError: error => {
      message.error(error.message || '打印失败');
    },
    documentTitle: '&nbsp;'
  });
};

const TicketCard: React.FC<CardProps> = props => {
  const { ticket } = props;
  const qrcodeDataUrl = createQrcodeImg(ticket.ticket);

  useEffect(() => {
    let timer = setTimeout(printTicket, 500);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <section id={PrintedTicketID} className="ticket-container">
      <header className="ticket-header">
        <h1 className="ticket-header-title">{market.name}</h1>
        <h1 className="ticket-header-title">欢迎光临</h1>
      </header>
      <Descriptions className="ticket-info" title={false} column={1}>
        <Descriptions.Item label="识别码">{ticket.ticket}</Descriptions.Item>
        <Descriptions.Item label="进场时间">
          {formatTicketCreateTime(ticket.createdAt)}
        </Descriptions.Item>
        {/*  <Descriptions.Item label="身份标识">
          123456123165465123456
        </Descriptions.Item> */}
      </Descriptions>
      <section className="ticket-qrcode">
        <div className="ticket-qrcode-img-container">
          <img
            alt="二维码"
            className="ticket-qrcode-img"
            src={qrcodeDataUrl}
          ></img>
        </div>
      </section>
      <footer className="ticket-warn">
        <p>请妥善保存该小票，遗失后果自负！</p>
        {market.csNumber && <p>客服电话：{market.csNumber}</p>}
      </footer>
    </section>
  );
};
export default memo(TicketCard);
