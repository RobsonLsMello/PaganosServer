-- phpMyAdmin SQL Dump
-- version 4.4.15.1
-- http://www.phpmyadmin.net
--
-- Host: mysql669.umbler.com
-- Generation Time: 12-Out-2020 às 23:13
-- Versão do servidor: 5.6.40
-- PHP Version: 5.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_paga_nos`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`teledevs`@`187.84.225.36` PROCEDURE `dl_deletar_campanha`(in campanha int)
BEGIN
	delete from tb_campanha where cd_campanha = campanha;
END$$

CREATE DEFINER=`teledevs`@`187.84.225.36` PROCEDURE `in_cadastrar_campanha`(
    in nomeCampanha varchar(45), 
    in headLine varchar(200), 
    in lanceMinimo float, 
    in descricao varchar(1000), 
    in foto varchar(100), 
    in negocio int, 
    in categoria int,
    in meta float,
    in dataInicial date,
    in dataFinal date
)
BEGIN
    if (SELECT count(*) FROM tb_campanha WHERE cd_negocio = negocio and ic_ativo = true) = 0 then
        INSERT INTO tb_campanha
            (nm_campanha, nm_head_line, vl_lance_minimo, ic_ativo, ds_campanha, im_campanha, cd_negocio, cd_categoria, vl_meta, dt_campanha, dt_inicio_campanha, dt_final_campanha)
        VALUES
            (nomeCampanha, headLine, lanceMinimo, true, descricao, foto, negocio, categoria, meta, now(), dataInicial, dataFinal);
        SELECT cd_campanha campanha FROM tb_campanha WHERE cd_negocio = negocio and ic_ativo = true;
    else
        SELECT 0 campanha;
    end if;
END$$

CREATE DEFINER=`teledevs`@`187.84.225.36` PROCEDURE `in_cadastrar_negocio`(
    in razao_social varchar(100),
    in fantasia varchar(45),
    in cnpj varchar(14),
    in pix varchar(50),
    in cep varchar(8),
    in logradouro varchar(50),
    in cidade varchar(50),
    in uf char(2),
    in logo varchar(100),
    in usuario int(11)
)
BEGIN
    if(SELECT count(*) FROM tb_negocio WHERE cd_cnpj = cnpj) = 0 then
        INSERT INTO tb_negocio
            (nm_razao_social, nm_fantasia, cd_cnpj, cd_pix, cd_cep, ds_logradouro, nm_cidade, sg_uf, im_logo, cd_usuario)
        VALUES
            (razao_social, fantasia, cnpj, pix, cep, logradouro, cidade, uf, logo, usuario);
        SELECT cd_negocio 'negocio' FROM tb_negocio WHERE cd_cnpj = cnpj;
    else
        SELECT 0 'negocio';
    end if;
END$$

CREATE DEFINER=`teledevs`@`187.84.225.36` PROCEDURE `in_cadastrar_redeSocial`(in usuario int, in redeSocial varchar(100), in tipoRedeSocial int)
BEGIN
	insert into tb_contato(cd_usuario, cd_tipo_contato, cd_contato) values (usuario, tipoRedeSocial, redeSocial);
END$$

CREATE DEFINER=`teledevs`@`187.84.225.36` PROCEDURE `in_cadastrar_usuario`(
    in nome varchar(120), 
    in email varchar(50), 
    in senha varchar(20), 
    in cpf varchar(11), 
    in isNegocio tinyint
)
BEGIN
    declare usuario int;
    if (SELECT count(*) FROM tb_usuario WHERE nm_email = email AND cd_cpf = cpf) = 0 then
        insert into tb_usuario (nm_usuario, nm_email, cd_senha, cd_cpf, ic_negocio) values (nome, email, senha, cpf, isNegocio);
        set usuario = (SELECT cd_usuario FROM tb_usuario WHERE cd_cpf = cpf);
    else
        set usuario = 0;
    end if;
    select usuario 'usuario';
END$$

CREATE DEFINER=`teledevs`@`187.84.225.36` PROCEDURE `in_criar_investimento`(in investimento float(11), in codigoCampanha int, in codigoInvestidor int, in transacao varchar(45))
BEGIN
    insert into tb_investimento
        (cd_investidor, cd_campanha, vl_investimento, cd_transacao, dt_investimento, ic_pago)
    values
        (codigoInvestidor, codigoCampanha, investimento, transacao, now(), false);
END$$

CREATE DEFINER=`teledevs`@`187.84.225.36` PROCEDURE `sl_campanhas_topInvestimento`(in categoria int)
BEGIN
	if categoria = 0 then
		SELECt 
			sum(vl_investimento) investimento,
			c.cd_campanha codigoCampanha, 
            nm_head_line headLine,
            im_campanha foto,
			nm_campanha nomeCampanha
		FROM
			tb_campanha c LEFT join tb_investimento i on c.cd_campanha = i.cd_campanha
		group by c.cd_campanha
		order by investimento desc
		LIMIT 10;
	else
		SELECt 
			sum(vl_investimento) investimento,
			c.cd_campanha codigoCampanha, 
            nm_head_line headLine,
            im_campanha foto,
			nm_campanha nomeCampanha
		FROM
			tb_campanha c LEFT join tb_investimento i on c.cd_campanha = i.cd_campanha
		WHERE cd_categoria = categoria
        group by c.cd_campanha
		order by investimento desc
		LIMIT 10;
	end if;
END$$

CREATE DEFINER=`teledevs`@`187.84.225.36` PROCEDURE `sl_filtrar_campanhas`( in categoria varchar(11), in lance float, in localizacao varchar(150))
BEGIN
	declare categoriaFormated varchar(11);
    set categoriaFormated = replace(categoria, ' ', '');
	if localizacao = '' then
		SELECT
			cd_campanha codigoCampanha,
			nm_head_line headLine,
            im_campanha foto,
			ds_campanha nomeCampanha
		FROM
			tb_campanha
		WHERE
			cd_categoria like concat('%', categoriaFormated) and vl_lance_minimo >= lance ;
	else
		SELECT
			cd_campanha codigoCampanha,
			nm_head_line headLine,
            im_campanha foto,
			ds_campanha nomeCampanha
		FROM
			tb_campanha c join tb_negocio n on c.cd_negocio = n.cd_negocio
		WHERE
			cd_categoria like concat('%', categoriaFormated) and vl_lance_minimo >= lance and  concat(nm_cidade,',',sg_uf) = localizacao;
	end if;
END$$

CREATE DEFINER=`teledevs`@`187.84.225.36` PROCEDURE `sl_mostrar_campanha`(in campanha int)
BEGIN
	SELECt 
		sum(vl_investimento) investimento,
        fn_investidores(campanha) investidores,
        vl_lance_minimo lanceMinimo,
        vl_meta meta,
        if(((sum(vl_investimento)*100)/ vl_meta) is null, 0, ((sum(vl_investimento)*100)/ vl_meta)) Porcentagem,
		c.cd_campanha codigoCampanha, 
		nm_head_line headLine,
		im_campanha fotoCampanha,
		nm_campanha nomeCampanha,
        nm_categoria nomeCategoria,
        nm_razao_social razaoSocial,
        ca.cd_categoria codigoCategoria,
        180 - DATEDIFF(curdate(), dt_campanha) tempoRestante,
        im_logo logo,
        concat(nm_cidade, ',',sg_uf) localizacao,
        ds_campanha descricaoCampanha
	FROM
		tb_campanha c 
        LEFT join 
			tb_investimento i on c.cd_campanha = i.cd_campanha 
        LEFT JOIN
			tb_negocio n on n.cd_negocio = c.cd_negocio
		LEFT JOIN
			tb_categoria ca on c.cd_categoria = ca.cd_categoria
	WHERE
		c.cd_campanha = campanha;
END$$

CREATE DEFINER=`teledevs`@`187.84.225.36` PROCEDURE `sl_mostrar_categorias`()
BEGIN
    SELECT
        cd_categoria codigoCategoria,
        nm_categoria nomeCategoria
    FROM
        tb_categoria
    order by nomeCategoria;
END$$

CREATE DEFINER=`teledevs`@`187.84.225.36` PROCEDURE `sl_mostrar_dados_campanhas`(IN `negocio` INT, IN `dateMax` DATE, IN `dateMin` DATE)
BEGIN
    SELECT
        c.cd_campanha codigoCampanha,
        nm_campanha nomeCampanha,
        count(*) investidores,
        if(sum(vl_investimento) is null, 0, sum(vl_investimento)) totalInvestimento,
        if(sum(vl_investimento)/count(*) is null, 0 , sum(vl_investimento)/count(*)) mediaInvestimento,
        im_campanha foto,
        ic_ativo ativa
    FROM
        tb_campanha c
        LEFT JOIN tb_investimento i on c.cd_campanha = i.cd_campanha
    WHERE
        cd_negocio = negocio and date(dt_campanha) between dateMin and dateMax
	GROUP by c.cd_campanha;
END$$

CREATE DEFINER=`teledevs`@`187.84.225.36` PROCEDURE `sl_mostrar_dados_investimentos`(in usuario int, in dateMax date, in dateMin date)
BEGIN
    SELECT
        c.cd_campanha codigoCampanha, 
        nm_campanha nomeCampanha, 
        im_campanha foto,
        if(vl_investimento is null, 0,vl_investimento) contribuicao, 
        dt_investimento dataContribuicao,
        ic_pago pago
    FROM
        tb_campanha c
        LEFT JOIN tb_investimento i ON c.cd_campanha = i.cd_campanha
    WHERE
        cd_investidor = usuario AND DATE(dt_investimento) between dateMin and dateMax;
END$$

CREATE DEFINER=`teledevs`@`187.84.225.36` PROCEDURE `sl_mostrar_investidores`(in campanha int)
BEGIN
	SELECT 
		sum(vl_investimento) investimento,
        im_usuario fotoPerfil,
        count(*) projetosInvestidos,
        nm_usuario nomeUsuario
    FROM
		tb_investimento i JOIN tb_usuario u ON i.cd_investidor = u.cd_usuario
	WHERE
		cd_campanha = campanha and ic_pago = true
	group by cd_usuario;
END$$

CREATE DEFINER=`teledevs`@`187.84.225.36` PROCEDURE `sl_mostrar_negocio`(in negocio int)
BEGIN
    select 
        nm_razao_social razaoSocial, 
        nm_fantasia fantasia, 
        cd_cnpj cnpj, 
        cd_cep cep, 
        ds_logradouro logradouro, 
        nm_cidade cidade, 
        sg_uf uf, 
        im_logo logo
    FROM 
        tb_negocio
    WHERE cd_negocio = negocio;
END$$

CREATE DEFINER=`teledevs`@`187.84.225.36` PROCEDURE `sl_mostrar_recompensas`(in campanha int)
BEGIN
	select nm_tipo_recompensa nome, ds_recompensa recompensa from tb_tipo_recompensa tr join tb_recompensa r on tr.cd_tipo_recompensa = r.cd_beneficio where cd_campanha = campanha;
END$$

CREATE DEFINER=`teledevs`@`187.84.225.36` PROCEDURE `sl_mostrar_redesSociais`(in campanha int)
BEGIN
	select cd_contato 'contato' from tb_campanha c join tb_negocio n on n.cd_negocio = c.cd_negocio join tb_usuario u on u.cd_usuario = n.cd_usuario join tb_contato co on co.cd_usuario = u.cd_usuario where cd_campanha = campanha;
END$$

CREATE DEFINER=`teledevs`@`187.84.225.36` PROCEDURE `sl_mostrar_tipo_recompensas`()
BEGIN
	select cd_tipo_recompensa codigo, nm_tipo_recompensa nome from tb_tipo_recompensa;
END$$

CREATE DEFINER=`teledevs`@`187.84.225.36` PROCEDURE `sl_mostrar_usuario`(in usuario int)
BEGIN
	SELECT 
		nm_usuario nome,
		nm_email email,
		im_usuario foto,
		IF(SUM(vl_investimento) IS NULL, 0, SUM(vl_investimento)) saldo
	FROM
		tb_usuario u
			JOIN
		tb_negocio n ON n.cd_usuario = u.cd_usuario
			JOIN
		tb_campanha c ON n.cd_negocio = c.cd_negocio
			JOIN
		tb_investimento i ON i.cd_campanha = c.cd_campanha
	WHERE
		u.cd_usuario = usuario;
END$$

CREATE DEFINER=`teledevs`@`187.84.225.36` PROCEDURE `sl_procurar_campanhaPorTermo`(in termo varchar(50))
BEGIN
	SELECt 
			sum(vl_investimento) investimento,
			c.cd_campanha codigoCampanha, 
            nm_head_line headLine,
            im_campanha foto,
			nm_campanha nomeCampanha
		FROM
			tb_campanha c LEFT join tb_investimento i on c.cd_campanha = i.cd_campanha
	WHERE 
		nm_campanha like concat('%',termo,'%') or ds_campanha like concat('%',termo,'%') or nm_head_line like concat('%',termo,'%')
        group by c.cd_campanha
		order by investimento desc;
END$$

CREATE DEFINER=`teledevs`@`187.84.225.36` PROCEDURE `sp_login_usuario`(in email varchar(50), in senha varchar(20))
BEGIN
	declare usuario int;
    set usuario = (SELECT if(count(*) > 0, cd_usuario, 0) usuario FROM tb_usuario WHERE nm_email = email and cd_senha = senha);
    SELECT usuario 'usuario', (select cd_negocio FROM tb_negocio WHERE cd_usuario = usuario) negocio;
END$$

CREATE DEFINER=`teledevs`@`187.84.225.36` PROCEDURE `up_campanha_desativar`(in campanha int)
BEGIN
	update tb_campanha set ic_ativo = false where cd_campanha = campanha;
END$$

--
-- Functions
--
CREATE DEFINER=`teledevs`@`187.84.225.36` FUNCTION `fn_investidores`(campanha int) RETURNS int(11)
BEGIN
RETURN (SELECT count(*)  FROM tb_investimento where cd_campanha = campanha);
END$$

CREATE DEFINER=`teledevs`@`187.84.225.36` FUNCTION `fn_projetosApoiados_investidor`(usuario int) RETURNS int(11)
BEGIN
RETURN (SELECT count(*) projetos FROM tb_investimento where cd_usuario = usuario);
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_campanha`
--

