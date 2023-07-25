-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 25, 2023 at 01:05 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `login-db`
--

-- --------------------------------------------------------

--
-- Table structure for table `Tasks`
--

CREATE TABLE `Tasks` (
  `id` int(11) NOT NULL,
  `Task_name` varchar(255) NOT NULL,
  `Assigned_to` varchar(110) NOT NULL,
  `Status` varchar(110) NOT NULL,
  `Deadline` date NOT NULL,
  `Completed_on` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(110) NOT NULL,
  `email` varchar(110) NOT NULL,
  `password` varchar(155) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
(3, 'harsh', 'harsh@gmail.com', '1234'),
(5, 'example2', 'example2@gmail.com', 'eg'),
(6, 'John', 'john@gmail.com', 'asdfg'),
(7, 'kjsdBV', 'sda@ajbsv.av', '123'),
(10, 'HarshRungta', 'Harshrungta@gmail.com', '18'),
(12, 'Dave', 'dave@gmail.com', '123'),
(13, 'Jim', 'jim@gmail.com', '123'),
(14, '1', '1@gmail.com', '1'),
(15, '2', '2@gmail.com', '2'),
(16, '3', '3@gmail.com', '3'),
(17, '4', '4@gmail.com', '4'),
(18, '5', '5@gmail.com', '5'),
(19, '6', '6@gmail.com', '6'),
(20, '7', '7@gmail.com', '7'),
(21, '8', '8@gmail.com', '8'),
(22, '90', '90@gmail.com', '90'),
(23, '10', '10@gmail.com', '10'),
(24, '11', '11@gmail.com', '11'),
(25, '12', '12@gmail.com', '12');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Tasks`
--
ALTER TABLE `Tasks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Tasks`
--
ALTER TABLE `Tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
