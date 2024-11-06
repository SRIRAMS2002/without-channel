// auto-assign-customer.plugin.ts

import {
  VendurePlugin,
  PluginCommonModule,
  CustomerEvent,
  EventBus,
  ChannelService,
  CustomerService,
  RequestContext,
  ID,
  Customer,
} from '@vendure/core';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { AdminUiExtension } from '@vendure/ui-devkit/compiler';
import * as path from 'path';

@Injectable()
class AutoAssignCustomerService {
  constructor(
      private eventBus: EventBus,
      private channelService: ChannelService,
      private customerService: CustomerService,
  ) {}

  // Register event listeners
  registerEventListeners() {
      this.eventBus.ofType(CustomerEvent).subscribe(async event => {
          if (event.type === 'updated') {
              const ctx: RequestContext = event.ctx;
              const customer = event.entity;

              const newChannelId = await this.getRequestedChannelId(customer.id.toString());
              if (newChannelId) {
                  await this.updateCustomerChannels(ctx, customer.id, newChannelId);
              }
          }
      });
  }

  // Update customer channels
  private async updateCustomerChannels(ctx: RequestContext, customerId: ID, newChannelId: string) {
      const customer = await this.customerService.findOne(ctx, customerId);
      const existingChannels = customer?.channels || [];
      const channelIdsToRemove = existingChannels.map(channel => channel.id);

      await this.channelService.removeFromChannels(ctx, Customer, customerId, channelIdsToRemove);
      await this.channelService.assignToChannels(ctx, Customer, customerId, [newChannelId]);

      console.log(`Customer ${customerId} moved to channel ${newChannelId}`);
  }

  // Mock: Replace with logic to get the requested channel ID
  private async getRequestedChannelId(_customerId: string): Promise<string | undefined> {
      // Add logic to fetch the requested channel ID for a customer
      return 'new-channel-id';
  }
}

@VendurePlugin({
  imports: [PluginCommonModule],
  providers: [AutoAssignCustomerService],
  compatibility: '^3.0.5',
})
export class AutoAssignCustomerPlugin implements OnApplicationBootstrap {
  constructor(private autoAssignCustomerService: AutoAssignCustomerService) {}

  onApplicationBootstrap(): void {
      this.autoAssignCustomerService.registerEventListeners();
  }

  static ui: AdminUiExtension = {
      extensionPath: path.join(__dirname, 'ui'),
      id: 'auto-assign-customer-ui',
      routes: [
          { route: 'auto-assign-customer', filePath: path.join(__dirname, 'ui', 'assignCustomer.component.ts') },
      ],
  };
}
