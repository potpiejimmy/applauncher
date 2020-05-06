import { Directive, Input, TemplateRef, HostListener, OnInit, ElementRef, ComponentRef, AfterViewInit } from '@angular/core';
import {
  OverlayRef,
  Overlay,
  OverlayPositionBuilder
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { TooltipComponent } from './tooltip';
import { AppService } from 'src/app/services/app.service';

@Directive({ selector: '[appTooltip]' })
export class TooltipDirective implements OnInit, AfterViewInit {

  @Input('appTooltip') content: string | TemplateRef<any>;
  private overlayRef: OverlayRef;

  constructor(
    private overlayPositionBuilder: OverlayPositionBuilder,
    private elementRef: ElementRef,
    private overlay: Overlay,
    private app: AppService
  ) {}

  ngOnInit() {
    const positionStrategy = this.overlayPositionBuilder
      .flexibleConnectedTo(this.elementRef)
      .withPositions([
        {
          originX: 'center',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'top'
        }
      ]);

    this.overlayRef = this.overlay.create({ positionStrategy });
  }

  ngAfterViewInit() {
      // show automatically if no apps configured yet
      if (!this.app.apps || !this.app.apps.length)
          setTimeout(() => this.show(), 500);
  }

  show() {
    const tooltipPortal = new ComponentPortal(TooltipComponent);

    const tooltipRef: ComponentRef<TooltipComponent> = this.overlayRef.attach(
      tooltipPortal
    );

    if (typeof(this.content) === 'string') {
      tooltipRef.instance.text = this.content;
    } else {
      tooltipRef.instance.content = this.content;
    }
  }

  @HostListener('mouseout')
  hide() {
    this.overlayRef.detach();
  }
}
