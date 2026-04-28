import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  sections = [
    { path: '/people', icon: '👤', label: 'Personagens', desc: 'Heróis, vilões e toda a galáxia' },
    { path: '/films', icon: '🎬', label: 'Filmes', desc: '9 episódios de saga épica' },
    { path: '/planets', icon: '🪐', label: 'Planetas', desc: 'Mundos de Tatooine a Coruscant' },
    { path: '/starships', icon: '🚀', label: 'Naves Espaciais', desc: 'Da Millennium Falcon ao Executor' },
    { path: '/vehicles', icon: '🛸', label: 'Veículos', desc: 'AT-AT, speeders e muito mais' },
    { path: '/species', icon: '👾', label: 'Espécies', desc: 'Humanos, Wookies, Twi\'leks...' },
  ];
}
