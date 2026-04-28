import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ModalField {
  label: string;
  value: string | number;
  full?: boolean;
}

@Component({
  selector: 'app-detail-modal',
  imports: [CommonModule],
  templateUrl: './detail-modal.html',
  styleUrl: './detail-modal.scss',
})
export class DetailModal implements OnChanges {
  @Input() title = '';
  @Input() icon = '';
  @Input() fields: ModalField[] = [];
  @Input() visible = false;
  @Output() close = new EventEmitter<void>();

  ngOnChanges() {
    if (this.visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.close.emit();
    }
  }
}
