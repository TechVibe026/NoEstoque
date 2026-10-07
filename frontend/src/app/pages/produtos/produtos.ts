import { Component } from '@angular/core';

interface Produto {
  nome: string;
  sku: string;
  estoque: number;
  estoqueMinimo: number;
  categoria: string;
}

@Component({
  imports: [],
  selector: 'app-produtos',
  styleUrl: './produtos.scss',
  templateUrl: './produtos.html',
})
export class Produtos {
  termoBusca = '';
  mostrarFormulario = false;

  novoProduto = {
    nome: '',
    sku: '',
    categoria: '',
    unidade: '',
    estoqueMinimo: 0,
  };

  produtos: Produto[] = [
    {
      nome: 'Arroz 5kg',
      sku: 'ARR-001',
      categoria: 'Alimentos',
      estoque: 12,
      estoqueMinimo: 5,
    },
    {
      nome: 'Feijão 1kg',
      sku: 'FEI-002',
      categoria: 'Alimentos',
      estoque: 8,
      estoqueMinimo: 10,
    },
    {
      nome: 'Café 500g',
      sku: 'CAF-003',
      categoria: 'Bebidas',
      estoque: 20,
      estoqueMinimo: 8,
    },
    {
      nome: 'Açúcar 1kg',
      sku: 'ACU-004',
      categoria: 'Alimentos',
      estoque: 0,
      estoqueMinimo: 6,
    },
    {
      nome: 'Óleo de soja 900ml',
      sku: 'OLE-005',
      categoria: 'Alimentos',
      estoque: 5,
      estoqueMinimo: 5,
    },
    {
      nome: 'Detergente 500ml',
      sku: 'DET-006',
      categoria: 'Limpeza',
      estoque: 18,
      estoqueMinimo: 7,
    },
  ];

  get produtosFiltrados(): Produto[] {
    const termo = this.termoBusca.toLowerCase().trim();

    if (!termo) {
      return this.produtos;
    }

    return this.produtos.filter((produto) =>
      produto.nome.toLowerCase().includes(termo) ||
      produto.sku.toLowerCase().includes(termo)
    );
  }

  abrirFormulario(): void {
    this.mostrarFormulario = true;
  }

  fecharFormulario(): void {
    this.mostrarFormulario = false;
  }

  salvarProduto(): void {
  this.produtos.push({
    nome: this.novoProduto.nome,
    sku: this.novoProduto.sku,
    categoria: this.novoProduto.categoria,
    estoque: 0,
    estoqueMinimo: this.novoProduto.estoqueMinimo,
  });

  this.fecharFormulario();
}

}