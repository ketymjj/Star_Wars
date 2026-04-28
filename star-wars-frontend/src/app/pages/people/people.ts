import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwapiService } from '../../services/swapi';
import { Person } from '../../models/swapi.models';
import { Card } from '../../components/card/card';
import { DetailModal, ModalField } from '../../components/detail-modal/detail-modal';

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [CommonModule, Card, DetailModal],
  templateUrl: './people.html',
  styleUrl: './people.scss',
})
export class People implements OnInit {

  items: Person[] = [];
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

  selected: Person | null = null;
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

    this.swapi.getPeople(this.page).subscribe({
      next: (r) => {
        this.items = r?.results ?? [];
        this.total = r?.count ?? 0;
        this.loading = false;

        this.cd.detectChanges(); // 🔥 resolve o problema
      },
      error: (err) => {
        console.error('Erro ao carregar:', err);
        this.loading = false;

        this.cd.detectChanges(); // 🔥 importante também
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

  getFields(p: Person) {
    return [
      { label: 'Altura', value: p.height !== 'unknown' ? p.height + ' cm' : '—' },
      { label: 'Peso', value: p.mass !== 'unknown' ? p.mass + ' kg' : '—' },
      { label: 'Gênero', value: p.gender },
      { label: 'Ano de nasc.', value: p.birth_year },
    ];
  }

  openModal(p: Person) {
    this.selected = p;

    this.modalFields = [
      { label: 'Altura', value: p.height !== 'unknown' ? p.height + ' cm' : '—' },
      { label: 'Peso', value: p.mass !== 'unknown' ? p.mass + ' kg' : '—' },
      { label: 'Gênero', value: p.gender },
      { label: 'Ano de Nascimento', value: p.birth_year },
      { label: 'Cor do Cabelo', value: p.hair_color },
      { label: 'Cor dos Olhos', value: p.eye_color },
      { label: 'Cor da Pele', value: p.skin_color },
      { label: 'Filmes', value: p.films?.length + ' aparições' },
      { label: 'Naves', value: p.starships?.length ? p.starships.length + ' nave(s)' : 'Nenhuma' },
      { label: 'Veículos', value: p.vehicles?.length ? p.vehicles.length + ' veículo(s)' : 'Nenhum' },
    ];

    this.modalVisible = true;
  }
}
