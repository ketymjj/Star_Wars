import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwapiService } from '../../services/swapi';
import { Species as SpeciesModel } from '../../models/swapi.models';
import { Card } from '../../components/card/card';
import { DetailModal, ModalField } from '../../components/detail-modal/detail-modal';

@Component({
  selector: 'app-species',
  standalone: true,
  imports: [CommonModule, Card, DetailModal],
  templateUrl: './species.html',
  styleUrl: './species.scss',
})
export class Species implements OnInit {

  items: SpeciesModel[] = [];
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

  selected: SpeciesModel | null = null;
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

    this.swapi.getSpecies(this.page).subscribe({
      next: (r) => {
        this.items = r?.results ?? [];
        this.total = r?.count ?? 0;
        this.loading = false;

        this.cd.detectChanges(); // 🔥 resolve o bug
      },
      error: (err) => {
        console.error('Erro ao carregar espécies:', err);
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

  getFields(s: SpeciesModel) {
    return [
      { label: 'Classificação', value: s.classification },
      { label: 'Designação', value: s.designation },
      { label: 'Idioma', value: s.language },
      { label: 'Membros', value: (s.people?.length ?? 0) + ' personagens' },
    ];
  }

  openModal(s: SpeciesModel) {
    this.selected = s;

    this.modalFields = [
      { label: 'Classificação', value: s.classification },
      { label: 'Designação', value: s.designation },
      { label: 'Idioma', value: s.language },
      {
        label: 'Altura Média',
        value: s.average_height !== 'unknown'
          ? s.average_height + ' cm'
          : '—'
      },
      {
        label: 'Expectativa de Vida',
        value: s.average_lifespan !== 'unknown'
          ? s.average_lifespan + ' anos'
          : '—'
      },
      { label: 'Cores de Pele', value: s.skin_colors },
      { label: 'Cores de Cabelo', value: s.hair_colors },
      { label: 'Cores de Olhos', value: s.eye_colors },
      { label: 'Personagens', value: (s.people?.length ?? 0) + ' membros' },
      { label: 'Filmes', value: (s.films?.length ?? 0) + ' aparições' },
    ];

    this.modalVisible = true;
  }
}
