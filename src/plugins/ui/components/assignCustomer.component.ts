// channel-assignment.component.ts

import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SharedModule } from '@vendure/admin-ui/core';
import { ChannelService, CustomerService } from '@vendure/core';

@Component({
    selector: 'channel-assignment',
    template: `
        <vdr-page-block>
            <h2>Assign Customer to Channel</h2>
            <form [formGroup]="assignmentForm" (ngSubmit)="onSubmit()">
                <label for="customerId">Customer ID:</label>
                <input id="customerId" formControlName="customerId" required />

                <label for="channelId">Channel ID:</label>
                <input id="channelId" formControlName="channelId" required />

                <button type="submit">Assign Channel</button>
            </form>
        </vdr-page-block>
    `,
    standalone: true,
    imports: [SharedModule],
})
export class AssignComponent {
    assignmentForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.assignmentForm = this.fb.group({
            customerId: [''],
            channelId: [''],
        });
    }

    onSubmit() {
        const { customerId, channelId } = this.assignmentForm.value;
        // Emit an event or call a service to assign this customer to the channel
        console.log(`Assign customer ${customerId} to channel ${channelId}`);
    }
}
