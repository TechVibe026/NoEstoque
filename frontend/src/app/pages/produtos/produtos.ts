import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-produtos',
  styleUrl: './produtos.scss',
  templateUrl: './produtos.html',
})
export class Produtos {
produtos = [
  {
    nome: 'Arroz 5kg',
    sku: 'ARR-001',
    estoque: 12,
    estoqueMinimo: 5,
  },
  {
    nome: 'Feijão 1kg',
    sku: 'FEI-002',
    estoque: 8,
    estoqueMinimo: 10,
  },
  {
    nome: 'Café 500g',
    sku: 'CAF-003',
    estoque: 20,
    estoqueMinimo: 8,
  },
];
}