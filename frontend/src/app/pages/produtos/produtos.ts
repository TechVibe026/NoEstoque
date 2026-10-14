import { Component } from '@angular/core';

interface Produto {
  nome: string;
  sku: string;
  estoque: number;
  estoqueMinimo: number;
  categoria: string;
  unidade: string;
  ativo: boolean;
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
  produtoEmEdicao: Produto | null = null;
  mensagemPagina = '';
  produtoSelecionado: Produto | null = null;

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
    ativo: true,
  },
  {
    nome: 'Feijão 1kg',
    sku: 'FEI-002',
    categoria: 'Alimentos',
    unidade: 'UN',
    estoque: 8,
    estoqueMinimo: 10,
    ativo: true,
  },
  {
    nome: 'Café 500g',
    sku: 'CAF-003',
    categoria: 'Bebidas',
    unidade: 'UN',
    estoque: 20,
    estoqueMinimo: 8,
    ativo: true,
  },
  {
    nome: 'Açúcar 1kg',
    sku: 'ACU-004',
    categoria: 'Alimentos',
    unidade: 'UN',
    estoque: 0,
    estoqueMinimo: 6,
    ativo: true,
  },
  {
    nome: 'Óleo de soja 900ml',
    sku: 'OLE-005',
    categoria: 'Alimentos',
    unidade: 'UN',
    estoque: 5,
    estoqueMinimo: 5,
    ativo: true,
  },
  {
    nome: 'Detergente 500ml',
    sku: 'DET-006',
    categoria: 'Limpeza',
    unidade: 'UN',
    estoque: 18,
    estoqueMinimo: 7,
    ativo: true,
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

// Total de produtos cadastrados, incluindo os inativos.
get totalProdutos(): number {
  return this.produtos.length;
}

// Produtos ativos que precisam de reposição.
// Estoque zerado é contado separadamente.
get totalEstoqueBaixo(): number {
  return this.produtos.filter(
    (produto) =>
      produto.ativo &&
      produto.estoque > 0 &&
      produto.estoque <= produto.estoqueMinimo
  ).length;
}

// Produtos ativos sem nenhuma unidade disponível.
get totalSemEstoque(): number {
  return this.produtos.filter(
    (produto) => produto.ativo && produto.estoque === 0
  ).length;
}

// Barra que compara o estoque atual com o mínimo.
// O preenchimento fica limitado a 100%.
nivelEstoque(produto: Produto): number {
  if (produto.estoqueMinimo <= 0) {
    return produto.estoque > 0 ? 100 : 0;
  }

  return Math.min(
    100,
    Math.max(0, (produto.estoque / produto.estoqueMinimo) * 100)
  );
}

  abrirFormulario(): void {
    this.mostrarFormulario = true;
  }

  fecharFormulario(): void {
  this.mostrarFormulario = false;
  this.produtoEmEdicao = null;

  this.novoProduto = {
    nome: '',
    sku: '',
    categoria: '',
    unidade: '',
    estoqueMinimo: 0,
  };

  this.erroFormulario = '';
}

  formatarNome(nome: string): string {
  const texto = nome.trim().toLowerCase();

  if (!texto) {
    return '';
  }

  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

editarProduto(produto: Produto): void {
  this.produtoEmEdicao = produto;

  this.novoProduto = {
    nome: produto.nome,
    sku: produto.sku,
    categoria: produto.categoria,
    unidade: produto.unidade,
    estoqueMinimo: produto.estoqueMinimo,
  };

  this.erroFormulario = '';
  this.mostrarFormulario = true;
}

verDetalhes(produto: Produto): void {
  this.produtoSelecionado = produto;
}

inativarProduto(produto: Produto): void {
  this.mensagemPagina = '';

  if (produto.estoque > 0) {
    this.mensagemPagina =
      'O produto precisa estar com estoque zerado para ser inativado.';
    return;
  }

  produto.ativo = false;
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
        produto !== this.produtoEmEdicao &&
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


    if (this.produtoEmEdicao) {
  this.produtoEmEdicao.nome = this.formatarNome(this.novoProduto.nome);
  this.produtoEmEdicao.sku = this.novoProduto.sku.trim().toUpperCase();
  this.produtoEmEdicao.categoria = this.novoProduto.categoria.trim();
  this.produtoEmEdicao.unidade = this.novoProduto.unidade;
  this.produtoEmEdicao.estoqueMinimo = this.novoProduto.estoqueMinimo;

  this.fecharFormulario();

  return;
}


    this.produtos.push({
      nome: this.formatarNome(this.novoProduto.nome),
      sku: this.novoProduto.sku.trim().toUpperCase(),
      categoria: this.novoProduto.categoria.trim(),
      unidade: this.novoProduto.unidade,
      estoque: 0,
      estoqueMinimo: this.novoProduto.estoqueMinimo,
      ativo: true,
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