import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwapiService } from '../../services/swapi';
import { Film } from '../../models/swapi.models';
import { Card } from '../../components/card/card';
import { DetailModal, ModalField } from '../../components/detail-modal/detail-modal';

@Component({
  selector: 'app-films',
  standalone: true,
  imports: [CommonModule, Card, DetailModal],
  templateUrl: './films.html',
  styleUrl: './films.scss',
})
export class Films implements OnInit {

  items: Film[] = [];
  loading = true;
  page = 1;
  total = 0;
  pageSize = 10;
  search = '';

  get filteredItems() {
    if (!this.search.trim()) return this.items;
    const term = this.search.toLowerCase();
    return this.items.filter(f => f.title.toLowerCase().includes(term));
  }

  selected: Film | null = null;
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

    this.swapi.getFilms().subscribe({
      next: (r) => {
        this.items = r?.results ?? [];
        this.total = r?.count ?? 0;
        this.loading = false;

        this.cd.detectChanges(); // 🔥 resolve bug
      },
      error: (err) => {
        console.error('Erro ao carregar filmes:', err);
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

  getFields(f: Film) {
    return [
      { label: 'Episódio', value: 'EP ' + f.episode_id },
      { label: 'Diretor', value: f.director },
      { label: 'Lançamento', value: f.release_date },
      { label: 'Personagens', value: f.characters?.length + ' personagens' },
    ];
  }

  openModal(f: Film) {
    this.selected = f;

    this.modalFields = [
      { label: 'Episódio', value: 'EP ' + f.episode_id },
      { label: 'Diretor', value: f.director },
      { label: 'Produtor', value: f.producer },
      { label: 'Lançamento', value: f.release_date },
      { label: 'Personagens', value: f.characters?.length + ' personagens' },
      { label: 'Planetas', value: f.planets?.length + ' planetas' },
      { label: 'Naves', value: f.starships?.length + ' naves' },
      { label: 'Espécies', value: f.species?.length + ' espécies' },
      {
        label: 'Introdução',
        value: f.opening_crawl?.substring(0, 200) + '...',
        full: true
      },
    ];

    this.modalVisible = true;
  }
}
