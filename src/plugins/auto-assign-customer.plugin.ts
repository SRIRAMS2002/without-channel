import {
    EventBus,
    VendurePlugin,
    PluginCommonModule,
    ChannelService,
    Customer,
    CustomerEvent,
    RequestContext,
  } from '@vendure/core';
  import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
  
  @Injectable()
  class AutoAssignCustomerToChannels {
    constructor(private eventBus: EventBus, private channelService: ChannelService) {}
  
    registerEventListeners() {
      this.eventBus.ofType(CustomerEvent).subscribe(async event => {
        if (event.type === 'created' || event.type === 'updated') {
          const ctx: RequestContext = event.ctx;
          const customer = event.entity;
  
          // Fetch all channels
          const channels = await this.channelService.findAll(ctx);
  
          // Access the 'items' array from PaginatedList<Channel>
          const channelIds = channels.items.map(channel => channel.id);
  
          // Assign the customer to all channels
          await this.channelService.assignToChannels(ctx, Customer, customer.id, channelIds);
  
          console.log(`Customer ${customer.emailAddress} assigned to all channels`);
        }
      });
    }
  }
  
  @VendurePlugin({
    imports: [PluginCommonModule],
    compatibility: '^3.0.3',
    providers: [AutoAssignCustomerToChannels],
  })
  export class AutoAssignCustomerPlugin implements OnApplicationBootstrap {
    constructor(private autoAssignService: AutoAssignCustomerToChannels) {}
  
    async onApplicationBootstrap(): Promise<void> {
      this.autoAssignService.registerEventListeners();
    }
  }
  