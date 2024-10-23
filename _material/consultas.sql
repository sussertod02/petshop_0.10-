-- TotalVendasAno 
SELECT 
SUM(v.valorTotal) AS totalVendasAno
FROM 
vendas v
WHERE 
v.status = 'concluída'
AND strftime('%Y', v.dataVenda) = :currentYear;


-- ProdutoMaisVendidos
SELECT 
p.id AS produtoId,
p.nome AS produtoNome,
SUM(vi.quantidade) AS quantidadeVendida
FROM 
produtos p
JOIN 
vendas_itens vi ON p.id = vi.produtoId
JOIN 
vendas v ON vi.vendaId = v.id
WHERE 
v.status = 'concluída'
AND strftime('%Y', v.dataVenda) = :currentYear
GROUP BY 
p.id, p.nome
ORDER BY 
quantidadeVendida DESC
LIMIT 1;


-- CategoriaMaisPopular
SELECT 
c.id AS categoriaId,
c.nome AS categoriaNome,
SUM(vi.quantidade) AS quantidadeVendida
FROM 
categorias c
JOIN 
produtos p ON c.id = p.categoriaId
JOIN 
vendas_itens vi ON p.id = vi.produtoId
JOIN 
vendas v ON vi.vendaId = v.id
WHERE 
v.status = 'concluída'
AND strftime('%Y', v.dataVenda) = :currentYear
GROUP BY 
c.id, c.nome
ORDER BY 
quantidadeVendida DESC
LIMIT 1;


--MediaVendasMensal
SELECT 
strftime('%m', v.dataVenda) AS mes,
AVG(v.valorTotal) AS mediaMensal
FROM 
vendas v
WHERE 
v.status = 'concluída'
AND strftime('%Y', v.dataVenda) = :currentYear
GROUP BY 
strftime('%m', v.dataVenda)
ORDER BY 
strftime('%m', v.dataVenda);


--VendasPendentes   
SELECT 
COUNT(*) AS totalPendentes
FROM 
vendas v
WHERE 
v.status = 'pendente';


--VendasPorClienteTop10PorAno   
SELECT 
c.id AS clienteId,
c.nome AS clienteNome,
COUNT(v.id) AS totalCompras,
SUM(v.valorTotal) AS valorTotalCompras
FROM 
clientes c
JOIN 
vendas v ON c.id = v.clienteId
WHERE 
v.status = 'concluída' AND strftime('%Y', v.dataVenda) = :currentYear
GROUP BY 
c.id, c.nome
ORDER BY 
valorTotalCompras DESC
LIMIT 10;

--VendasPorCategoria       
SELECT 
c.nome AS categoriaNome,
SUM(vi.quantidade * vi.precoUnitario) AS totalCategoria,
(SUM(vi.quantidade * vi.precoUnitario) / 
(SELECT SUM(v.valorTotal) 
FROM vendas v 
WHERE v.status = 'concluída' 
AND strftime('%Y', v.dataVenda) = '2024')) * 100 AS percentual
FROM 
categorias c
JOIN 
produtos p ON c.id = p.categoriaId
JOIN 
vendas_itens vi ON p.id = vi.produtoId
JOIN 
vendas v ON vi.vendaId = v.id
WHERE 
v.status = 'concluída'
AND strftime('%Y', v.dataVenda) = :currentYear
GROUP BY 
c.id, c.nome
ORDER BY 
percentual DESC;


--ClientesAtivos
SELECT COUNT(DISTINCT c.id) AS totalClientesAtivos
FROM clientes c
JOIN vendas v ON c.id = v.clienteId
WHERE v.status = 'concluída' AND strftime('%Y', v.dataVenda) = :currentYear;


--ProdutoMaiorReceita
SELECT p.nome AS produtoNome, SUM(vi.quantidade * vi.precoUnitario) AS receitaTotal
FROM produtos p
JOIN vendas_itens vi ON p.id = vi.produtoId
JOIN vendas v ON vi.vendaId = v.id
WHERE v.status = 'concluída' AND strftime('%Y', v.dataVenda) = :currentYear
GROUP BY p.id, p.nome
ORDER BY receitaTotal DESC
LIMIT 1;

--VendaConcluidas
SELECT COUNT(*) AS totalVendasConcluidas
FROM vendas v
WHERE status = 'concluída' AND strftime('%Y', v.dataVenda) = :currentYear;

-- NumeroProdutoVendido
SELECT SUM(vi.quantidade) AS totalProdutosVendidos
FROM vendas_itens vi
JOIN vendas v ON vi.vendaId = v.id
WHERE v.status = 'concluída' AND strftime('%Y', v.dataVenda) = :currentYear;

-- ClientesNovo
SELECT COUNT(*) AS clientesNovos
FROM (
SELECT c.id, MIN(v.dataVenda) AS primeiraCompra
FROM clientes c
JOIN vendas v ON c.id = v.clienteId
WHERE v.status = 'concluída'
GROUP BY c.id
HAVING strftime('%Y', primeiraCompra) = :currentYear);




