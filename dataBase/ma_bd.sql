-- phpMyAdmin SQL Dump
-- version 5.2.1deb3
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : sam. 14 déc. 2024 à 15:54
-- Version du serveur : 8.0.40-0ubuntu0.24.04.1
-- Version de PHP : 8.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `film`
--

-- --------------------------------------------------------

--
-- Structure de la table `acteur`
--

CREATE TABLE `acteur` (
  `id_acteur` varchar(100) NOT NULL,
  `nom_acteur` varchar(100) NOT NULL,
  `datearrive` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `acteur`
--

INSERT INTO `acteur` (`id_acteur`, `nom_acteur`, `datearrive`) VALUES
('khytr', 'emerant', '2024-12-11 19:30:26'),
('qqq001', 'ALEX', '2024-12-11 19:20:47'),
('s2', 'qbftrh', '2024-12-11 19:20:47'),
('seea000v', 'ee5', '2024-12-11 19:37:22'),
('w4333', 'qaszs', '2024-12-13 09:27:41'),
('wwq000', 'alex', '2024-12-11 19:20:47');

-- --------------------------------------------------------

--
-- Structure de la table `cassette`
--

CREATE TABLE `cassette` (
  `n_cassete` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `nbre_location` int NOT NULL,
  `id_magasin` varchar(100) NOT NULL,
  `id_film` varchar(100) NOT NULL,
  `id_client` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `cassette`
--

INSERT INTO `cassette` (`n_cassete`, `nbre_location`, `id_magasin`, `id_film`, `id_client`) VALUES
('00c0000qqsq', 4451217, 'efddd', 'f001', 'uiu');

-- --------------------------------------------------------

--
-- Structure de la table `caution`
--

CREATE TABLE `caution` (
  `id_caution` varchar(100) NOT NULL,
  `montant` float NOT NULL,
  `durre` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `caution`
--

INSERT INTO `caution` (`id_caution`, `montant`, `durre`) VALUES
('c000', 1000, '63:48:25'),
('c002', 4000, '15:28:25');

-- --------------------------------------------------------

--
-- Structure de la table `client`
--

CREATE TABLE `client` (
  `id_client` varchar(100) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `adresse` varchar(100) NOT NULL,
  `id_magasin` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `client`
--

INSERT INTO `client` (`id_client`, `nom`, `adresse`, `id_magasin`) VALUES
('kkkk', 'fgfalaedxslga', 'b001ctyd', 'efddd'),
('uiu', 'c1s11bsbv', '1lkkk', 'qwe1');

-- --------------------------------------------------------

--
-- Structure de la table `emprunt`
--

CREATE TABLE `emprunt` (
  `id_emprunt` varchar(100) NOT NULL,
  `date_emprunt` timestamp NOT NULL,
  `date_retour` timestamp NOT NULL,
  `id_magasin` varchar(100) NOT NULL,
  `id_client` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `emprunt`
--

INSERT INTO `emprunt` (`id_emprunt`, `date_emprunt`, `date_retour`, `id_magasin`, `id_client`) VALUES
('e475', '2024-12-14 15:49:49', '2024-12-14 15:49:49', 'efddd', 'uiu');

-- --------------------------------------------------------

--
-- Structure de la table `film`
--

CREATE TABLE `film` (
  `id_film` varchar(100) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `durre` time NOT NULL,
  `id_acteur` varchar(100) DEFAULT NULL,
  `nom_genre` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `film`
--

INSERT INTO `film` (`id_film`, `titre`, `durre`, `id_acteur`, `nom_genre`) VALUES
('f001', 'famlav', '11:08:04', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `genre`
--

CREATE TABLE `genre` (
  `nom_genre` varchar(100) NOT NULL,
  `type_public` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `genre`
--

INSERT INTO `genre` (`nom_genre`, `type_public`) VALUES
('romant', 'kmrlayp');

-- --------------------------------------------------------

--
-- Structure de la table `jouer`
--

CREATE TABLE `jouer` (
  `role` varchar(100) NOT NULL,
  `id_acteur` varchar(100) NOT NULL,
  `id_film` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `jouer`
--

INSERT INTO `jouer` (`role`, `id_acteur`, `id_film`) VALUES
('d001', 's2', 'f001');

-- --------------------------------------------------------

--
-- Structure de la table `magasin`
--

CREATE TABLE `magasin` (
  `id_magasin` varchar(100) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `localisation` varchar(100) NOT NULL,
  `heure_enregistrement` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `magasin`
--

INSERT INTO `magasin` (`id_magasin`, `nom`, `localisation`, `heure_enregistrement`) VALUES
('dnfkf', 'jugjgg', 'qweyrqa', '2024-12-05 09:17:45'),
('efddd', 'qjssdq', 'qhddf', '2024-12-05 09:17:45'),
('qwe1', 'dovveq', 'bandjoun', '2024-12-11 20:09:17');

-- --------------------------------------------------------

--
-- Structure de la table `nombre`
--

CREATE TABLE `nombre` (
  `nombre` int NOT NULL,
  `dernier` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `nombre`
--

INSERT INTO `nombre` (`nombre`, `dernier`) VALUES
(2, '2024-12-03 10:38:37'),
(1, '2024-12-03 10:44:14'),
(1, '2024-12-03 10:46:57'),
(1, '2024-12-03 10:47:12'),
(1, '2024-12-03 10:48:32'),
(1, '2024-12-03 12:04:12'),
(2, '2024-12-04 13:44:58'),
(1, '2024-12-04 13:49:46'),
(1, '2024-12-05 09:02:42'),
(1, '2024-12-05 09:05:36'),
(2, '2024-12-05 09:17:23'),
(2, '2024-12-05 09:29:44'),
(4, '2024-12-09 18:37:54'),
(1, '2024-12-09 18:39:37'),
(5, '2024-12-09 18:51:00'),
(1, '2024-12-09 18:51:10'),
(1, '2024-12-09 19:33:48'),
(1, '2024-12-09 19:37:17'),
(1, '2024-12-09 19:37:44'),
(1, '2024-12-09 19:38:08'),
(1, '2024-12-09 19:38:55'),
(1, '2024-12-09 19:39:55'),
(1, '2024-12-09 19:42:52'),
(2, '2024-12-09 19:45:29'),
(2, '2024-12-10 07:38:44'),
(1, '2024-12-10 07:39:37'),
(1, '2024-12-10 08:32:57'),
(1, '2024-12-10 08:49:22'),
(1, '2024-12-10 08:51:57'),
(1, '2024-12-10 09:02:34'),
(1, '2024-12-10 09:03:01'),
(1, '2024-12-10 09:05:54'),
(1, '2024-12-10 09:16:32'),
(2, '2024-12-10 09:17:21'),
(2, '2024-12-10 09:18:34'),
(2, '2024-12-10 09:22:04'),
(2, '2024-12-10 09:22:13'),
(2, '2024-12-10 09:23:57'),
(1, '2024-12-10 09:50:09'),
(1, '2024-12-10 09:52:26'),
(1, '2024-12-10 09:54:38'),
(1, '2024-12-10 09:56:20'),
(2, '2024-12-10 12:11:05'),
(2, '2024-12-10 12:12:18'),
(1, '2024-12-10 12:13:32'),
(3, '2024-12-10 12:13:47'),
(1, '2024-12-10 12:14:00');

-- --------------------------------------------------------

--
-- Structure de la table `rendre`
--

CREATE TABLE `rendre` (
  `id_rente` varchar(100) NOT NULL,
  `date_rente` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_magasin` varchar(100) NOT NULL,
  `id_client` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `rendre`
--

INSERT INTO `rendre` (`id_rente`, `date_rente`, `id_magasin`, `id_client`) VALUES
('R001', '2024-12-25 15:25:34', 'dnfkf', 'kkkk');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `acteur`
--
ALTER TABLE `acteur`
  ADD PRIMARY KEY (`id_acteur`);

--
-- Index pour la table `cassette`
--
ALTER TABLE `cassette`
  ADD PRIMARY KEY (`n_cassete`),
  ADD KEY `id_magasin` (`id_magasin`,`id_film`,`id_client`),
  ADD KEY `cassette_ibfk_1` (`id_client`),
  ADD KEY `cassette_ibfk_2` (`id_film`);

--
-- Index pour la table `caution`
--
ALTER TABLE `caution`
  ADD PRIMARY KEY (`id_caution`);

--
-- Index pour la table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`id_client`),
  ADD KEY `id_magasin` (`id_magasin`);

--
-- Index pour la table `emprunt`
--
ALTER TABLE `emprunt`
  ADD PRIMARY KEY (`id_emprunt`),
  ADD KEY `id_magasin` (`id_magasin`,`id_client`),
  ADD KEY `id_client` (`id_client`);

--
-- Index pour la table `film`
--
ALTER TABLE `film`
  ADD PRIMARY KEY (`id_film`),
  ADD KEY `id_acteur` (`id_acteur`),
  ADD KEY `nom_genre` (`nom_genre`);

--
-- Index pour la table `genre`
--
ALTER TABLE `genre`
  ADD PRIMARY KEY (`nom_genre`);

--
-- Index pour la table `jouer`
--
ALTER TABLE `jouer`
  ADD PRIMARY KEY (`role`),
  ADD KEY `id_acteur` (`id_acteur`,`id_film`),
  ADD KEY `id_film` (`id_film`);

--
-- Index pour la table `magasin`
--
ALTER TABLE `magasin`
  ADD PRIMARY KEY (`id_magasin`);

--
-- Index pour la table `rendre`
--
ALTER TABLE `rendre`
  ADD PRIMARY KEY (`id_rente`),
  ADD KEY `id_magasin` (`id_magasin`,`id_client`),
  ADD KEY `rendre_ibfk_2` (`id_client`);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `cassette`
--
ALTER TABLE `cassette`
  ADD CONSTRAINT `cassette_ibfk_1` FOREIGN KEY (`id_client`) REFERENCES `client` (`id_client`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cassette_ibfk_2` FOREIGN KEY (`id_film`) REFERENCES `film` (`id_film`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cassette_ibfk_3` FOREIGN KEY (`id_magasin`) REFERENCES `magasin` (`id_magasin`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `client`
--
ALTER TABLE `client`
  ADD CONSTRAINT `client_ibfk_1` FOREIGN KEY (`id_magasin`) REFERENCES `magasin` (`id_magasin`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `emprunt`
--
ALTER TABLE `emprunt`
  ADD CONSTRAINT `emprunt_ibfk_1` FOREIGN KEY (`id_magasin`) REFERENCES `magasin` (`id_magasin`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `emprunt_ibfk_2` FOREIGN KEY (`id_client`) REFERENCES `client` (`id_client`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `film`
--
ALTER TABLE `film`
  ADD CONSTRAINT `film_ibfk_1` FOREIGN KEY (`id_acteur`) REFERENCES `acteur` (`id_acteur`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `film_ibfk_2` FOREIGN KEY (`nom_genre`) REFERENCES `genre` (`nom_genre`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `jouer`
--
ALTER TABLE `jouer`
  ADD CONSTRAINT `jouer_ibfk_1` FOREIGN KEY (`id_film`) REFERENCES `film` (`id_film`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `jouer_ibfk_2` FOREIGN KEY (`id_acteur`) REFERENCES `acteur` (`id_acteur`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `rendre`
--
ALTER TABLE `rendre`
  ADD CONSTRAINT `rendre_ibfk_1` FOREIGN KEY (`id_magasin`) REFERENCES `magasin` (`id_magasin`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rendre_ibfk_2` FOREIGN KEY (`id_client`) REFERENCES `client` (`id_client`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;