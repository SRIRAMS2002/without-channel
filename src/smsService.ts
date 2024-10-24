import request from "request";

export class SmsService {
  smsData: {
    template_id: string;
    sender: string;
    mobiles: string;
    var?: string
  } = {
    template_id: "64900d7fd6fc053c5e31a685",
    sender: "KAIMSG",
    mobiles: "91XXXXXXXXXX",
  };
  orderType: string;
  orderId: string;
  constructor(templateId: string, mobiles: string,orderType: string,orderId: string) {
    this.smsData.template_id = templateId;
    this.smsData.mobiles = mobiles;
    orderType = orderType;
    orderId = orderId;
  }
  sendSms() {
    const path = `https://control.msg91.com/api/v5/flow/`;
    console.log(path);
    if(this.orderType == "order_cancelled"){
      this.smsData['var'] = this.orderId;
    }

    let options = {
      method: "POST",
      url: path,
      body: this.smsData,
      headers: {
        accept: "application/json",
        authkey: "395929AcYuel89696451b515P1",
        "content-type": "application/json",
      },
    };
    request(options, (error: any, response: any) => {
      if (error) {
        console.log(error);
      } else {
        console.log(response.body);
      }
    });
  }
}