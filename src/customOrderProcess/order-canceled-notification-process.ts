import { SmsService } from "../smsService";
import { OrderProcess } from "@vendure/core";

export const orderCanceledNotificationProcess: OrderProcess<"OrderCanceledNotificationProcess"> =
  {
    onTransitionStart(fromState, toState, data) {
      console.log(`current state ${fromState} to ${toState}`);
      // Order Cancelled
      if (toState === "Cancelled") {
        data.order.payments.forEach((element) => {
          const smsService = new SmsService(
            "647ad6d8d6fc0553390fdd64",
            data.order.customer!.phoneNumber,
            "order_cancelled",
            data.order.id.toString()
          );
          smsService.sendSms();
        });
      }
    },
  };