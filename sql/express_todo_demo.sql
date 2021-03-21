/*
 Navicat Premium Data Transfer

 Source Server         : local-mysql57
 Source Server Type    : MySQL
 Source Server Version : 50726
 Source Host           : localhost:3306
 Source Schema         : express_todo_demo

 Target Server Type    : MySQL
 Target Server Version : 50726
 File Encoding         : 65001

 Date: 21/03/2021 16:18:33
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for t_todo
-- ----------------------------
DROP TABLE IF EXISTS `t_todo`;
CREATE TABLE `t_todo`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `status` tinyint(4) NULL DEFAULT NULL,
  `user_id` tinyint(4) NULL DEFAULT NULL,
  `createdAt` datetime(0) NULL,
  `updatedAt` datetime(0) NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_todo
-- ----------------------------
INSERT INTO `t_todo` VALUES (1, '早起', '早上6:30起床', 1, 1, '2021-03-21 07:31:13', '2021-03-21 08:10:04');
INSERT INTO `t_todo` VALUES (2, '做早餐', '7点给家人做早餐', 0, 1, '2021-03-21 08:02:17', '2021-03-21 08:04:34');
INSERT INTO `t_todo` VALUES (3, '上班', '8:30到公司打卡', 0, 1, '2021-03-21 08:02:22', '2021-03-21 08:04:58');
INSERT INTO `t_todo` VALUES (4, '拍摄', '10点开始拍摄', 0, 1, '2021-03-21 08:02:27', '2021-03-21 08:05:16');
INSERT INTO `t_todo` VALUES (5, '午休', '12:00 - 13:30 午休', 0, 1, '2021-03-21 08:02:32', '2021-03-21 08:06:04');
INSERT INTO `t_todo` VALUES (6, '导出照片', '2点导出照片', 0, 1, '2021-03-21 08:06:32', '2021-03-21 08:08:23');
INSERT INTO `t_todo` VALUES (7, '修图片', '4点修好图片', 0, 1, '2021-03-21 08:06:51', '2021-03-21 08:06:51');
INSERT INTO `t_todo` VALUES (8, '上架', '5点开始上架', 0, 1, '2021-03-21 08:07:07', '2021-03-21 08:07:07');
INSERT INTO `t_todo` VALUES (9, '下班', '6点打卡下班', 0, 1, '2021-03-21 08:07:24', '2021-03-21 08:07:24');
INSERT INTO `t_todo` VALUES (10, '吃晚饭', '7点开始吃晚饭', 0, 1, '2021-03-21 08:07:51', '2021-03-21 08:07:51');
INSERT INTO `t_todo` VALUES (11, '睡觉', '10点睡觉', 2, 1, '2021-03-21 08:10:35', '2021-03-21 08:10:38');

-- ----------------------------
-- Table structure for t_user
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `password` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `nickname` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `avatar` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `createdAt` datetime(0) NULL,
  `updatedAt` datetime(0) NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_user
-- ----------------------------
INSERT INTO `t_user` VALUES (1, 'admin', '123456', NULL, NULL, '2021-03-21 14:54:17', '2021-03-21 14:54:21');
INSERT INTO `t_user` VALUES (2, 'admin123', '123456', NULL, NULL, '2021-03-21 06:58:33', '2021-03-21 06:58:33');
INSERT INTO `t_user` VALUES (3, 'alan', '123456', NULL, NULL, '2021-03-21 07:05:25', '2021-03-21 07:05:25');

SET FOREIGN_KEY_CHECKS = 1;
