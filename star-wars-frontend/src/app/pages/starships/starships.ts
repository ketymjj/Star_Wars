import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwapiService } from '../../services/swapi';
import { Starship } from '../../models/swapi.models';
import { Card } from '../../components/card/card';
import { DetailModal, ModalField } from '../../components/detail-modal/detail-modal';

@Component({
  selector: 'app-starships',
  standalone: true,
  imports: [CommonModule, Card, DetailModal],
  templateUrl: './starships.html',
  styleUrl: './starships.scss',
})
export class Starships implements OnInit {

  items: Starship[] = [];
  loading = true;
  page = 1;
  total = 0;
  pageSize = 10;
  search = '';

  get filteredItems() {
    if (!this.search.trim()) return this.items;
    const term = this.search.toLowerCase();
    return this.items.filter(s => s.name.toLowerCase().includes(term));
  }

  selected: Starship | null = null;
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

    this.swapi.getStarships(this.page).subscribe({
      next: (r) => {
        this.items = r?.results ?? [];
        this.total = r?.count ?? 0;
        this.loading = false;

        this.cd.detectChanges(); // 🔥 resolve bug
      },
      error: (err) => {
        console.error('Erro ao carregar naves:', err);
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

  getFields(s: Starship) {
    return [
      { label: 'Modelo', value: s.model },
      { label: 'Classe', value: s.starship_class },
      { label: 'Tripulação', value: s.crew },
      { label: 'Hiperimpulso', value: s.hyperdrive_rating },
    ];
  }

  openModal(s: Starship) {
    this.selected = s;

    this.modalFields = [
      { label: 'Modelo', value: s.model },
      { label: 'Fabricante', value: s.manufacturer },
      { label: 'Classe', value: s.starship_class },
      {
        label: 'Custo',
        value: s.cost_in_credits !== 'unknown'
          ? s.cost_in_credits + ' créditos'
          : '—'
      },
      {
        label: 'Comprimento',
        value: s.length !== 'unknown' ? s.length + ' m' : '—'
      },
      { label: 'Vel. Máxima', value: s.max_atmosphering_speed },
      { label: 'Tripulação', value: s.crew },
      { label: 'Passageiros', value: s.passengers },
      {
        label: 'Carga',
        value: s.cargo_capacity !== 'unknown'
          ? s.cargo_capacity + ' kg'
          : '—'
      },
      { label: 'Rating Hiperimpulso', value: s.hyperdrive_rating },
      { label: 'MGLT', value: s.MGLT },
      {
        label: 'Pilotos',
        value: (s.pilots?.length ?? 0) > 0
          ? (s.pilots.length + ' piloto(s)')
          : 'Nenhum'
      },
    ];

    this.modalVisible = true;
  }
}
