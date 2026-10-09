import { Component } from '@angular/core';

interface Produto {
  nome: string;
  sku: string;
  estoque: number;
  estoqueMinimo: number;
  categoria: string;
  unidade: string;
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
  erroFormulario = '';

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
      unidade: 'UN',
      estoque: 12,
      estoqueMinimo: 5,
    },
    {
      nome: 'Feijão 1kg',
      sku: 'FEI-002',
      categoria: 'Alimentos',
      unidade: 'UN',
      estoque: 8,
      estoqueMinimo: 10,
    },
    {
      nome: 'Café 500g',
      sku: 'CAF-003',
      categoria: 'Bebidas',
      unidade: 'UN',
      estoque: 20,
      estoqueMinimo: 8,
    },
    {
      nome: 'Açúcar 1kg',
      sku: 'ACU-004',
      categoria: 'Alimentos',
      unidade: 'UN',
      estoque: 0,
      estoqueMinimo: 6,
    },
    {
      nome: 'Óleo de soja 900ml',
      sku: 'OLE-005',
      categoria: 'Alimentos',
      unidade: 'UN',
      estoque: 5,
      estoqueMinimo: 5,
    },
    {
      nome: 'Detergente 500ml',
      sku: 'DET-006',
      categoria: 'Limpeza',
      unidade: 'UN',
      estoque: 18,
      estoqueMinimo: 7,
    },
  ];

  get produtosFiltrados(): Produto[] {
    const termo = this.termoBusca.toLowerCase().trim();

    if (!termo) {
      return this.produtos;
    }

    return this.produtos.filter(
      (produto) =>
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

  formatarNome(nome: string): string {
  const texto = nome.trim().toLowerCase();

  if (!texto) {
    return '';
  }

  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

  salvarProduto(): void {
    this.erroFormulario = '';

    if (
      !this.novoProduto.nome.trim() ||
      !this.novoProduto.sku.trim() ||
      !this.novoProduto.unidade
    ) {
      this.erroFormulario = 'Preencha nome, SKU e unidade antes de salvar.';
      return;
    }

    const skuJaExiste = this.produtos.some(
      (produto) =>
        produto.sku.toLowerCase() ===
        this.novoProduto.sku.trim().toLowerCase()
    );

    if (skuJaExiste) {
      this.erroFormulario = 'Já existe um produto cadastrado com esse SKU.';
      return;
    }

    if (this.novoProduto.estoqueMinimo < 0) {
      this.erroFormulario = 'O estoque mínimo não pode ser negativo.';
      return;
    }

    this.produtos.push({
      nome: this.formatarNome(this.novoProduto.nome),
      sku: this.novoProduto.sku.trim().toUpperCase(),
      categoria: this.novoProduto.categoria.trim(),
      unidade: this.novoProduto.unidade,
      estoque: 0,
      estoqueMinimo: this.novoProduto.estoqueMinimo,
    });

    this.novoProduto = {
      nome: '',
      sku: '',
      categoria: '',
      unidade: '',
      estoqueMinimo: 0,
    };

    this.erroFormulario = '';
    this.fecharFormulario();
  }
}