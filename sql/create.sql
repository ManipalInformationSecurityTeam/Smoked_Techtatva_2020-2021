use smoked;

CREATE TABLE `tbl_user` (
  `user_id` bigint(20) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `user_name` varchar(45) DEFAULT NULL,
  `user_email` varchar(45) DEFAULT NULL,
  `user_password` varchar(450) DEFAULT NULL,
  `reg` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `college` varchar(45) DEFAULT NULL,
  `current_level` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`user_id`);

  ALTER TABLE `tbl_user`
  MODIFY `user_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

CREATE TABLE `level_route` (
  `level` bigint(20) DEFAULT NULL,
  `route` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `level_route`
--
TRUNCATE TABLE `level_route`;


INSERT INTO `level_route` (`level`, `route`) VALUES
(1, '/firstone'),
(2, '/techtatva20'),
(3, '/pub'),
(4, '/language'),
(5, '/motto'),
(6, '/ryandahl'),
(7, '/12.31.99'),
(8, '/rockstar'),
(9, '/V.I'),
(10, '/tictactoe'),
(11, '/valorant'),
(12, '/ledger'),
(13,'/rot'),
(14,'/carpeuel'),
(15,'/http'),
(16,'/letitload'),
(17,'/hiddeninplainsight'),
(18,'/sort'),
(19,'/sorts'),  
(20,'/yum'),
(21,'/droptek'),
(22,'/bigblue'),
(23,'/security'),
(24,'/silentf'),
(25,'/style'),
(26,'/gibberish'),
(27,'/ghanta'),
(28,'/iiiiiiiiiii'),
(29,'/windmill'),
(30,'/km'),
(31,'/eyrie'),
(32,'/nlogn'),
(33,'/code'),
(34,'/coredumped'),
(35,'/pipe'),
(36,'/years'),
(37,'/blank'),
(38,'/finish');

ALTER TABLE `tbl_user` ADD `time_stamp` DATETIME on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP AFTER `current_level`;

CREATE TABLE `answer_logs` (
  `user_id` bigint(20) NOT NULL,
  `user_name` varchar(45) NOT NULL,
  `answer` varchar(10000) NOT NULL,
  `ip_address` varchar(45) NOT NULL,
  `level` int(11) NOT NULL,
  `time_stamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `answer_logs`
  ADD KEY `user_id` (`user_id`);

ALTER TABLE `answer_logs`
  ADD CONSTRAINT `FK1` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

CREATE TABLE `ban_table` (
  `user_id` bigint(20) NOT NULL,
  `is_ban` tinyint(1) NOT NULL,
  `reason` varchar(100) NOT NULL,
  `start_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `end_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `ban_table`
  ADD PRIMARY KEY (`user_id`,`start_time`);

create TABLE verify_code (
  email varchar(50),
  code int,
  timestamp datetime,
  primary key(email, code));
