import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwapiService } from '../../services/swapi';
import { Planet } from '../../models/swapi.models';
import { Card } from '../../components/card/card';
import { DetailModal, ModalField } from '../../components/detail-modal/detail-modal';

@Component({
  selector: 'app-planets',
  standalone: true,
  imports: [CommonModule, Card, DetailModal],
  templateUrl: './planets.html',
  styleUrl: './planets.scss',
})
export class Planets implements OnInit {

  items: Planet[] = [];
  loading = true;
  page = 1;
  total = 0;
  pageSize = 10;
  search = '';

  get filteredItems() {
    if (!this.search.trim()) return this.items;
    const term = this.search.toLowerCase();
    return this.items.filter(p => p.name.toLowerCase().includes(term));
  }

  selected: Planet | null = null;
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

    this.swapi.getPlanets(this.page).subscribe({
      next: (r) => {
        this.items = r?.results ?? [];
        this.total = r?.count ?? 0;
        this.loading = false;

        this.cd.detectChanges(); // 🔥 resolve o bug
      },
      error: (err) => {
        console.error('Erro ao carregar planetas:', err);
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

  getFields(p: Planet) {
    return [
      { label: 'Clima', value: p.climate },
      { label: 'Terreno', value: p.terrain },
      {
        label: 'População',
        value: p.population !== 'unknown'
          ? Number(p.population).toLocaleString()
          : '—'
      },
      { label: 'Residentes', value: (p.residents?.length ?? 0) + ' hab.' },
    ];
  }

  openModal(p: Planet) {
    this.selected = p;

    this.modalFields = [
      { label: 'Clima', value: p.climate },
      { label: 'Terreno', value: p.terrain },
      {
        label: 'Diâmetro',
        value: p.diameter !== 'unknown' ? p.diameter + ' km' : '—'
      },
      { label: 'Gravidade', value: p.gravity },
      { label: 'Período de Rotação', value: p.rotation_period + ' horas' },
      { label: 'Período Orbital', value: p.orbital_period + ' dias' },
      {
        label: 'Água Superficial',
        value: p.surface_water !== 'unknown' ? p.surface_water + '%' : '—'
      },
      {
        label: 'População',
        value: p.population !== 'unknown'
          ? Number(p.population).toLocaleString()
          : '—'
      },
      { label: 'Residentes', value: (p.residents?.length ?? 0) + ' personagens' },
      { label: 'Filmes', value: (p.films?.length ?? 0) + ' aparições' },
    ];

    this.modalVisible = true;
  }
}
