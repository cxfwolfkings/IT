/*
 Navicat Premium Data Transfer

 Source Server         : dockermysql
 Source Server Type    : MySQL
 Source Server Version : 100137
 Source Host           : localhost:3306
 Source Schema         : lgccd

 Target Server Type    : MySQL
 Target Server Version : 100137
 File Encoding         : 65001

 Date: 12/08/2019 10:38:21
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for bas_camera
-- ----------------------------
DROP TABLE IF EXISTS `bas_camera`;
CREATE TABLE `bas_camera`  (
  `camera_no` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `camera_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `camera_desc` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `computer_no` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `device_no` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `iis_folder_name` varchar(2000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`camera_no`) USING BTREE,
  INDEX `fk_cam_device`(`device_no`) USING BTREE,
  CONSTRAINT `fk_cam_device` FOREIGN KEY (`device_no`) REFERENCES `bas_device` (`device_no`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of bas_camera
-- ----------------------------
INSERT INTO `bas_camera` VALUES ('C001', '1#CCD相机', '', NULL, 'D001', 'cameral_share_1');
INSERT INTO `bas_camera` VALUES ('C002', '2#CCD相机', '', NULL, 'D002', 'cameral_share_2');

-- ----------------------------
-- Table structure for bas_computer
-- ----------------------------
DROP TABLE IF EXISTS `bas_computer`;
CREATE TABLE `bas_computer`  (
  `computer_no` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ip_address` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `computer_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `line_no` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`computer_no`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for bas_device
-- ----------------------------
DROP TABLE IF EXISTS `bas_device`;
CREATE TABLE `bas_device`  (
  `device_no` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `device_name` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `loc_no` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`device_no`) USING BTREE,
  INDEX `fk_dev_loc`(`loc_no`) USING BTREE,
  CONSTRAINT `fk_dev_loc` FOREIGN KEY (`loc_no`) REFERENCES `bas_loc` (`loc_no`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of bas_device
-- ----------------------------
INSERT INTO `bas_device` VALUES ('D001', '1#机械手', 'LOC001');
INSERT INTO `bas_device` VALUES ('D002', '2#机械手', 'LOC001');
INSERT INTO `bas_device` VALUES ('D003', '3#机械手', 'LOC001');

-- ----------------------------
-- Table structure for bas_line
-- ----------------------------
DROP TABLE IF EXISTS `bas_line`;
CREATE TABLE `bas_line`  (
  `line_no` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `line_name` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `line_offset` int(11) NULL DEFAULT NULL,
  `workshop_no` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`line_no`) USING BTREE,
  INDEX `fk_line_ws`(`workshop_no`) USING BTREE,
  CONSTRAINT `fk_line_ws` FOREIGN KEY (`workshop_no`) REFERENCES `bas_workshop` (`workshop_no`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of bas_line
-- ----------------------------
INSERT INTO `bas_line` VALUES ('L001', '1#产线', 1, 'W001');
INSERT INTO `bas_line` VALUES ('L002', '2#产线', 2, 'W001');

-- ----------------------------
-- Table structure for bas_loc
-- ----------------------------
DROP TABLE IF EXISTS `bas_loc`;
CREATE TABLE `bas_loc`  (
  `loc_no` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `loc_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `line_no` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `process_no` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`loc_no`) USING BTREE,
  INDEX `fk_loc_line`(`line_no`) USING BTREE,
  INDEX `fk_loc_process`(`process_no`) USING BTREE,
  CONSTRAINT `fk_loc_line` FOREIGN KEY (`line_no`) REFERENCES `bas_line` (`line_no`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_loc_process` FOREIGN KEY (`process_no`) REFERENCES `bas_process` (`process_no`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of bas_loc
-- ----------------------------
INSERT INTO `bas_loc` VALUES ('LOC001', '1#注液工位', 'L001', 'P001');
INSERT INTO `bas_loc` VALUES ('LOC002', '2#注液工位', 'L001', 'P001');
INSERT INTO `bas_loc` VALUES ('LOC003', '3#注液工位', 'L001', 'P001');

-- ----------------------------
-- Table structure for bas_process
-- ----------------------------
DROP TABLE IF EXISTS `bas_process`;
CREATE TABLE `bas_process`  (
  `process_no` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `process_name` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`process_no`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of bas_process
-- ----------------------------
INSERT INTO `bas_process` VALUES ('P001', '注液工序');

-- ----------------------------
-- Table structure for bas_workshop
-- ----------------------------
DROP TABLE IF EXISTS `bas_workshop`;
CREATE TABLE `bas_workshop`  (
  `workshop_no` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `workshop_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '车间名称',
  PRIMARY KEY (`workshop_no`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of bas_workshop
-- ----------------------------
INSERT INTO `bas_workshop` VALUES ('W001', '1#车间');

-- ----------------------------
-- Table structure for biz_source
-- ----------------------------
DROP TABLE IF EXISTS `biz_source`;
CREATE TABLE `biz_source`  (
  `source_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `source_type` int(11) NULL DEFAULT NULL COMMENT '资源类别: 1. 视频  2.图片',
  `source_camera_no` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '来源相机id',
  `save_path_dir` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '存放路径文件夹: ftp地址',
  `source_files` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '文件名：多个，以;隔开',
  `cover_image_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '封面图片名称',
  `current_status` tinyint(4) NULL DEFAULT NULL COMMENT '可用状态:1 可用 0 -不可用',
  `created_date` datetime(0) NULL DEFAULT NULL COMMENT '文件生成日期时间',
  `created_timestamp` bigint(20) NULL DEFAULT NULL COMMENT '文件生成时间戳',
  `device_no` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '设备编号',
  PRIMARY KEY (`source_id`) USING BTREE,
  INDEX `fk_source_cam`(`source_camera_no`) USING BTREE,
  CONSTRAINT `fk_source_cam` FOREIGN KEY (`source_camera_no`) REFERENCES `bas_camera` (`camera_no`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

SET FOREIGN_KEY_CHECKS = 1;
