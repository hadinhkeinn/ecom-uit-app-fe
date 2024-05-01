import React from 'react'
import { FaShippingFast } from 'react-icons/fa';
import {BsFillCreditCardFill, BsCartCheck, BsClockHistory} from 'react-icons/bs'

const data = [
    {
      icon: <FaShippingFast size={30} color="#8cb4f5" />,
      heading: "Miễn phí vận chuyển",
      text: "Miễn phí vận chuyển cho các sản phẩm đặc biệt",
    },
    {
      icon: <BsFillCreditCardFill size={30} color="#f7d272" />,
      heading: "Thanh toán bảo mật",
      text: "Thanh toán an toàn cho sản phẩm của bạn.",
    },
    {
      icon: <BsCartCheck size={30} color="#fa82ea" />,
      heading: "Sản phẩm tốt",
      text: "Chỉ bán sản phẩm từ các thương hiệu nối tiếng.",
    },
    {
      icon: <BsClockHistory size={30} color="#82fa9e" />,
      heading: "Hỗ trợ 24/7",
      text: "Nhận được sự hỗ trợ từ nhóm chuyên gia.",
    },
  ];
  
const HomeInfoBox = () => {
  return (
    <div className="infoboxes --mb2">
        {data.map((item, index) => {
            const {icon, heading, text} = item
            return (
                <div className="infobox" key={index}>
                    <div className="icon">{icon}</div>
                    <div className="text">
                        <h4>{heading}</h4>
                        <p className="--text-sm">{text}</p>
                    </div>
                </div>
            )
        })}
    </div>
  )
}

export default HomeInfoBox