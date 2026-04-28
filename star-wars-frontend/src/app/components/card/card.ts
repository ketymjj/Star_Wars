import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  @Input() title = '';
  @Input() icon = '';
  @Input() fields: { label: string; value: string }[] = [];
  @Input() index = 0;
  @Output() viewDetail = new EventEmitter<void>();
}