CREATE TABLE IF NOT EXISTS `tb_campanha` (
  `cd_campanha` int(11) NOT NULL,
  `nm_campanha` varchar(45) NOT NULL,
  `nm_head_line` varchar(200) NOT NULL,
  `vl_lance_minimo` float NOT NULL,
  `ic_ativo` tinyint(4) NOT NULL,
  `ds_campanha` varchar(1000) DEFAULT NULL,
  `im_campanha` varchar(100) DEFAULT NULL,
  `vl_meta` float NOT NULL,
  `dt_campanha` datetime DEFAULT NULL,
  `cd_negocio` int(11) NOT NULL,
  `cd_categoria` int(11) NOT NULL,
  `dt_inicio_campanha` date DEFAULT NULL,
  `dt_final_campanha` date DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `tb_campanha`
--

INSERT INTO `tb_campanha` (`cd_campanha`, `nm_campanha`, `nm_head_line`, `vl_lance_minimo`, `ic_ativo`, `ds_campanha`, `im_campanha`, `vl_meta`, `dt_campanha`, `cd_negocio`, `cd_categoria`, `dt_inicio_campanha`, `dt_final_campanha`) VALUES
(1, 'Garagem', 'Garegem para meus clientes estacionarem', 500, 0, 'Todo um texto bem feito e elaborado', '/fotogaragem.jpg', 40000, '2020-10-11 00:10:00', 1, 1, NULL, NULL),
(2, 'Exibição', 'Ter mais tempo de exibição do cassinão', 3000, 0, 'Graças a Deus', '/novoCassinao.jpg', 100000, '2020-10-11 00:10:00', 2, 3, NULL, NULL),
(3, 'Restauração do Salão', 'Durante a pandemia, tivemos que vender algumas mesas, cadeiras e materiais para investir no delivery. Agora precisamos recuperar para reabrir o restaurante', 500, 0, 'Desde 2009 o restaurante da marta se especializa na literatura gourmet, o ato de comer enquanto aprecia um livro magnífico de Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis vel recusandae tempora officia officiis, fugiat voluptates, temporibus molestias sunt hic ducimus eum! Similique odit cupiditate repellat ab repellendus, minima pariatur!\nSão Paulo, São Paulo Alimentação Investimento\nAcreditamos que pactos devem ser feitos com Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla blanditiis similique nemo vero aliquid! Nobis sapiente quibusdam vel quidem incidunt maxime voluptatem eius praesentium? Asperiores dicta tempora quaerat ea unde.\n', '/restaurante_marta.png', 5000, '2020-10-12 21:05:49', 14, 1, '2020-10-01', '2021-12-26'),
(4, '123123', '12312312', 100, 0, '123123123', '/default.png', 10000, '2020-10-12 22:56:37', 1, 1, '2020-10-13', '2020-10-20'),
(5, 'Arrumar telhado', 'queriamos arrumar nosso telhado', 1000, 0, 'Nam pharetra nunc vel iaculis pulvinar. Aliquam erat volutpat. Pellentesque convallis, dolor ut lobortis consequat, ipsum massa lobortis orci, quis dictum tellus odio non ex. Vestibulum cursus magna sit amet ex vehicula, semper dictum nunc efficitur. Curabitur et purus et libero tempus imperdiet. Praesent rhoncus rhoncus nibh, id finibus nibh faucibus et', '/default.png', 5000, '2020-10-12 23:01:42', 1, 1, '2020-10-14', '2020-10-22'),
(6, 'Restauração da Fachada', 'Nunc ac lectus nec eros rutrum sodales. Aenean vel mattis lorem. Fusce quis euismod felis, a luctus risus. Proin mi neque, maximus ac feugiat eget, egestas sed turpis.', 300, 1, ' Praesent rhoncus rhoncus nibh, id finibus nibh faucibus et. Phasellus vel eros vel felis lacinia vulputate id volutpat orci. Ut congue, neque ut tristique imperdiet, sem nisl pharetra eros, in fermentum est nisi eget ipsum. Donec laoreet massa elit, et egestas lectus convallis in. Vestibulum ac viverra tellus. Sed quis lorem ac risus interdum tincidunt quis eu libero. Mauris rutrum, nisl sed euismod facilisis, velit metus bibendum enim, eu pulvinar quam felis sit amet turpis.', '/default.png', 5000, '2020-10-12 23:02:54', 1, 3, '2020-10-14', '2020-10-27');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_categoria`
--

CREATE TABLE IF NOT EXISTS `tb_categoria` (
  `cd_categoria` int(11) NOT NULL,
  `nm_categoria` varchar(40) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `tb_categoria`
--

INSERT INTO `tb_categoria` (`cd_categoria`, `nm_categoria`) VALUES
(1, 'Alimentação'),
(2, 'Manutenção'),
(3, 'Comércio'),
(4, 'Educação'),
(5, 'Saúde e Beleza');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_contato`
--

CREATE TABLE IF NOT EXISTS `tb_contato` (
  `cd_tipo_contato` int(11) NOT NULL,
  `cd_usuario` int(11) NOT NULL,
  `cd_contato` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `tb_contato`
--

INSERT INTO `tb_contato` (`cd_tipo_contato`, `cd_usuario`, `cd_contato`) VALUES
(2, 2, 'www.facebook.com/vistas');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_investimento`
--

CREATE TABLE IF NOT EXISTS `tb_investimento` (
  `cd_investidor` int(11) NOT NULL,
  `cd_campanha` int(11) NOT NULL,
  `vl_investimento` float NOT NULL,
  `cd_transacao` varchar(45) NOT NULL,
  `dt_investimento` datetime NOT NULL,
  `ic_pago` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `tb_investimento`
--

INSERT INTO `tb_investimento` (`cd_investidor`, `cd_campanha`, `vl_investimento`, `cd_transacao`, `dt_investimento`, `ic_pago`) VALUES
(1, 1, 600, 'elu21313', '2020-10-10 22:20:50', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_negocio`
--

CREATE TABLE IF NOT EXISTS `tb_negocio` (
  `cd_negocio` int(11) NOT NULL,
  `nm_razao_social` varchar(100) NOT NULL,
  `nm_fantasia` varchar(45) DEFAULT NULL,
  `cd_cnpj` varchar(14) NOT NULL,
  `cd_pix` varchar(50) NOT NULL,
  `cd_cep` varchar(8) NOT NULL,
  `ds_logradouro` varchar(50) NOT NULL,
  `nm_cidade` varchar(30) NOT NULL,
  `sg_uf` char(2) NOT NULL,
  `im_logo` varchar(100) NOT NULL,
  `cd_usuario` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `tb_negocio`
--

INSERT INTO `tb_negocio` (`cd_negocio`, `nm_razao_social`, `nm_fantasia`, `cd_cnpj`, `cd_pix`, `cd_cep`, `ds_logradouro`, `nm_cidade`, `sg_uf`, `im_logo`, `cd_usuario`) VALUES
(1, 'Carlos Eduardo Bianchi', 'Banana Split', '10602060000138', '+55996491249', '11310060', 'Frei Gaspar, 365', 'São Vicente', 'SP', '/logocarlosbianchi.jpg', 2),
(2, 'Gilberto Gil LTDA', 'Cassinão', '12605862000127', '12605862000127', '51011530', 'Irene Ramos Gomes de Mattos, 97', 'Recife', 'PE', '/cassinao.png', 3),
(10, 'STEPHANY DIE ALFARO MARTINS 48388555839', 'STEPHANY ESTETICA', '35538393000176', '1150514881', '04087002', '', 'SAO PAULO', 'SP', '', 8),
(11, 'LUCAS KEMERON SCORA DE SOUZA 11533346909', '', '35083689000140', '48188929042', '82220360', '', 'CURITIBA', 'PR', '', 9),
(12, 'SONIA FELIS FEIRANTE', '', '16675152000124', '76618985005', '02329010', '', 'SAO PAULO', 'SP', '', 10),
(13, 'IVANILSON MOREIRA SANTOS 73916617591', 'IVANILSON MOREIRA SANTOS', '34430859000152', '(19) 99885-8463', '13382518', '', 'NOVA ODESSA', 'SP', '', 11),
(14, 'Marta Jordani', 'Marta Jordani', '52708873000157', '11989881111', '04206001', '', 'São Paulo', 'SP', '/marta.png', 13);

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_recompensa`
--

CREATE TABLE IF NOT EXISTS `tb_recompensa` (
  `ds_recompensa` varchar(300) NOT NULL,
  `cd_campanha` int(11) NOT NULL,
  `cd_beneficio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_tipo_contato`
--

CREATE TABLE IF NOT EXISTS `tb_tipo_contato` (
  `cd_tipo_contato` int(11) NOT NULL,
  `nm_tipo_contato` varchar(45) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `tb_tipo_contato`
--

INSERT INTO `tb_tipo_contato` (`cd_tipo_contato`, `nm_tipo_contato`) VALUES
(1, 'Celular'),
(2, 'url'),
(3, 'email'),
(4, 'Outros');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_tipo_recompensa`
--

CREATE TABLE IF NOT EXISTS `tb_tipo_recompensa` (
  `cd_tipo_recompensa` int(11) NOT NULL,
  `nm_tipo_recompensa` varchar(80) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `tb_tipo_recompensa`
--

INSERT INTO `tb_tipo_recompensa` (`cd_tipo_recompensa`, `nm_tipo_recompensa`) VALUES
(1, 'Empréstimo Financeiro'),
(2, 'Participação dos Lucros'),
(3, 'Benefícios (descontro ou voucher)');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_usuario`
--

CREATE TABLE IF NOT EXISTS `tb_usuario` (
  `cd_usuario` int(11) NOT NULL,
  `nm_usuario` varchar(120) NOT NULL,
  `nm_email` varchar(50) NOT NULL,
  `cd_senha` varchar(20) NOT NULL,
  `cd_cpf` varchar(11) NOT NULL,
  `ic_negocio` tinyint(4) NOT NULL,
  `im_usuario` varchar(100) DEFAULT 'default.jpg'
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `tb_usuario`
--

INSERT INTO `tb_usuario` (`cd_usuario`, `nm_usuario`, `nm_email`, `cd_senha`, `cd_cpf`, `ic_negocio`, `im_usuario`) VALUES
(1, 'Robson Mello', 'robson.ls.mello@gmail.com', '123456789', '45683836840', 0, 'default.jpg'),
(2, 'Ivanilson Santos', 'nilson.thraximundar@gmail.com', '1234546', '47633986801', 1, 'default.jpg'),
(3, 'Gilberto Barros', 'gil@gmail.com', 'olhaodinheiro', '69434965063', 1, 'default.jpg'),
(4, '', '', '', '', 1, 'default.jpg'),
(5, 'Giovani Galano', 'ptvicosace@gmail.com', '12345567', '13198596076', 1, 'default.jpg'),
(6, 'Amanda Felix', 'amanda@gmail.com', 'asdfgh', '12345678940', 1, 'default.jpg'),
(7, 'Caio Henrique', 'caio@gmail.com', 'qwertyu', '10548407096', 1, 'default.jpg'),
(8, 'Cauê Inferninho', 'caue@gmail.com', 'zxcvbnm', '44091506003', 1, 'default.jpg'),
(9, 'Felipe Albuquerque', 'felipe@gmail.com', 'asdfghj', '48188929042', 1, 'default.jpg'),
(10, 'Sonia Felis Feirante', 'sonia@gmail.com', 'ghjklqwe', '76618985005', 1, 'default.jpg'),
(11, 'Ivanilson Legolas', 'nilson.98@hotmail.com', 'tabela12', '83984014007', 1, 'default.jpg'),
(12, 'Caio Andrade', 'caio.ceta@hotmail.com', 'jkluio', '27708423074', 1, 'default.jpg'),
(13, 'Marta Jordani', 'marta.jordani@gmail.com', '123456789', '65632066037', 1, 'marta.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_campanha`
--
ALTER TABLE `tb_campanha`
  ADD PRIMARY KEY (`cd_campanha`),
  ADD KEY `fk_tb_campanha_tb_negocio1_idx` (`cd_negocio`),
  ADD KEY `fk_tb_campanha_tb_categoria1_idx` (`cd_categoria`);

--
-- Indexes for table `tb_categoria`
--
ALTER TABLE `tb_categoria`
  ADD PRIMARY KEY (`cd_categoria`);

--
-- Indexes for table `tb_contato`
--
ALTER TABLE `tb_contato`
  ADD PRIMARY KEY (`cd_tipo_contato`,`cd_usuario`),
  ADD KEY `fk_tb_contato_tb_tipo_contato_idx` (`cd_tipo_contato`),
  ADD KEY `fk_tb_contato_tb_usuario1_idx` (`cd_usuario`);

--
-- Indexes for table `tb_investimento`
--
ALTER TABLE `tb_investimento`
  ADD PRIMARY KEY (`cd_investidor`,`cd_campanha`),
  ADD KEY `fk_tb_investimento_tb_investidor1_idx` (`cd_investidor`),
  ADD KEY `fk_tb_investimento_tb_campanha1_idx` (`cd_campanha`);

--
-- Indexes for table `tb_negocio`
--
ALTER TABLE `tb_negocio`
  ADD PRIMARY KEY (`cd_negocio`),
  ADD KEY `fk_tb_negocio_nm_usuario1_idx` (`cd_usuario`);

--
-- Indexes for table `tb_recompensa`
--
ALTER TABLE `tb_recompensa`
  ADD PRIMARY KEY (`cd_campanha`,`cd_beneficio`),
  ADD KEY `fk_nm_beneficio_tb_campanha1_idx` (`cd_campanha`),
  ADD KEY `fk_nm_beneficio_tb_tipo_beneficio1_idx` (`cd_beneficio`);

--
-- Indexes for table `tb_tipo_contato`
--
ALTER TABLE `tb_tipo_contato`
  ADD PRIMARY KEY (`cd_tipo_contato`);

--
-- Indexes for table `tb_tipo_recompensa`
--
ALTER TABLE `tb_tipo_recompensa`
  ADD PRIMARY KEY (`cd_tipo_recompensa`);

--
-- Indexes for table `tb_usuario`
--
ALTER TABLE `tb_usuario`
  ADD PRIMARY KEY (`cd_usuario`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_campanha`
--
ALTER TABLE `tb_campanha`
  MODIFY `cd_campanha` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `tb_categoria`
--
ALTER TABLE `tb_categoria`
  MODIFY `cd_categoria` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `tb_negocio`
--
ALTER TABLE `tb_negocio`
  MODIFY `cd_negocio` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `tb_tipo_contato`
--
ALTER TABLE `tb_tipo_contato`
  MODIFY `cd_tipo_contato` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `tb_tipo_recompensa`
--
ALTER TABLE `tb_tipo_recompensa`
  MODIFY `cd_tipo_recompensa` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `tb_usuario`
--
ALTER TABLE `tb_usuario`
  MODIFY `cd_usuario` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=14;
--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `tb_campanha`
--
ALTER TABLE `tb_campanha`
  ADD CONSTRAINT `fk_tb_campanha_tb_categoria1` FOREIGN KEY (`cd_categoria`) REFERENCES `tb_categoria` (`cd_categoria`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tb_campanha_tb_negocio1` FOREIGN KEY (`cd_negocio`) REFERENCES `tb_negocio` (`cd_negocio`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `tb_contato`
--
ALTER TABLE `tb_contato`
  ADD CONSTRAINT `fk_tb_contato_tb_investidor1` FOREIGN KEY (`cd_usuario`) REFERENCES `tb_usuario` (`cd_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tb_contato_tb_tipo_contato` FOREIGN KEY (`cd_tipo_contato`) REFERENCES `tb_tipo_contato` (`cd_tipo_contato`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `tb_investimento`
--
ALTER TABLE `tb_investimento`
  ADD CONSTRAINT `fk_tb_investimento_tb_campanha1` FOREIGN KEY (`cd_campanha`) REFERENCES `tb_campanha` (`cd_campanha`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tb_investimento_tb_investidor1` FOREIGN KEY (`cd_investidor`) REFERENCES `tb_usuario` (`cd_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `tb_negocio`
--
ALTER TABLE `tb_negocio`
  ADD CONSTRAINT `fk_tb_negocio_nm_usuario1` FOREIGN KEY (`cd_usuario`) REFERENCES `tb_usuario` (`cd_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `tb_recompensa`
--
ALTER TABLE `tb_recompensa`
  ADD CONSTRAINT `fk_nm_beneficio_tb_campanha1` FOREIGN KEY (`cd_campanha`) REFERENCES `tb_campanha` (`cd_campanha`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_nm_beneficio_tb_tipo_beneficio1` FOREIGN KEY (`cd_beneficio`) REFERENCES `tb_tipo_recompensa` (`cd_tipo_recompensa`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
