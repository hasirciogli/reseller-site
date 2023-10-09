![Sıte Homepage](https://media.discordapp.net/attachments/1160499704195469312/1160502100527173733/image.png)
# Welcome to RESELLER PANEL!

Selam bu benim public panellerimden birisi. Firmalar ile anlaşamadığım için public olarak yayınlamak istedim. Bu projeyi askıya aldım canım sıkıldıkça ek iş olarak geliştirmeye devam edeceğim. Veritabanı vs bütün projeyi yükledim. ui klasörü farklı bir react projesidir. React ile ui yapıldı (VİTE kullanılarak) projenin ana dizininde php backend bulunuyor.
PHP backendi başlatmak için ilm önce composer ile kütüphaneleri güncelleyip ardından yüklemeniz gerekiyor. PHP 8.1.24 ile sorunsuz çalışır. ardından ``clear && php8.1 -S localhost:4565 ./entrypoint.php `` i ana dizinde çalıştırıara php backendini çalıştırabilirsiniz. ui ı çalıştırmak için ise ana dizinde ``cd ./ui && npm run dev`` kodunu çalıştırarak tüm projeyi tamaen ayağa kaldırabilirsiniz.


``composer update``
``composer install``
``clear && php8.1 -S localhost:4565 ./entrypoint.php``
``cd ./ui && npm run dev``


checkout virtual pos services
https://hsrcpay.com



![UI Login](https://media.discordapp.net/attachments/1160499704195469312/1160501877763489852/image.png)
![UI Homepage](https://media.discordapp.net/attachments/1160499704195469312/1160499783425871922/image.png)
![UI Depositpage](https://media.discordapp.net/attachments/1160499704195469312/1160499884798001252/image.png)

```sql
--
-- Database: `reseller`
--

CREATE TABLE `accounts` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `balance` double NOT NULL DEFAULT 0,
  `name` varchar(255) DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `status` enum('active','suspend','awaiting_conf','inactive') NOT NULL DEFAULT 'active',
  `status_desc` varchar(3000) DEFAULT 'ac',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id`, `username`, `password`, `balance`, `name`, `surname`, `status`, `status_desc`, `created_at`, `updated_at`) VALUES
(1, 'admin', '1234', 125.17, 'Mustafa', 'Hasırcıoğlu', 'active', 'ac', '2023-10-05 07:48:39', '2023-10-05 07:48:39');

-- --------------------------------------------------------

--
-- Table structure for table `accounts_tokens`
--

CREATE TABLE `accounts_tokens` (
  `token_id` int(11) NOT NULL,
  `token` varchar(2222) NOT NULL,
  `account_id` varchar(2222) NOT NULL,
  `ending_at` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `deposit`
--

CREATE TABLE `deposit` (
  `id` int(11) NOT NULL,
  `deposit_id` varchar(1500) NOT NULL,
  `payment_id` varchar(1500) DEFAULT NULL,
  `account_id` varchar(1500) NOT NULL,
  `amount` double NOT NULL,
  `status` enum('waiting','rejected','approved') NOT NULL DEFAULT 'waiting'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `accounts_tokens`
--
ALTER TABLE `accounts_tokens`
  ADD PRIMARY KEY (`token_id`),
  ADD UNIQUE KEY `token` (`token`) USING HASH;

--
-- Indexes for table `deposit`
--
ALTER TABLE `deposit`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `deposit column` (`deposit_id`) USING HASH;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `accounts_tokens`
--
ALTER TABLE `accounts_tokens`
  MODIFY `token_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `deposit`
--
ALTER TABLE `deposit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;

```