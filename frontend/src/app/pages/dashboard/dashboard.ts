
import { Component } from '@angular/core';

interface ProdutoResumo {
  nome: string;
  sku: string;
  estoque: number;
  estoqueMinimo: number;
}

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  readonly produtos: ProdutoResumo[] = [
    {
      nome: 'Arroz 5kg',
      sku: 'ARR-001',
      estoque: 18,
      estoqueMinimo: 10,
    },
    {
      nome: 'Feijão 1kg',
      sku: 'FEI-002',
      estoque: 6,
      estoqueMinimo: 12,
    },
    {
      nome: 'Café 500g',
      sku: 'CAF-003',
      estoque: 0,
      estoqueMinimo: 8,
    },
    {
      nome: 'Açúcar 1kg',
      sku: 'ACU-004',
      estoque: 22,
      estoqueMinimo: 10,
    },
    {
      nome: 'Óleo de soja 900ml',
      sku: 'OLE-005',
      estoque: 4,
      estoqueMinimo: 10,
    },
    {
      nome: 'Detergente 500ml',
      sku: 'DET-006',
      estoque: 30,
      estoqueMinimo: 10,
    },
  ];

  get totalProdutos(): number {
    return this.produtos.length;
  }

  get totalEstoqueBaixo(): number {
    return this.produtos.filter(
      (produto) =>
        produto.estoque > 0 &&
        produto.estoque < produto.estoqueMinimo,
    ).length;
  }

  get totalSemEstoque(): number {
    return this.produtos.filter(
      (produto) => produto.estoque === 0,
    ).length;
  }

  get produtosCriticos(): ProdutoResumo[] {
    return this.produtos.filter(
      (produto) =>
        produto.estoque === 0 ||
        produto.estoque < produto.estoqueMinimo,
    );
  }
}
