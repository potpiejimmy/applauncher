import { Component, OnInit, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.html',
  styleUrls: [ './tooltip.scss' ]
})
export class TooltipComponent {
  @Input() text: string;
  @Input() content: TemplateRef<any>;
}
