import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwapiService } from '../../services/swapi';
import { Vehicle } from '../../models/swapi.models';
import { Card } from '../../components/card/card';
import { DetailModal, ModalField } from '../../components/detail-modal/detail-modal';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [CommonModule, Card, DetailModal],
  templateUrl: './vehicles.html',
  styleUrl: './vehicles.scss',
})
export class Vehicles implements OnInit {

  items: Vehicle[] = [];
  loading = true;
  page = 1;
  total = 0;
  pageSize = 10;
  search = '';

  get filteredItems() {
    if (!this.search.trim()) return this.items;
    const term = this.search.toLowerCase();
    return this.items.filter(v => v.name.toLowerCase().includes(term));
  }

  selected: Vehicle | null = null;
  modalVisible = false;
  modalFields: ModalField[] = [];

  constructor(
    private swapi: SwapiService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;

    this.swapi.getVehicles(this.page).subscribe({
      next: (r) => {
        this.items = r?.results ?? [];
        this.total = r?.count ?? 0;
        this.loading = false;

        this.cd.detectChanges(); // 🔥 resolve o bug
      },
      error: (err) => {
        console.error('Erro ao carregar veículos:', err);
        this.loading = false;

        this.cd.detectChanges(); // 🔥 importante
      }
    });
  }

  get totalPages() {
    return Math.ceil(this.total / this.pageSize);
  }

  prev() {
    if (this.page > 1) {
      this.page--;
      this.load();
    }
  }

  next() {
    if (this.page < this.totalPages) {
      this.page++;
      this.load();
    }
  }

  getFields(v: Vehicle) {
    return [
      { label: 'Modelo', value: v.model },
      { label: 'Classe', value: v.vehicle_class },
      { label: 'Tripulação', value: v.crew },
      { label: 'Vel. Máxima', value: v.max_atmosphering_speed },
    ];
  }

  openModal(v: Vehicle) {
    this.selected = v;

    this.modalFields = [
      { label: 'Modelo', value: v.model },
      { label: 'Fabricante', value: v.manufacturer },
      { label: 'Classe', value: v.vehicle_class },
      {
        label: 'Custo',
        value: v.cost_in_credits !== 'unknown'
          ? v.cost_in_credits + ' créditos'
          : '—'
      },
      {
        label: 'Comprimento',
        value: v.length !== 'unknown' ? v.length + ' m' : '—'
      },
      { label: 'Vel. Máxima', value: v.max_atmosphering_speed },
      { label: 'Tripulação', value: v.crew },
      { label: 'Passageiros', value: v.passengers },
      {
        label: 'Carga',
        value: v.cargo_capacity !== 'unknown'
          ? v.cargo_capacity + ' kg'
          : '—'
      },
      { label: 'Consumíveis', value: v.consumables },
      { label: 'Filmes', value: (v.films?.length ?? 0) + ' aparições' },
    ];

    this.modalVisible = true;
  }
}
