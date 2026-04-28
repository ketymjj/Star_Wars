import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  menuOpen = false;

  navLinks = [
    { path: '/home', label: 'Início', icon: '🏠' },
    { path: '/people', label: 'Personagens', icon: '👤' },
    { path: '/films', label: 'Filmes', icon: '🎬' },
    { path: '/planets', label: 'Planetas', icon: '🪐' },
    { path: '/starships', label: 'Naves', icon: '🚀' },
    { path: '/vehicles', label: 'Veículos', icon: '🛸' },
    { path: '/species', label: 'Espécies', icon: '👾' },
  ];

  toggleMenu() { this.menuOpen = !this.menuOpen; }
  closeMenu() { this.menuOpen = false; }
}
